import { Database } from "@/types/supabse";
import { supabase } from "./supabse";
import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";
import { CRESTFUNDING_CONTRACT } from "@/app/constants/contracts";



type reportInsert = Database["public"]["Tables"]["reports"]["Insert"];


 export const contract = getContract({
    client: client,
    chain: defineChain(11155111),
    address: CRESTFUNDING_CONTRACT,
  });

// Function to get the public URL of an image stored in Supabase storage
export const getPublicUrl = (path: string) => {

    const { data: image_url } = supabase.storage.from("campaigns").getPublicUrl(path);
    return image_url.publicUrl;
}

// Function to approve campaigns 
export const approveCampaign = async (campaignId: string) => {
    
    // Start a transaction to ensure data consistency
    const { data, error } = await supabase.rpc('approve_campaign_transaction', {
        p_campaign_id: campaignId
    })

    if (error) {
        console.error('Error approving campaign:', error)
        throw error
    }

    return {
        success: true,
        message: `Campaign ${campaignId} has been approved successfully`,
        data
    }

}

// Function to reject campaigns
export const rejectCampaign = async (campaignId: string, reason: string) => {
    const { data, error } = await supabase.rpc('reject_campaign_transaction', {
        p_campaign_id: campaignId,
        p_reason: reason
    })

    if (error) {
        console.error('Error rejecting campaign:', error)
        throw error
    }

    return {
        success: true,
        message: `Campaign ${campaignId} has been rejected successfully`,
        data
    }
}

// Function for total amount raised 
export const getTotalAmountRaised = async (): Promise<number> => {
    const { data, error } = await supabase
        .rpc('get_total_amount_raised')
        .single();

    if (error) {
        console.error('Error fetching sum:', error);
        return 0; // Return default value in case of error
    } else {
        console.log('Total amount raised:', data);
        return data as number; // The returned data is a number
    }
}

//Fetch approved campaigns 
export const fetchApprovedCampaigns = async () => {
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('approval_status', 'approved');

    if (error) {
        console.error('Error fetching approved campaigns:', error);
        return [];
    }

    return data;
}

//Fetch specific campaign details
export const fetchCampaignDetails = async (campagnId: string) => {
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campagnId)
        .eq('approval_status', 'approved')
        .single();

    if (error) {
        console.log('Error fetching campaign details:', error);
        return null;
    }

    return data;
}


//Fetch live campaign status
export const campaignStatus = async (campaignId: string) => {
    const { data, error } = await supabase
        .from('approved_campaigns')
        .select('*')
        .eq('campaign_id', campaignId)
        .single();

    if (error) {
        console.error('Error fetching campaign status:', error);
        return null;
    }
    return data;
}

// Report campaign function 
export const reportCampaign = async ( formData: reportInsert) => {

    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'You must be logged in to report a campaign' };
    }

    const { data, error } = await supabase
        .from('reports')
        .insert({
            campaign_id: formData.campaign_id,
            reason: formData.reason,
            details: formData.details || null,
            reported_by: user.id
        })


    if (error) {
        console.error('Error submitting report:', error);
        return {
            success: false,
            error: error.message || 'Failed to submit report. Please try again.'
        };
    }

    return { success: true };

}

export const contactForm = async (FormData: { name: string; phone: string; email: string; message: string }) => {

    const { data, error } = await supabase
      .from('contact_submissions')
    .insert({
        name: FormData.name,
        phone: FormData.phone,
        email: FormData.email,
        message: FormData.message
      })
      .order('created_at', { ascending: false }); // Optional: recent first
  
    if (error) {
      console.error('Error fetching contact submissions:', error);
    }
    return { success: true };

  }

  export const fetchActiveCampaignsCount = async () => {
    const { data, error } = await supabase
        .from('approved_campaigns')
        .select('*', { count: 'exact' })
        .eq('withdrawal_status', 'pending');
        
    if (error) {
        console.error('Error fetching active campaigns count:', error);
        return 0;
    }

    return data.length;

}

 export const fetchPendingCampaign = async () => {
    const { data, error } = await supabase.from('campaigns').select('*');
    if (error) {
      console.error('Error fetching campaigns:', error);
    } else {
        return data? (data.filter(c => c.approval_status === 'pending').length) : 0;
    }
  };


//   Increment the amount raise 
export const updateCampaignFunding = async (campaign_id:string, amount:number) => {
    try {
    // First, get the current amount_raised value
    const { data: campaign, error: fetchError } = await supabase
      .from('approved_campaigns')
      .select('amount_raised')
      .eq('campaign_id', campaign_id)
      .single();
    
    if (fetchError) {
      throw new Error(`Error fetching campaign: ${fetchError.message}`);
    }
    
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaign_id} not found`);
    }
    
    // Calculate the new amount
    const newAmount = (campaign.amount_raised || 0) + amount;
    
    // Update the campaign with the new amount
    const { data: updatedCampaign, error: updateError } = await supabase
      .from('approved_campaigns')
      .update({ amount_raised: newAmount })
      .eq('campaign_id', campaign_id)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(`Error updating campaign: ${updateError.message}`);
    }
    
    console.log(`Successfully updated campaign ${campaign_id}. New amount_raised: ${newAmount}`);
    return updatedCampaign;
    
  } catch (error) {
    console.error('Error in updateCampaignAmount:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};



//Fetch approved campaigns only
export const fetchApprovedCampaign = async () => {
  try {
    const { data, error } = await supabase.from('campaigns').select('*').eq('approval_status', 'approved');
    
    if (error) {
      console.error('Error fetching campaigns:', error);
      return []; // Return empty array in case of error
    }
    
    return data; // Return the data if no error
  } catch (e) {
    console.error('Exception fetching campaigns:', e);
    return []; // Return empty array in case of exception
  }
};

export const fetchMyCampaigns = async(userId :string | undefined)=>{
    if(!userId){
        return
    }
    try{
        const {data,error} = await supabase.from('campaigns').select('*').eq('user_id',userId);
        return data;
    }
    catch(error){
        console.log(error);
    }
}

// Fetch amount_raised for a campaign from approved_campaigns table
export const fetchAmountRaisedForCampaign = async (campaignId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("approved_campaigns")
      .select("amount_raised")
      .eq("campaign_id", campaignId)
      .single();
    if (error || !data) {
      return 0;
    }
    return data.amount_raised || 0;
  } catch {
    return 0;
  }
};
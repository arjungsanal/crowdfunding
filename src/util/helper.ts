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
        console.error('Error fetching campaign details:', error);
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



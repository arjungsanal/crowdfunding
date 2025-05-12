import {supabase} from "./supabse";

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
export const fetchCampaignDetails = async (campagnId : string)=>{
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
    const {data,error} = await supabase 
        .from('approved_campaigns')
        .select('*')
        .eq('campaign_id', campaignId)
        .single();

        if(error){
            console.error('Error fetching campaign status:', error);
            return null;
        }
        return data;
}
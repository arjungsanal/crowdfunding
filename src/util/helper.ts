import { supabase } from "./supabse";

export const getPublicUrl = (path: string) => {

    const { data: image_url } = supabase.storage.from("campaigns").getPublicUrl(path);
    return image_url.publicUrl;
}


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

import { supabase } from "./supabse";

export const getPublicUrl = (path: string ) => {

    const { data:image_url } = supabase.storage.from("campaigns").getPublicUrl(path);
    return image_url.publicUrl;
}


const approveCampaign = async (campaignId: string) => {
    
} 
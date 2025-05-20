import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CampaignCard from './campaignCard';
import { fetchApprovedCampaign } from '@/util/helper';

const LiveCampaign = async () => {
    const activeCampaigns = await fetchApprovedCampaign();
    console.log("Approved campaigns here: ", activeCampaigns);

    const topCampaigns = activeCampaigns.slice(0, 3); // Take only the first 3 campaigns

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">Live Campaigns</h2>
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                {topCampaigns.map((campaign: any, index: number) => (
                    <div key={index} className="w-full sm:w-auto flex justify-center">
                        <CampaignCard campaign={campaign} />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <Button variant="ghost" className="flex items-center gap-2 text-sm sm:text-base hover:bg-gray-100">
                    <Link href="/listings">See More</Link>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </section>
    );
};

export default LiveCampaign;

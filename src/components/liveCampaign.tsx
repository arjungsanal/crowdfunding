import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CampaignCard from './campaignCard';

function LiveCampaign() {
    const campaigns = [
        {
          title: "Save the Local Theater",
          image: "https://imgs.search.brave.com/P6G2ByTgcQN1B1OINYkwQP272VoJtBwCIjuSHql1bhc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQ2LzAyLzQ4/LzM2MF9GXzk0NjAy/NDg2MF9RRFdmQkdx/TXZHQUZFbmtOcDFh/V2lEckZvYno5eERh/di5qcGc",
          requiredAmount: 50000,
          collectedAmount: 32500,
          endDate: "2025-03-15",
          progress: 65
        },
        {
          title: "Community Garden Project",
          image: "https://imgs.search.brave.com/4B2XBoj258CiiZFG1VoTCNaR_dY6_QT33OkP65AE4CE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MTg4NzI5L3Bob3Rv/L2dyb3VwLXdvcmtp/bmctaW4tYW4tdXJi/YW4tb3JnYW5pYy1j/b21tdW5pdHktZ2Fy/ZGVuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz13cVJqX0Za/VThINGEyYlc1VHhf/clFGOVpNMGZfbFJ3/aGhxNWp5dVpUMjlv/PQ",
          requiredAmount: 25000,
          collectedAmount: 18750,
          endDate: "2025-04-01",
          progress: 75
        },
        {
          title: "Youth Sports Program",
          image: "https://imgs.search.brave.com/agiyXUggFb9dh5LJJ_NKpIh_3JqYCK0YHEhhve6mijs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlj/a2xvdmVncm93LmNv/bS93cC1jb250ZW50/L25ld19mb2xkZXIv/MjAxNS8wNi8yMDE1/MDUxMC1fQTBBMzQx/OV9GLTEwMjR4Njgz/LmpwZw",
          requiredAmount: 35000,
          collectedAmount: 15750,
          endDate: "2025-03-30",
          progress: 45
        }
    ];

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">Live Campaigns</h2>
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                {campaigns.map((campaign, index) => (
                    <div key={index} className="w-full sm:w-auto flex justify-center">
                        <CampaignCard campaign={campaign} />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <Link href="/campaigns">
                    <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 text-sm sm:text-base hover:bg-gray-100"
                    >
                        <Link href="/listings">See More</Link>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default LiveCampaign;
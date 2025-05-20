import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CampaignCard from '@/components/campaignCard';
import { Database } from '@/types/supabse';
import { fetchApprovedCampaign } from '@/util/helper';

// Define TypeScript interface for campaign data
type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

export default async function LiveCampaign() {
    // Fetch campaigns directly on the server
    let campaigns: Campaign[] = [];
    let error: string | null = null;

    try {
        campaigns = await fetchApprovedCampaign();
    } catch (err) {
        error = 'Failed to fetch campaigns';
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

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
                        Load More
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
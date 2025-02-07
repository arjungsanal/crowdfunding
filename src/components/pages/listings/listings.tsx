"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CampaignCard from '@/components/campaignCard';

// Define TypeScript interface for campaign data
interface Campaign {
    title: string;
    image: string;
    requiredAmount: number;
    collectedAmount: number;
    endDate: string;
    progress: number;
}

function LiveCampaign() {
    // State to store campaigns
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            // TODO: Replace with actual API call
            // Example API call:
            // const response = await fetch('/api/campaigns');
            // const data = await response.json();
            // setCampaigns(data);

            // For now, using sample data
            setCampaigns(sampleCampaigns);
        } catch (err) {
            setError('Failed to fetch campaigns');
        } finally {
            setLoading(false);
        }
    };

    // Sample campaigns data
    const sampleCampaigns: Campaign[] = [
        {
            title: "Save the Local Theater",
            image: "https://imgs.search.brave.com/P6G2ByTgcQN1B1OINYkwQP272VoJtBwCIjuSHql1bhc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5mdGNkbi5uZXQvanBnLzA5LzQ2LzAyLzQ4LzM2MF9GXzk0NjAyNDg2MF9RRFdmQkdxTXZHQUZFbmtOcDFhV2lEckZvYno5eERhdi5qcGc",
            requiredAmount: 50000,
            collectedAmount: 32500,
            endDate: "2025-03-15",
            progress: 65
        },
        {
            title: "Community Garden Project",
            image: "https://imgs.search.brave.com/4B2XBoj258CiiZFG1VoTCNaR_dY6_QT33OkP65AE4CE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTMxMTg4NzI5L3Bob3RvL2dyb3VwLXdvcmtpbmctaW4tYW4tdXJiYW4tb3JnYW5pYy1jb21tdW5pdHktZ2FyZGVuLmpwZz9zPTYxMng2MTImdz0wJms9MjAmYz13cVJqX0ZaVThINGEyYlc1VHhfclFGOVpNMGZfbFJ3aGhxNWp5dVpUMjlvPQ",
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
        },
        {
            title: "Education for All Initiative",
            image: "/api/placeholder/400/300",
            requiredAmount: 75000,
            collectedAmount: 45000,
            endDate: "2025-05-15",
            progress: 60
        },
        {
            title: "Animal Shelter Renovation",
            image: "/api/placeholder/400/300",
            requiredAmount: 40000,
            collectedAmount: 28000,
            endDate: "2025-04-20",
            progress: 70
        },
        {
            title: "Clean Water Project",
            image: "/api/placeholder/400/300",
            requiredAmount: 60000,
            collectedAmount: 42000,
            endDate: "2025-06-01",
            progress: 70
        },
        {
            title: "Senior Citizens Support Fund",
            image: "/api/placeholder/400/300",
            requiredAmount: 30000,
            collectedAmount: 21000,
            endDate: "2025-04-15",
            progress: 70
        },
        {
            title: "Local Music Festival",
            image: "/api/placeholder/400/300",
            requiredAmount: 45000,
            collectedAmount: 27000,
            endDate: "2025-05-30",
            progress: 60
        },
        {
            title: "Mental Health Awareness Campaign",
            image: "/api/placeholder/400/300",
            requiredAmount: 55000,
            collectedAmount: 38500,
            endDate: "2025-06-15",
            progress: 70
        },
        {
            title: "Public Library Expansion",
            image: "/api/placeholder/400/300",
            requiredAmount: 80000,
            collectedAmount: 48000,
            endDate: "2025-07-01",
            progress: 60
        },
        {
            title: "Historic Building Preservation",
            image: "/api/placeholder/400/300",
            requiredAmount: 90000,
            collectedAmount: 63000,
            endDate: "2025-08-15",
            progress: 70
        },
        {
            title: "Children's Art Program",
            image: "/api/placeholder/400/300",
            requiredAmount: 35000,
            collectedAmount: 24500,
            endDate: "2025-05-01",
            progress: 70
        },
        {
            title: "Local Food Bank Support",
            image: "/api/placeholder/400/300",
            requiredAmount: 50000,
            collectedAmount: 35000,
            endDate: "2025-06-30",
            progress: 70
        }
    ];

    if (loading) {
        return <div className="text-center py-8">Loading campaigns...</div>;
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

export default LiveCampaign;
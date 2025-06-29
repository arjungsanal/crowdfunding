"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";
import { Database } from '@/types/supabse';
import { campaignStatus, getPublicUrl } from '@/util/helper';
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast';



type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];


interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [campaignStatusDetails, setCampaignStatusDetails] = useState<{ amount_raised: number } | null>(null);
  const {toast} = useToast();
  useEffect(() => {
    // Fetch campaign status on mount
    campaignStatus(campaign.id).then(setCampaignStatusDetails);
  }, [campaign.id]);

   // Share functionality
  const handleShare = async () => {
    // Create the share data
    const shareData = {
      title: campaign.title,
      text: `Support ${campaign.title} - ${campaign.description}`,
      url: window.location.href, // Current URL
    };
    
   try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } else {
        // Fallback for browsers that don't support Web Share API
        // Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({ 
          title: "Link copied!",
          description: "Campaign link copied to clipboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Sharing failed",
        description: "Failed to share campaign. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const progress = campaignStatusDetails
    ? (campaignStatusDetails.amount_raised / campaign.goal) * 100
    : 0;

  return (
    <Card className="w-full sm:w-[340px] md:w-[360px] lg:w-[380px] flex flex-col h-full">
      <div className="relative">
        <img
          src={getPublicUrl(campaign.cover_image_url ?? '')}
          alt={campaign.title}
          className="w-full h-[200px] sm:h-[220px] object-cover rounded-t-lg"
        />
      </div>
      
      <CardHeader className="pb-2 flex-none">
        <h3 className="text-lg sm:text-xl font-bold line-clamp-2 min-h-[3rem]">{campaign.title}</h3>
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
          <span>Goal: ${campaign.goal}</span>
          <span>Ends: ${campaign.deadline}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-1">
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="font-medium">
              ${campaignStatusDetails?.amount_raised} raised
            </span>
            <span className="text-gray-600">{progress}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 sm:gap-4 flex-none">
        <Button 
          onClick={handleShare}
          variant="outline" 
          size="icon"
          className="rounded-full"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button asChild  className="flex-1 text-sm sm:text-base">
          <Link href={`/details/${campaign.id}`}>Contribute Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
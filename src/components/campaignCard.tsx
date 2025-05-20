import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";
import { Database } from '@/types/supabse';
import { campaignStatus, getPublicUrl } from '@/util/helper';
import Link from 'next/link'

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];


interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = async ({ campaign }) => {
  const campaignStatusDetails = await campaignStatus(campaign.id);
  const progress = (campaignStatusDetails?.amount_raised / campaign.goal) * 100;
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
              ${campaignStatusDetails.amount_raised} raised
            </span>
            <span className="text-gray-600">{progress}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 sm:gap-4 flex-none">
        <Button 
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
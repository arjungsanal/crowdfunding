import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";

interface Campaign {
  title: string;
  image: string;
  requiredAmount: number;
  collectedAmount: number;
  endDate: string;
  progress: number;
}

interface CampaignCardProps {
  campaign: Campaign;
}

const YourCampaign: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <Card className="w-72 max-w-sm flex flex-col h-full">
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-30 object-cover rounded-t-lg"
        />
      </div>
      
      <CardHeader className="pb-2 flex-none">
        <h3 className="text-xl font-bold line-clamp-2 min-h-[3rem]">{campaign.title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Goal: ${campaign.requiredAmount.toLocaleString()}</span>
          <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-1">
        <div className="space-y-2">
          <Progress value={campaign.progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              ${campaign.collectedAmount.toLocaleString()} raised
            </span>
            <span className="text-gray-600">{campaign.progress}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-4 flex-none">
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button className="flex-1">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YourCampaign;
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";
import ContributeModal from "./contributeModel";
import { Database } from '@/types/supabse';
import { getPublicUrl } from '@/util/helper';
import { useToast } from '@/hooks/use-toast';

type campaign = Database['public']['Tables']['campaigns']['Row'];
type campaignStatus = Database['public']['Tables']['approved_campaigns']['Row'];
interface FundraisingCardProps {
  campaignData: campaign;
  campaignStatusDetails: campaignStatus;
}

const FundraisingCard = ({ campaignData, campaignStatusDetails }: FundraisingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const { toast } = useToast();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Share functionality
  const handleShare = async () => {
    // Create the share data
    const shareData = {
      title: campaignData.title,
      text: `Support ${campaignData.title} - ${campaignData.description}`,
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

  const progress = (campaignStatusDetails?.amount_raised / campaignData.goal) * 100;
  useEffect(() => {
     const calculateDaysLeft = () => {
    if (!campaignData.deadline) {
      setDaysLeft(0);
      return;
    }

    const currentDate = new Date();
    const deadlineDate = new Date(campaignData.deadline);

    currentDate.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    // Calculate the time difference in milliseconds
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDaysLeft(daysDifference);
    console.log("Days left:", daysDifference);
  };

  calculateDaysLeft();

  }, [])
  

  return (
    <div className="flex justify-center bg-slate-100 py-10">
      <div className="w-full max-w-6xl"> {/* Increased width */}
        <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
          <CardHeader className="pb-4"> {/* Reduced padding */}
            <CardTitle className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800"> {/* Reduced font size */}
              {campaignData.title}
            </CardTitle>
            <p className="text-gray-600 text-center text-base max-w-3xl mx-auto"> {/* Reduced font size */}
              {campaignData.description}
            </p>
          </CardHeader>
          <CardContent className="p-4 md:p-6"> {/* Reduced padding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"> {/* Reduced gap */}
              {/* Left Section - Image */}
              <div className="relative h-72 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-xl flex-grow shadow-md">
                  <img
                    src={campaignData.cover_image_url ? getPublicUrl(campaignData.cover_image_url) : undefined}
                    alt="Campaign"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Section - Funding Details */}
              <div className="flex flex-col justify-between space-y-6"> {/* Reduced space */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4"> {/* Reduced font size */}
                    Fund Required
                  </h3>

                  <div className="flex justify-between items-start mb-6"> {/* Reduced margin */}
                    {/* Amount info */}
                    <div>
                      <div className="text-3xl md:text-4xl font-normal mb-2 text-gray-600"> {/* Reduced font size */}
                        ₹{campaignStatusDetails?.amount_raised}
                      </div>
                      <div className="text-xl font-semibold text-gray-800"> {/* Reduced font size */}
                        raised of ₹{campaignData.goal}
                      </div>
                    </div>

                    {/* Days left info */}
                    <div className="text-center bg-red-200 p-3 rounded-xl"> {/* Reduced padding */}
                      <div className="text-base font-medium text-gray-600">Days Left</div> {/* Reduced font size */}
                      <div className="text-2xl md:text-3xl font-medium text-gray-900"> {/* Reduced font size */}
                        {daysLeft>0 ? daysLeft : 0}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2 mb-6"> {/* Reduced margin */}
                    <Progress
                      value={progress}
                      className="h-2 bg-gray-200" // Reduced height
                    />
                    <div className="text-base text-gray-600"> {/* Reduced font size */}
                      {progress.toFixed()}% funded
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3"> {/* Reduced gap */}
                  <Button
                    onClick={openModal}
                    className="flex-1 h-12 bg-black hover:bg-gray-900 text-white text-base font-semibold hover:scale-[1.02] transition-transform duration-200"
                  >
                    Contribute Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Modal */}
      <ContributeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={campaignData.title}
        id={campaignData.id}
      />
    </div>
  );
};

export default FundraisingCard;
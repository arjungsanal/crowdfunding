"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Share, HeartHandshake } from "lucide-react";
import { Database } from "@/types/supabse";
import { getPublicUrl } from "@/util/helper";
import { useToast } from "@/hooks/use-toast";

type campaign = Database["public"]["Tables"]["campaigns"]["Row"];

type Image = {
  url: string;
  alt: string;
};
interface SlidingTabsComponentProps {
  campaignData: campaign;
}

const SlidingTabsComponent = ({ campaignData }: SlidingTabsComponentProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();


  const handleShare = async () => {
    // Create the share data
    const shareData = {
      title: campaignData.title,
      text: `Support ${campaignData.title} - ${campaignData.story?.substring(0, 100)}...`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } else {
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
  const uploadedImages: Image[] = campaignData.proof_image_urls.map(url => ({
    url: getPublicUrl(url),
    alt: "Campaign proof image"
  }));
  const [selectedImage, setSelectedImage] = useState<Image>(uploadedImages[0]);


  const handleNextTab = () => {
    setActiveTab((prev) => (prev + 1) % 2);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-20 px-2 sm:px-4 md:px-6 lg:px-8 mb-6">
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
        {/* Tabs Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {/* Tab 1 - Description */}
            <div className="min-w-full">
              <h2 className="text-lg sm:text-xl font-bold mb-3">{campaignData.title}</h2>
              <div className="prose max-w-none">
                <div className={`text-gray-600 text-sm sm:text-base ${isExpanded ? '' : 'max-h-[280px]'} overflow-hidden transition-all duration-300`}>
                  {campaignData.story}
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-800 mt-2 font-medium focus:outline-none"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>

            {/* Tab 2 - Uploaded Image */}
            <div className="min-w-full">
              <h2 className="text-lg sm:text-xl font-bold mb-3">Uploaded Document</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex justify-center items-center h-[280px]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-h-[260px] w-auto object-contain rounded-lg"
                />
              </div>

              {/* Uploaded Images Gallery */}
              <div className="flex gap-2 mt-3 overflow-x-auto py-1">
                {uploadedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(image)}
                    className="flex-shrink-0 focus:outline-none"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={`w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border-2 transition-all ${selectedImage.url === image.url
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-blue-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation and Action Buttons */}
        <div className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextTab}
              className="rounded-full"
            >
              {activeTab === 0 ? (
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button className="gap-2 justify-center px-24" onClick={handleShare}>
              <Share className="h-4 w-4 sm:h-5 sm:w-5" />
              Share
            </Button>
            <Button className="gap-2 justify-center px-24 bg-blue-800 hover:bg-blue-600">
              <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5" />
              Contribute
            </Button>
          </div>
        </div>
      </div>
      <ContributeModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={campaignData.title}
      />
    </div>
  );
};

export default SlidingTabsComponent;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";

const FundraisingCard = () => {
  const campaignData = {
    title: "Help Save the Local Library",
    description: "Our local library needs urgent renovation to continue serving our community. Your contribution will help maintain this vital educational resource for future generations.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssRRU1sV63S1QIXZl1z38Xj2olXz5P_2Hwg&s",
    amountCollected: 15000,
    totalAmount: 25000,
    daysLeft: 15
  };

  const progress = (campaignData.amountCollected / campaignData.totalAmount) * 100;

  return (
    <div className=" flex  justify-center bg-slate-100 py-10">
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
                    src={campaignData.image}
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
                      ₹{campaignData.amountCollected.toLocaleString()}
                      </div>
                      <div className="text-xl font-semibold text-gray-800"> {/* Reduced font size */}
                        raised of ₹{campaignData.totalAmount.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Days left info */}
                    <div className="text-center bg-red-200 p-3 rounded-xl"> {/* Reduced padding */}
                      <div className="text-base font-medium text-gray-600">Days Left</div> {/* Reduced font size */}
                      <div className="text-2xl md:text-3xl font-medium text-gray-900"> {/* Reduced font size */}
                        {campaignData.daysLeft}
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
                    className="flex-1 h-12 bg-black hover:bg-gray-900 text-white text-base font-semibold hover:scale-[1.02] transition-transform duration-200" // Reduced height and font size
                  >
                    Contribute Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-12 w-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200" // Reduced height and width
                  >
                    <Share2 className="h-5 w-5" /> {/* Reduced icon size */}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundraisingCard;
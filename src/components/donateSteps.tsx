import React from 'react';
import { MousePointerClick, HandHeart, Coins } from 'lucide-react';
import IconInfoCard from "./donateCard";  // Note the updated import name to match the component

function DonateSteps() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          How to contribute?
        </h2>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-4">
        <IconInfoCard
          icon={MousePointerClick}
          heading="Choose a Campaign"
          description="Browse through various campaigns and select the one that resonates with you the most."
        />
        
        <IconInfoCard
          icon={Coins}
          heading="Make a Contribution"
          description="Donate securely and help bring positive change to someone's life."
        />
        
        <IconInfoCard
          icon={HandHeart}
          heading="Stay Connected & Support More"
          description="Get continuous updates on your impact and contribute again whenever you wish."
        />
      </div>
    </div>
  );
}

export default DonateSteps;


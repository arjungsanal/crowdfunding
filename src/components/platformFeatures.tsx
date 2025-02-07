import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Banknote,
  Clock
} from "lucide-react";

const PlatformFeatures = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />, 
      title: "Secure & Transparent", 
      description: "All campaigns are verified and monitored to ensure your donations reach the right cause. Complete transparency in fund allocation and usage."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />, 
      title: "Real-Time Progress Tracking", 
      description: "Monitor campaign progress, contributions, and impact in real-time. Stay updated with detailed reporting and milestone achievements."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />, 
      title: "Community-Driven", 
      description: "Join a thriving community of changemakers. Connect with like-minded individuals and organizations working towards common goals."
    },
    {
      icon: <Banknote className="h-6 w-6 text-primary" />, 
      title: "Low Transaction Fees", 
      description: "Maximize your impact with minimal fees. We ensure more of your contribution goes directly to the cause you care about."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />, 
      title: "Quick Campaign Setup", 
      description: "Launch your fundraising campaign in minutes with our intuitive platform. Easy-to-use tools and templates to get you started."
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-[1400px] mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 ">
        Why choose our platform?
      </h2>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center px-6 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-[48%] lg:w-[30%]"
          >
            <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformFeatures;

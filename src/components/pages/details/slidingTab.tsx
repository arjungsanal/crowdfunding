"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Share, HeartHandshake } from "lucide-react";
import ContributeModal from "./contributeModel";


type Image = {
  url: string;
  alt: string;
};

const SlidingTabsComponent = () => {

  const campaignData = {
    title: "Help Save the Local Library",
    description: "Our local library needs urgent renovation to continue serving our community. Your contribution will help maintain this vital educational resource for future generations.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssRRU1sV63S1QIXZl1z38Xj2olXz5P_2Hwg&s",
    amountCollected: 15000,
    totalAmount: 25000,
    daysLeft: 15
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  const [activeTab, setActiveTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const uploadedImages: Image[] = [
    {
      url: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Cat pet animal"
    },
    {
      url: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Second pet"
    },
    {
      url: "https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Third pet"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<Image>(uploadedImages[0]);

  const description = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni porro voluptates officiis perferendis. Asperiores nobis recusandae ratione, reiciendis quaerat fugit aperiam commodi at harum inventore vero, est veritatis illum in dignissimos id voluptas quidem ut maiores perspiciatis. Odit accusamus, quae nihil harum velit obcaecati sit ab asperiores modi quo voluptas molestiae, eius, magnam exercitationem doloremque atque temporibus praesentium a pariatur laborum vitae excepturi? Quas cupiditate reiciendis iusto quibusdam, commodi nostrum, dicta placeat quos quia recusandae dignissimos, pariatur maxime animi ipsam porro non vitae provident nisi magnam? Culpa aliquid provident rem ut fugit deserunt excepturi.`;

  const fullDescription = `${description} Aliquid culpa aperiam nulla fuga sint id provident ipsum nesciunt temporibus possimus, quibusdam vel libero consequatur explicabo debitis modi ducimus mollitia eos! Esse deserunt accusamus vero illo aliquid nobis iusto ab aperiam quidem culpa, aspernatur rerum nesciunt sequi repellat adipisci dolorem! Accusamus, debitis delectus. Error unde nihil cupiditate, culpa atque saepe distinctio adipisci inventore placeat. Quos at optio perspiciatis voluptatibus quo quidem quasi cum magnam dignissimos dolor ad suscipit, hic aperiam quaerat, sapiente vero maiores dolore officiis aut reprehenderit.`;

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
              <h2 className="text-lg sm:text-xl font-bold mb-3">Save the Local Library</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-sm sm:text-base max-h-[280px] overflow-y-auto">
                  {isExpanded ? fullDescription : description}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-800 ml-2 font-medium"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </p>
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
                      className={`w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border-2 transition-all ${
                        selectedImage.url === image.url 
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
            <Button className=" gap-2 justify-center px-24 ">
              <Share className="h-4 w-4 sm:h-5 sm:w-5" />
              Share
            </Button>
            <Button className=" gap-2 justify-center px-24  bg-blue-800 hover:bg-blue-600"
              onClick={openModal}>
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

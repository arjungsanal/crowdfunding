import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { Badge } from "@/components/ui/badge";


interface Campaign {
    id: number;
    daysAgo: number;
    goal: { toLocaleString: () => string };
    rejectionReason?: string;
  }

    // Sample data for rejected campaigns
    const initialRejectedCampaigns = [
        { id: 1, daysAgo: 7, goal: { toLocaleString: () => "20,000" }, rejectionReason: "Incomplete documentation" },
        { id: 2, daysAgo: 10, goal: { toLocaleString: () => "40,000" }, rejectionReason: "Outside of funding scope" },
      ];
      
    

export const RejectedRequests: React.FC = () => {
    const [rejectedCampaigns, setRejectedCampaigns] = useState<Campaign[]>(initialRejectedCampaigns);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleViewDetails = (id: number) => {
      setSelectedCampaignId(id);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Rejected Campaigns</h2>
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="divide-y">
            {rejectedCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                      <XCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold">Campaign #{campaign.id}</h4>
                        <Badge variant="outline" className="ml-2 text-red-600 bg-red-50">Rejected</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Rejected: {campaign.daysAgo} days ago</p>
                      <p className="text-sm text-red-500 mt-1">Reason: {campaign.rejectionReason}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-600 hover:bg-blue-50 ml-auto"
                    onClick={() => handleViewDetails(campaign.id)}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
  
        {/* Campaign Details Modal */}
        <CampaignDetailsModal
          campaignId={selectedCampaignId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={() => {}}
          onReject={() => {}}
          viewOnly={true}
        />
      </div>
    );
  };
  
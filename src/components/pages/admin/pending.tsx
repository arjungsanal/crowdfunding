import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutIcon, Eye, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { RejectionModal } from "./rejection";
import { Badge } from "@/components/ui/badge";

interface Campaign {
    id: number;
    daysAgo: number;
    goal: { toLocaleString: () => string };
    rejectionReason?: string;
  }

  // Sample data for pending campaigns
const initialPendingCampaigns = [
    { id: 1, daysAgo: 2, goal: { toLocaleString: () => "25,000" } },
    { id: 2, daysAgo: 3, goal: { toLocaleString: () => "15,000" } },
    { id: 3, daysAgo: 1, goal: { toLocaleString: () => "30,000" } },
  ];

  
  
  // Sample data for rejected campaigns
  const initialRejectedCampaigns = [
    { id: 1, daysAgo: 7, goal: { toLocaleString: () => "20,000" }, rejectionReason: "Incomplete documentation" },
    { id: 2, daysAgo: 10, goal: { toLocaleString: () => "40,000" }, rejectionReason: "Outside of funding scope" },
  ];
  

// Pending Requests Component
export const PendingRequests: React.FC = () => {
    const [pendingCampaigns, setPendingCampaigns] = useState<Campaign[]>(initialPendingCampaigns);
    const [rejectedCampaigns, setRejectedCampaigns] = useState<Campaign[]>(initialRejectedCampaigns);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  
    const handleViewDetails = (id: number) => {
      setSelectedCampaignId(id);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleApproveCampaign = (id: number) => {
      // Logic to approve campaign
      console.log(`Approving campaign ${id}`);
      setPendingCampaigns(pendingCampaigns.filter(campaign => campaign.id !== id));
      setIsModalOpen(false);
    };
  
    const handleOpenRejectionModal = (id: number) => {
      setSelectedCampaignId(id);
      setIsRejectionModalOpen(true);
    };
  
    const handleCloseRejectionModal = () => {
      setIsRejectionModalOpen(false);
    };
  
    const handleRejectCampaign = (reason: string) => {
      if (selectedCampaignId === null) return;
      
      // Find the campaign to reject
      const campaignToReject = pendingCampaigns.find(campaign => campaign.id === selectedCampaignId);
      if (!campaignToReject) return;
      
      // Add the campaign to rejected list with reason
      const rejectedCampaign = {
        ...campaignToReject,
        rejectionReason: reason
      };
      
      setRejectedCampaigns([...rejectedCampaigns, rejectedCampaign]);
      
      // Remove from pending list
      setPendingCampaigns(pendingCampaigns.filter(campaign => campaign.id !== selectedCampaignId));
      
      setIsRejectionModalOpen(false);
    };
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Pending Approval Requests</h2>
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="divide-y">
            {pendingCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                      <LayoutIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-semibold">Campaign #{campaign.id}</h4>
                        <Badge variant="outline" className="ml-2 text-amber-600 bg-amber-50">Pending</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Requested: {campaign.daysAgo} days ago</p>
                      <p className="text-sm text-gray-600 mt-1">Fundraising goal: ${campaign.goal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleViewDetails(campaign.id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => handleApproveCampaign(campaign.id)}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleOpenRejectionModal(campaign.id)}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
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
          onApprove={handleApproveCampaign}
          onReject={handleOpenRejectionModal}
        />
  
        {/* Rejection Reason Modal */}
        <RejectionModal
          isOpen={isRejectionModalOpen}
          onClose={handleCloseRejectionModal}
          onReject={handleRejectCampaign}
        />
      </div>
    );
  };
  
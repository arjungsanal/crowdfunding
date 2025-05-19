import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, XCircle } from "lucide-react";
import { useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/types/supabse";
import { NextPage } from "next";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignsPageProps {
  campaigns: Campaign[];
  error?: string;
  refreshCampaigns: () => Promise<void>; // Add this prop
}

export const RejectedRequests: NextPage<CampaignsPageProps> = ({ campaigns, error }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (error) {
    return <div className="error-container">Error loading campaigns: {error}</div>;
  }

  const handleOpenModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Rejected Campaigns</h2>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="divide-y">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-semibold">Campaign #{campaign.title}</h4>
                      <Badge variant="outline" className="ml-2 text-red-600 bg-red-50">Rejected</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Rejected: {campaign.created_at} days ago</p>
                    <p className="text-sm text-red-500 mt-1">Reason: {campaign.description}</p>
                    <p className="text-sm text-gray-600 mt-1">Fundraising goal: ${campaign.goal.toLocaleString()}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleOpenModal(campaign)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={() => {}}
          onReject={() => {}}
          
        />
      )}
    </div>
  );
};

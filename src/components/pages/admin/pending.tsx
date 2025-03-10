import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutIcon, Eye, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { RejectionModal } from "./rejection";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/util/supabse";
import { Database } from "@/types/supabse";
import { NextPage } from "next";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignsPageProps {
  campaigns: Campaign[];
  error?: string;
}

export const PendingRequests: NextPage<CampaignsPageProps> = ({ campaigns, error }) => {
  // Modal state
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState<boolean>(false);

  if (error) {
    return <div className="error-container">Error loading campaigns: {error}</div>;
  }

  // Open modal with selected campaign details
  const handleOpenModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  // Open rejection modal
  const handleOpenRejectionModal = () => {
    setIsModalOpen(false); // Close details modal
    setIsRejectionModalOpen(true);
  };

  const handleCloseRejectionModal = () => {
    setIsRejectionModalOpen(false);
  };

  // Approve campaign function (you can add Supabase logic here)
  const handleApproveCampaign = async () => {
    if (!selectedCampaign) return;
    
    const { error } = await supabase
      .from("campaigns")
      .update({ status: "approved" })
      .eq("id", selectedCampaign.id);

    if (error) {
      console.error("Approval error:", error);
    } else {
      console.log("Campaign approved:", selectedCampaign.id);
      handleCloseModal();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Approval Requests</h2>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="divide-y">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                    <LayoutIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-semibold">Campaign #{campaign.title}</h4>
                      <Badge variant="outline" className="ml-2 text-amber-600 bg-amber-50">Pending</Badge>
                    </div>
                    <p className="text-sm text-gray-500">Requested: {campaign.created_at} days ago</p>
                    <p className="text-sm text-gray-600 mt-1">Fundraising goal: ${campaign.goal.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => handleOpenModal(campaign)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                    onClick={handleApproveCampaign}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                    onClick={handleOpenRejectionModal}
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
      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={handleApproveCampaign}
          onReject={handleOpenRejectionModal}
        />
      )}

      {/* Rejection Modal */}
      {/* {selectedCampaign && (
        <RejectionModal
          isOpen={isRejectionModalOpen}
          onClose={handleCloseRejectionModal}
          campaignId={selectedCampaign.id}
        />
      )} */}
    </div>
  );
};

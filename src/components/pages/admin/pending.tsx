'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutIcon, Eye, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { RejectionModal } from "./rejection";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/util/supabse";
import { Database } from "@/types/supabse";
import { NextPage } from "next";
import { approveCampaign, contract, rejectCampaign } from "@/util/helper";
import { useLoading } from "@/context/LoadingContext";
import { defineChain, getContract, prepareContractCall, readContract, sendTransaction } from "thirdweb";
import { useActiveAccount, useContractEvents, useReadContract, useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { CRESTFUNDING_CONTRACT } from "@/app/constants/contracts";
import { useToast } from "@/hooks/use-toast";


type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignsPageProps {
  campaigns: Campaign[];
  error?: string;
  refreshCampaigns: () => Promise<void>; // Add this prop
}

export const PendingRequests: NextPage<CampaignsPageProps> = ({
  campaigns,
  error,
  refreshCampaigns
}) => {
  // Modal state
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoading();
  const currentAccount = useActiveAccount();
  const {toast} = useToast();


  const { data: allcampaignId } = useReadContract({
    contract: contract,
    method:
      "function getAllCampaignIds() view returns (string[])",
    params: [],
  });

  console.log(allcampaignId)


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

  // Approve campaign function
  const handleApproveCampaign = async () => {
    if (!selectedCampaign) return;
    try {
     

      //Blockchain part 
      if (!currentAccount) {
        throw new Error("No wallet connected");

      }
      console.log("Current acount :",currentAccount)
       showLoader("Approving campaign...");
      const transaction = await prepareContractCall({
        contract: contract,
        method:
          "function createCampaign(string _id, address _creator, uint256 _goal, uint256 _durationInDays)",
        params: [selectedCampaign.id, selectedCampaign.wallet_id, BigInt(selectedCampaign.goal), BigInt(30)],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account: currentAccount,
      });
      console.log(transactionHash);

      await approveCampaign(selectedCampaign.id);

      // After successful approval, refresh the campaigns data
      await refreshCampaigns();
    }
    catch (error) {
      toast({
        title: error instanceof Error ? error.message : String(error),
      });
      console.error("Approval error:", error);
    } finally {
      hideLoader();
      handleCloseModal();
    }
  };

  // Reject campaign function
  const handleRejectCampaign = async (reason: string) => {
    if (!selectedCampaign) return;
    try {
      showLoader("Rejecting campaign...");
      await rejectCampaign(selectedCampaign.id, reason);

      // After successful approval, refresh the campaigns data
      await refreshCampaigns();
    }
    catch (error) {
      console.error("Approval error:", error);
    } finally {
      hideLoader();
      handleCloseModal();
    }
  };

  const handleApproveCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    handleApproveCampaign();
  };

  const handleRejectCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    handleOpenRejectionModal();
  };



  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Approval Requests</h2>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="divide-y">
          {campaigns.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No pending campaigns found.
            </div>
          ) : (
            campaigns.map((campaign) => (
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
                      onClick={() => handleApproveCampaignClick(campaign)}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleRejectCampaignClick(campaign)}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
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
      {selectedCampaign && (
        <RejectionModal
          isOpen={isRejectionModalOpen}
          onClose={handleCloseRejectionModal}
          campaignId={selectedCampaign.id}
          onReject={handleRejectCampaign}
        />
      )}
    </div>
  );
};
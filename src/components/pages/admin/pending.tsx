import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutIcon, Eye, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignDetailsModal from "./viewDetails";
import { RejectionModal } from "./rejection";
import { Badge } from "@/components/ui/badge";
import { fetchAllFromTable } from "@/util/adminFunctions";
import { supabase } from "@/util/supabse";
import { Database } from "@/types/supabse";
import { GetServerSideProps, NextPage } from "next";

// Define types for your component props
type Campaign = Database['public']['Tables']['campaigns']['Row']

interface CampaignsPageProps {
  campaigns: Campaign[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<CampaignsPageProps> = async () => {
  try {
    // Fetch all campaigns
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
    
    if (error) throw error
    
    return {
      props: {
        campaigns: data || [],
      },
    }
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return {
      props: {
        campaigns: [],
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
    }
  }
}
export const  PendingRequests: NextPage<CampaignsPageProps> = ({ campaigns, error }) => {
    if (error) {
      return <div className="error-container">Error loading campaigns: {error}</div>
    }
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
                        <h4 className="font-semibold">Campaign #{campaign.id}</h4>
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
                      onClick={()=>console.log("View Details")}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={()=>console.log("Approve Campaign")}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={()=>console.log("Rejection")}
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
        {/* <CampaignDetailsModal
        //   campaignId={selectedCampaignId}
        //   isOpen={isModalOpen}
        //   onClose={handleCloseModal}
        //   onApprove={handleApproveCampaign}
        //   onReject={handleOpenRejectionModal}
        /> */}
  
        {/* Rejection Reason Modal */}
        {/* <RejectionModal
        //   isOpen={isRejectionModalOpen}
        //   onClose={handleCloseRejectionModal}
        //   onReject={handleRejectCampaign}
        /> */}
      </div>
    );
  };
  
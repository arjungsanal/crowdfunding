import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database } from "@/types/supabse";
import { CheckCircle } from "lucide-react";
import { NextPage } from "next";

type Campaign=Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignsPageProps{
  campaigns:Campaign[];
  error?: string;
}

export const ApprovedRequests: NextPage<CampaignsPageProps> = ({ campaigns, error }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Approved Campaigns</h2>
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="divide-y">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold">Campaign #{campaign.title}</h4>
                    <Badge className="ml-2 bg-green-100 text-green-600 hover:bg-green-200">Approved</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Approved: {campaign.created_at} days ago</p>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">Progress: $0 of ${campaign.goal.toLocaleString()}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                      <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>4
              
              
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

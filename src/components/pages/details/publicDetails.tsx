import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, User } from "lucide-react";
import { Database } from "@/types/supabse";

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

type Donation = {
  id: string;
  donorName: string;
  amount: number;
  timestamp: string;
  avatarUrl?: string;
};

type CampaignDetailsProps = {
  campaignerDetails: Campaign;
  recentDonations: Donation[];
};

const CampaignDetails = ({ campaignerDetails, recentDonations }: CampaignDetailsProps) => {
  return (
    <div className="grid grid-cols-1 bg-slate-100 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto p-4">
      {/* Campaigner Details Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Campaigner Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-gray-500 min-w-[100px]">Campaigner:</span>
              <span className="font-medium">{campaignerDetails.hosted_by}</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-gray-500 min-w-[100px]">Beneficiary:</span>
              <span className="font-medium">{campaignerDetails.beneficiary_name}</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-gray-500 min-w-[100px]">Relation:</span>
              <span className="font-medium">{campaignerDetails.relationship}</span>
            </div>
            {/* <div className="flex items-start space-x-2">
              <span className="text-gray-500 min-w-[100px]">Location:</span>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{campaignerDetails.}</span>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[150px] pr-4">
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50"
                >
                  <Avatar>
                    <AvatarImage src={donation.avatarUrl} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {donation.donorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(donation.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm font-semibold text-green-600">
                    ₹{donation.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetails;
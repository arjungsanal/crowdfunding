import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Calendar, Wallet, User, Users, Link as LinkIcon, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Database } from '@/types/supabse';
import { getPublicUrl } from '@/util/helper';

type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];

interface CampaignDetailsModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {

  console.log("Campaign Details Modal Props:", { campaign, isOpen, onClose, onApprove, onReject });
  // testing out values
  // const publicVlaue = getPublicUrl(campaign.cover_image_url);
  // console.log(publicVlaue)

  const [activeTab, setActiveTab] = useState<string>("details");
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="text-green-600 bg-green-50">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 bg-red-50">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="text-amber-600 bg-amber-50">Pending</Badge>;
    }
  };

  const openImageViewer = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!campaign?.cover_image_url) return;

    const allImages = [
      campaign.cover_image_url,
      ...(campaign.proof_image_urls || [])
    ];

    let newIndex = direction === 'next'
      ? (currentImageIndex + 1) % allImages.length
      : (currentImageIndex - 1 + allImages.length) % allImages.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(getPublicUrl(allImages[newIndex]));
  };

  const truncateBriefDescription = (text: string, maxWords = 30) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0">
        {error ? (
          <div className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Error Loading Campaign</h3>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <Button className="mt-6" onClick={onClose}>Close</Button>
          </div>
        ) : campaign ? (
          <>
            {/* Image Viewer Overlay */}
            {selectedImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                <div className="relative w-full h-full max-w-4xl max-h-screen p-4 flex flex-col">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-gray-800 z-50"
                    onClick={closeImageViewer}
                  >
                    <X className="h-6 w-6" />
                  </Button>

                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Campaign image"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button
                      variant="outline"
                      className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      onClick={() => navigateImage('prev')}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                      onClick={() => navigateImage('next')}
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col h-full max-h-[90vh]">
              <DialogHeader className="px-6 pt-6 pb-0 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <DialogTitle className="text-xl font-bold">Campaign #{campaign.id}</DialogTitle>
                  {getStatusBadge(campaign.approval_status)}
                </div>
                <DialogDescription className="text-base font-medium mt-1">{campaign.title}</DialogDescription>
              </DialogHeader>

              <Tabs
                defaultValue="details"
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex flex-col flex-grow overflow-hidden"
              >
                <div className="px-6 mt-2 flex-shrink-0">
                  <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-3 sm:flex">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="images">Evidence</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-grow overflow-auto">
                  <ScrollArea className="h-full">
                    <TabsContent value="details" className="px-6 pb-6 data-[state=active]:block">
                      <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="space-y-1.5">
                            <h3 className="text-sm font-medium text-gray-500">Requested on</h3>
                            <p className="font-medium">{formatDate(campaign.created_at)}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Beneficiary Name</h3>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium">{campaign.beneficiary_name}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Hosted By</h3>
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium">{campaign.hosted_by}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Relationship</h3>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium">{campaign.relationship}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Fundraising Goal</h3>
                              <div className="flex items-center">
                                <Wallet className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium text-green-600">{formatCurrency(campaign.goal)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Campaign Deadline</h3>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium">{formatDate(campaign.deadline)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
                              <div className="flex items-center">
                                <Wallet className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="font-medium font-mono text-sm overflow-hidden text-ellipsis">{campaign.wallet_id}</p>
                                <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                                  <LinkIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="description" className="px-6 pb-6 data-[state=active]:block">
                      <Card className="border-none shadow-none">
                        <CardContent className="p-0 space-y-6">
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                              <div>
                                <h3 className="text-lg font-semibold text-blue-800 mb-2">Brief Description</h3>
                                <p className="text-blue-700">{truncateBriefDescription(campaign.description)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Story</h3>
                            <div className="prose max-w-none">
                              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{campaign.story}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="images" className="px-6 pb-6 data-[state=active]:block">
                      <div className="space-y-6">
                        {campaign.cover_image_url && (
                          <div className="space-y-3">
                            <h3 className="text-base font-semibold text-gray-800">Campaign Cover</h3>
                            <div
                              className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            onClick={() => openImageViewer(getPublicUrl(campaign.cover_image_url!), 0)}
                            >
                              <img
                                src={campaign.cover_image_url ? getPublicUrl(campaign.cover_image_url) : undefined}
                                alt="Campaign cover"
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {campaign.proof_image_urls && campaign.proof_image_urls.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-base font-semibold text-gray-800">Supporting Documents</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                              {campaign.proof_image_urls.map((img, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer"
                                  onClick={() => openImageViewer( getPublicUrl(img), index + 1)}
                                >
                                  <div className="relative">
                                    <img
                                      src={img ? getPublicUrl(img) : undefined}
                                      alt={`Supporting document ${index + 1}`}
                                      className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200"></div>
                                  </div>
                                  <div className="p-3 bg-gray-50">
                                    <p className="text-sm text-gray-600">Supporting document #{index + 1}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </div>
              </Tabs>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50 flex-1 sm:flex-none"
                      onClick={onReject}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50 flex-1 sm:flex-none"
                      onClick={onApprove}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                  <Button variant="default" onClick={onClose}>Close</Button>
                </DialogFooter>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailsModal;
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabse";
import { reportCampaign } from "@/util/helper";

type campaign = Database['public']['Tables']['campaigns']['Row'];
type FormValue = Database['public']['Tables']['reports']['Insert'];

interface contactReportProps {
  campaignDetails: campaign,
}

function ContactReport({ campaignDetails }: contactReportProps) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [formData, setFormData] = useState<FormValue>({
    campaign_id: campaignDetails?.id || '',
    reason: 'suspicious_activity',
    details: null,
    reported_by: '', // This will need to be set with user information
    resolved: false,
    resolved_at: null,
    resolved_by: null,
    resolution_notes: null
  });
  
  const reportReasons = [
    { label: "Suspicious activity", value: "suspicious_activity" },
    { label: "Inappropriate content", value: "inappropriate_content" },
    { label: "False information", value: "false_information" },
    { label: "Harmful behavior", value: "harmful_behavior" },
    { label: "Privacy violation", value: "privacy_violation" },
    { label: "Other", value: "other" }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Submit the report using your helper function
      await reportCampaign(formData);
      console.log(formData);
      // Reset form and close modal on success
      setFormData({
        campaign_id: campaignDetails?.id || '',
        reason: 'suspicious_activity',
        details: null,
        reported_by: '', // Reset to empty or keep current user
        resolved: false,
        resolved_at: null,
        resolved_by: null,
        resolution_notes: null
      });
      setIsReportOpen(false);
      
      // Optionally show success message
      alert("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-2">
        {/* Contact Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-mono text-gray-900">
                Have a question?
              </h2>
            </div>
            <Link href="/contact">
              <Button 
                className="w-36 bg-blue-600 hover:bg-blue-700 font-medium"
                size="lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-mono text-gray-900">
                Feeling suspicious?
              </h2>
            </div>
            <Button 
              variant="destructive"
              className="w-36 font-medium"
              size="lg"
              onClick={() => setIsReportOpen(true)}
            >
              Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Modal Popup */}
      {isReportOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-medium">Submit a Report</h3>
              <button 
                onClick={() => setIsReportOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for reporting
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {reportReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {formData.reason === "other" && (
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                    Please specify
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe the issue..."
                    required={formData.reason === "other"}
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReportOpen(false)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactReport;
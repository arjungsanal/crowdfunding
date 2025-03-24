"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, AlertCircle, X } from "lucide-react";
import Link from "next/link";

function ContactReport() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  
  const reportReasons = [
    "Suspicious activity",
    "Inappropriate content",
    "False information",
    "Harmful behavior",
    "Privacy violation",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle report submission logic here
    alert(`Report submitted: ${selectedReason === "Other" ? otherReason : selectedReason}`);
    setIsReportOpen(false);
    setSelectedReason("");
    setOtherReason("");
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
            <Button asChild 
              className="w-36 bg-blue-600 hover:bg-blue-700 font-medium"
              size="lg"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
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
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select a reason</option>
                  {reportReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedReason === "Other" && (
                <div>
                  <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Please specify
                  </label>
                  <textarea
                    id="otherReason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe the issue..."
                    required={selectedReason === "Other"}
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
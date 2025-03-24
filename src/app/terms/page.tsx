import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with improved spacing and typography */}
        <div className="mb-10">
          <Link href="/" className="inline-block mb-6">
            <Button variant="ghost" size="sm" className="group flex items-center gap-2 transition-colors">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Terms and Conditions</h1>
        </div>

        <Card className="border rounded-lg shadow-sm overflow-hidden mb-8">
          <CardContent className="p-0">
            {/* Terms Content - Now as accordion-like sections */}
            <div className="divide-y">
              {sections.map((section, index) => (
                <details key={index} className="group" open={index === 0}>
                  <summary className="flex p-6 items-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <h2 className="text-lg font-medium text-gray-900">
                      {index + 1}. {section.title}
                    </h2>
                    <div className="ml-auto">
                      <svg 
                        className="h-5 w-5 text-gray-500 transform group-open:rotate-180 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {index === 1 ? (
                      <ul className="space-y-2">
                        <li><span className="font-normal text-gray-600">Platform:</span> Refers to the blockchain-based crowdfunding web application.</li>
                        <li><span className="font-normal text-gray-600">User:</span> Refers to anyone accessing or using the platform.</li>
                        <li><span className="font-normal text-gray-600">Donor:</span> Refers to users who contribute funds to campaigns.</li>
                        <li><span className="font-normal text-gray-600">Fundraiser:</span> Refers to users who create campaigns for raising funds.</li>
                        <li><span className="font-normal text-gray-600">Smart Contract:</span> Refers to blockchain-based mechanisms that automate transactions.</li>
                      </ul>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improved accept button */}
        <div className="mt-10 flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500 text-center max-w-md">
            By clicking "Accept", you acknowledge that you have read and agree to the terms outlined above.
          </p>
          <Button className="w-full sm:w-auto px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
            Accept Terms and Conditions
          </Button>
        </div>
      </div>
    </div>
  );
}

// Section data for better organization
const sections = [
  {
    title: "Acceptance of Terms",
    content: "By using this platform, you confirm that you have read, understood, and agree to comply with these Terms and Conditions. If you do not agree, please refrain from using the platform."
  },
  {
    title: "Description of Service",
    content: "Definitions of key terms used throughout this document."
  },
  {
    title: "Eligibility",
    content: "Be at least 18 years old or meet the legal age requirement in your jurisdiction. Provide accurate and complete registration details. Comply with all applicable laws and regulations."
  },
  {
    title: "Fundraising",
    content: "You must provide accurate information about your campaign. Funds must be used solely for the stated purpose. The platform does not guarantee the success of fundraising campaigns."
  },
  {
    title: "Donations",
    content: "Acknowledge that donations are voluntary and non-refundable. Understand that the platform does not guarantee project success or fund utilization. Transactions will be recorded permanently on the blockchain."
  },
  {
    title: "Security & Fraud Prevention",
    content: "Fundraisers must undergo identity verification (KYC) to prevent scams. All transactions are recorded on a public blockchain ledger for transparency. Fraudulent activities will result in account suspension and legal action."
  },
  {
    title: "Community Governance & Transparency",
    content: "Users can participate in voting on featured campaigns to ensure fair funding distribution. Fundraisers are required to provide regular updates on the progress of their campaigns. The platform supports community-driven decision-making to prioritize the most impactful campaigns."
  },
  {
    title: "Termination & Account Suspension",
    content: "Users violating these Terms may have their accounts suspended or permanently banned. Fraudulent campaigns will be reported to legal authorities. The platform reserves the right to modify or discontinue services at any time."
  },
  {
    title: "Privacy Policy",
    content: "User data is collected and stored as per the Privacy Policy. Blockchain transactions are public and cannot be removed. The platform does not share user data with third parties for marketing."
  },
  {
    title: "Changes to Terms and Conditions",
    content: "The platform may update these Terms from time to time. Users will be notified of significant changes via email or platform announcements. Continued use of the platform after updates means acceptance of the revised Terms."
  },
  {
    title: "Contact Us",
    content: "For any questions or concerns regarding these Terms and Conditions, please contact our support team through the platform."
  }
];

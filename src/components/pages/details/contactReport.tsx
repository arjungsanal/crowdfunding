import { Button } from "@/components/ui/button";
import { MessageCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

function ContactReport() {
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
            >
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactReport;
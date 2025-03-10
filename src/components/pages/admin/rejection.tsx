import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Rejection Modal Component
interface RejectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReject: (reason: string) => void;
  }
  
 export const RejectionModal: React.FC<RejectionModalProps> = ({ isOpen, onClose, onReject }) => {
    const [rejectionReason, setRejectionReason] = useState('');
  
    if (!isOpen) return null;
  
    const handleSubmit = () => {
      if (rejectionReason.trim()) {
        onReject(rejectionReason);
        setRejectionReason('');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Rejection Reason</h3>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            className="w-full mb-4 min-h-32"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </div>
    );
  };
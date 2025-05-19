// ContributeModal.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ExternalLink, Wallet } from "lucide-react";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  id: string;
}

const ContributeModal = ({
  isOpen,
  onClose,
  title,
}: ContributeModalProps) => {
  const [currency, setCurrency] = useState<string>("inr");
  const [amount, setAmount] = useState<number | string>("");
  const [convertedAmount, setConvertedAmount] = useState<number | string>("");

  // Mock conversion rates for Ethereum - in a real app, you would fetch these from an API
  const conversionRates: Record<string, number> = {
    usd: 0.00042,  // Example: 1 USD = 0.00042 ETH
    eur: 0.00046,  // Example: 1 EUR = 0.00046 ETH
    gbp: 0.00054,  // Example: 1 GBP = 0.00054 ETH
    jpy: 0.0000028, // Example: 1 JPY = 0.0000028 ETH
    inr: 0.0000050, // Example: 1 INR = 0.0000050 ETH
  };

  // Currency symbols for display
  const currencySymbols: Record<string, string> = {
    usd: "$",
    eur: "€",
    gbp: "£",
    jpy: "¥",
    inr: "₹",
  };

  // Update converted amount when amount or currency changes
  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const rate = conversionRates[currency] || 0;
      const converted = Number(amount) * rate;
      setConvertedAmount(converted.toFixed(6));
    } else {
      setConvertedAmount("");
    }
  }, [amount, currency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleProceed = () => {
    console.log({
      currency,
      amount,
      convertedAmount,
      cryptoCurrency: "Ethereum ETH",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm md:max-w-md p-0 rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
        {/* Compact header with blue accent */}
        <div className="p-4 border-b border-gray-200 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-medium">
              Contribute To 
              <span className="text-blue-400"> {title}</span>
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="p-4 space-y-4 bg-gray-50">
          {/* Compact wallet info */}
          <div className="bg-white p-3 rounded-md flex items-center gap-2 text-xs border border-gray-200">
            <Wallet className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <p className="text-gray-700">Don't have a wallet?</p>
            <Link 
              href="https://metamask.io/" 
              target="_blank"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Get MetaMask
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Currency selection */}
            <div className="space-y-1">
              <Label htmlFor="currency" className="text-gray-700 text-xs font-medium">
                Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-white border-gray-300 h-10 text-sm focus:ring-blue-500 focus:border-blue-500 focus:ring-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount input */}
            <div className="space-y-1">
              <Label htmlFor="amount" className="text-gray-700 text-xs font-medium">
                Amount
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">
                    {currencySymbols[currency] || ""}
                  </span>
                </div>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="pl-6 h-10 text-sm bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                />
              </div>
            </div>
          </div>

          {/* Conversion box */}
          <div className="bg-gray-800 p-3 rounded-md text-white">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="converted" className="text-gray-200 text-xs">
                You'll Pay in ETH
              </Label>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-xs text-gray-300">Ethereum</span>
              </div>
            </div>
            <div className="text-base font-medium">
              {convertedAmount ? `${convertedAmount} ETH` : "0.000000 ETH"}
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-gray-50 border-t border-gray-200">
          <Button
            onClick={handleProceed}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md transition-colors duration-200"
            disabled={!amount || Number(amount) <= 0}
          >
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributeModal;
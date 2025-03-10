"use client";

import React, { useState, useEffect, SVGProps, JSX } from 'react';
import { LayoutIcon, BarChart3, CheckCircle, XCircle, LogOut, Eye } from 'lucide-react';
import Link from "next/link";
import {
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CampaignDetailsModal from './viewDetails';
import { Database } from '@/types/supabse';
import { DashboardContent } from './dashboardContent';
import { LoginForm } from './login'; 
import { PendingRequests } from './pending'; 
import { RejectedRequests } from './rejected';
import { ApprovedRequests } from './approved';

type CampaignDetails = Database['public']['Tables']['campaigns']['Row'];



// Main Dashboard Component
const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'pending' | 'approved' | 'rejected'>('dashboard');
  const [pendingCampaignsCount, setPendingCampaignsCount] = useState<number>(3);
  const [rejectedCampaignsCount, setRejectedCampaignsCount] = useState<number>(2);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on component mount
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/'); // Redirect to homepage
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'pending':
        return <PendingRequests campaigns={[]} />;
      case 'approved':
        return <ApprovedRequests />;
      case 'rejected':
        return <RejectedRequests />;
      default:
        return <DashboardContent />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-sm">
        <div className="sticky top-0 h-screen flex flex-col">
          <Link href="/">
          <div className="p-6 flex items-center space-x-2 border-b">
            <MountainIcon className="h-6 w-6 text-black" />
            <h1 className="text-xl font-bold">CrestFunding</h1>
          </div>
          </Link>
          
          <ScrollArea className="flex-1 py-4">
            <div className="space-y-1 px-3">
              <Button
                variant={activeView === 'dashboard' ? "default" : "ghost"}
                className="w-full justify-start mb-1 font-medium"
                onClick={() => setActiveView('dashboard')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Separator className="my-2" />
              <p className="text-xs font-medium text-gray-500 px-4 py-2 uppercase"></p>
              <Button
                variant={activeView === 'pending' ? "default" : "ghost"}
                className="w-full justify-start mb-1 font-medium"
                onClick={() => setActiveView('pending')}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Pending
                <Badge className="ml-2 bg-amber-100 text-amber-600">{pendingCampaignsCount}</Badge>
              </Button>
              <Button
                variant={activeView === 'approved' ? "default" : "ghost"}
                className="w-full justify-start mb-1 font-medium"
                onClick={() => setActiveView('approved')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approved
                <Badge className="ml-2 bg-green-100 text-green-600">3</Badge>
              </Button>
              <Button
                variant={activeView === 'rejected' ? "default" : "ghost"}
                className="w-full justify-start font-medium"
                onClick={() => setActiveView('rejected')}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rejected
                <Badge className="ml-2 bg-red-100 text-red-600">{rejectedCampaignsCount}</Badge>
              </Button>
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
        <div className="flex justify-around p-3">
          <Button
            variant={activeView === 'dashboard' ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center px-3 py-2"
            onClick={() => setActiveView('dashboard')}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Button>
          <Button
            variant={activeView === 'pending' ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center px-3 py-2 relative"
            onClick={() => setActiveView('pending')}
          >
            <LayoutIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Pending</span>
            <span className="absolute top-0 right-0 h-4 w-4 bg-amber-500 rounded-full text-xs text-white flex items-center justify-center">{pendingCampaignsCount}</span>
          </Button>
          <Button
            variant={activeView === 'approved' ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center px-3 py-2"
            onClick={() => setActiveView('approved')}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Approved</span>
          </Button>
          <Button
            variant={activeView === 'rejected' ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center px-3 py-2"
            onClick={() => setActiveView('rejected')}
          >
            <XCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Rejected</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

export default AdminDashboard;
"use client";

import React, { useState, useEffect, SVGProps, JSX } from 'react';
import { LayoutIcon, BarChart3, CheckCircle, XCircle, LogOut } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/util/supabse';
import { DashboardContent } from './dashboardContent';
import { LoginForm } from './login'; 
import { PendingRequests } from './pending'; 
import { RejectedRequests } from './rejected';
import { ApprovedRequests } from './approved';
import { Database } from '@/types/supabse';

// Define types
type Campaign = Database['public']['Tables']['campaigns']['Row'];

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'pending' | 'approved' | 'rejected'>('dashboard');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [pendingCampaignsCount, setPendingCampaignsCount] = useState<number>(0);
  const [rejectedCampaignsCount, setRejectedCampaignsCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    // Fetch campaigns
    const fetchCampaigns = async () => {
      const { data, error } = await supabase.from('campaigns').select('*');
      if (error) {
        console.error('Error fetching campaigns:', error);
      } else {
        setCampaigns(data);
        setPendingCampaignsCount(data.filter(c => c.approval_status === 'pending').length);
        setRejectedCampaignsCount(data.filter(c => c.approval_status === 'rejected').length);
      }
    };

    fetchCampaigns();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent  />; 
      case 'pending':
        return <PendingRequests campaigns={campaigns.filter(c => c.approval_status === 'pending')} />;
      case 'approved':
        return <ApprovedRequests />;
      case 'rejected':
        return <RejectedRequests campaigns={campaigns.filter(c => c.approval_status === 'rejected')} />;
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
  );
}

export default AdminDashboard;

"use client";

import React, { useState, useEffect, SVGProps, JSX } from 'react';
import { Layout, LayoutIcon, BarChart3, CheckCircle, XCircle, LogOut, User, Shield } from 'lucide-react';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Type definitions
interface LoginFormProps {
  onLogin: () => void;
}

// Login Component
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hard-coded credentials - in a real app, these should be stored securely
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-2">
            <MountainIcon className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">CrestFunding Admin</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-400" />
                <label className="text-sm font-medium">Username</label>
              </div>
              <Input
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-gray-400" />
                <label className="text-sm font-medium">Password</label>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Dashboard content components
const DashboardContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            Total Funds Raised
          </CardTitle>
          <CardDescription>Overall platform statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">$123,456</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">
          Updated today at 9:40 AM
        </CardFooter>
      </Card>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Layout className="mr-2 h-5 w-5 text-green-600" />
            Active Campaigns
          </CardTitle>
          <CardDescription>Currently running</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">48</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">
          Updated today at 9:40 AM
        </CardFooter>
      </Card>
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-purple-600" />
            Success Rate
          </CardTitle>
          <CardDescription>Campaign completion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple-600">76%</p>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">
          Updated today at 9:40 AM
        </CardFooter>
      </Card>
    </div>
    
    <h3 className="text-xl font-semibold mt-10 mb-4">Recent Activity</h3>
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className="divide-y">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Campaign #{i} was approved</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline" className="text-blue-600 bg-blue-50 hover:bg-blue-100">
                View
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const PendingRequests: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Pending Approval Requests</h2>
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="divide-y">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                  <LayoutIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <Badge variant="outline" className="ml-2 text-amber-600 bg-amber-50">Pending</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Requested: 2 days ago</p>
                  <p className="text-sm text-gray-600 mt-1">Fundraising goal: $25,000</p>
                </div>
              </div>
              <div className="flex space-x-2 ml-auto">
                <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-50">
                  <XCircle className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const ApprovedRequests: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Approved Campaigns</h2>
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="divide-y">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <Badge className="ml-2 bg-green-100 text-green-600 hover:bg-green-200">Approved</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Approved: 5 days ago</p>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">Progress: $12,540 of $25,000</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                      <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50 ml-auto">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const RejectedRequests: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Rejected Campaigns</h2>
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="divide-y">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <Badge variant="outline" className="ml-2 text-red-600 bg-red-50">Rejected</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Rejected: 1 week ago</p>
                  <p className="text-sm text-red-500 mt-1">Reason: Incomplete documentation</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50 ml-auto">
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// Main Dashboard Component
const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'pending' | 'approved' | 'rejected'>('dashboard');
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
        return <PendingRequests />;
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
          <div className="p-6 flex items-center space-x-2 border-b">
            <MountainIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">CrestFunding</h1>
          </div>
          
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
              <p className="text-xs font-medium text-gray-500 px-4 py-2 uppercase">Campaign Management</p>
              <Button
                variant={activeView === 'pending' ? "default" : "ghost"}
                className="w-full justify-start mb-1 font-medium"
                onClick={() => setActiveView('pending')}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Pending
                <Badge className="ml-2 bg-amber-100 text-amber-600">3</Badge>
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
                <Badge className="ml-2 bg-red-100 text-red-600">2</Badge>
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
            <span className="absolute top-0 right-0 h-4 w-4 bg-amber-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
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
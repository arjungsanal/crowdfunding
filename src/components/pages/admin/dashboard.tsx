"use client";

import React, { useState, useEffect } from 'react';
import { Layout, LayoutIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

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
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Rest of the components remain the same, just adding type annotations where needed
const DashboardContent: React.FC = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Total Funds Raised</CardTitle>
        <CardDescription>Overall platform statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">$123,456</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Active Campaigns</CardTitle>
        <CardDescription>Currently running</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">48</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Success Rate</CardTitle>
        <CardDescription>Campaign completion rate</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">76%</p>
      </CardContent>
    </Card>
  </div>
);

const PendingRequests: React.FC = () => (
    <div className="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Pending Approval Requests</CardTitle>
        <CardDescription>Campaigns awaiting review</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <p className="text-sm text-gray-500">Requested: 2 days ago</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="default" size="sm">Approve</Button>
                    <Button variant="destructive" size="sm">Reject</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ApprovedRequests: React.FC = () => (
    <div className="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Approved Campaigns</CardTitle>
        <CardDescription>Successfully approved campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <p className="text-sm text-gray-500">Approved: 5 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const RejectedRequests: React.FC = () => (
    <div className="grid gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Rejected Campaigns</CardTitle>
        <CardDescription>Campaigns that didn't meet criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Campaign #{i}</h4>
                    <p className="text-sm text-gray-500">Rejected: 1 week ago</p>
                    <p className="text-sm text-red-500">Reason: Incomplete documentation</p>
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
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
    <div className="min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed h-[calc(100vh-8rem)] bg-white border-r">
          <div className="p-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-2 p-4">
              <Button
                variant={activeView === 'dashboard' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveView('dashboard')}
              >
                <Layout className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeView === 'pending' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveView('pending')}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Pending Requests
              </Button>
              <Button
                variant={activeView === 'approved' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveView('approved')}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Approved Requests
              </Button>
              <Button
                variant={activeView === 'rejected' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveView('rejected')}
              >
                <LayoutIcon className="mr-2 h-4 w-4" />
                Rejected Requests
              </Button>
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
          <div className="flex justify-around p-2">
            <Button
              variant={activeView === 'dashboard' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView('dashboard')}
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'pending' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView('pending')}
            >
              <LayoutIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'approved' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView('approved')}
            >
              <LayoutIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === 'rejected' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView('rejected')}
            >
              <LayoutIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64 p-4 pb-16 md:pb-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
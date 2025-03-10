import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MountainIcon, User, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";


// Type definitions
interface LoginFormProps {
    onLogin: () => void;
  }

// Login Component
export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  
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
  
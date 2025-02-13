'use client'; // Make this a Client Component

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/protectedRoute';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  // Placeholder for profile update logic
  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  // Placeholder for delete account toast
  const handleDeleteAccount = () => {
    toast({
      title: 'Feature Not Implemented',
      description: 'The "Delete Account" feature is yet to be implemented.',
      variant: 'destructive',
    });
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user?.user_metadata.avatar_url || 'https://github.com/shadcn.png'} />
              <AvatarFallback>{user?.user_metadata.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">Welcome, {user?.user_metadata.username || 'User'}!</CardTitle>
            <CardDescription>Manage your profile and settings here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  defaultValue={user?.user_metadata.username || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email || ''}
                  disabled
                />
              </div>
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
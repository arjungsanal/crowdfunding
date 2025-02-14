"use client"

import { useAuth } from "@/context/AuthContext"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import ProtectedRoute from "@/components/protectedRoute"
import { Camera, LogOut, Trash2, User, Mail, Lock } from "lucide-react"
import type React from "react"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Feature Not Implemented",
      description: 'The "Delete Account" feature is yet to be implemented.',
      variant: "destructive",
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
          {/* Header Section */}
          <div className="relative h-40 bg-gradient-to-r from-blue-400/80 to-purple-400/80 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-16 mb-8">
              <Avatar className="w-28 h-28 border-4 border-white shadow-md">
                <AvatarImage 
                  src={user?.user_metadata.avatar_url || "/placeholder.svg?height=128&width=128"}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg">
                  {user?.user_metadata.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <h1 className="mt-4 text-2xl font-semibold text-gray-800">
                {user?.user_metadata.username || "User"}
              </h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    defaultValue={user?.user_metadata.username || ""}
                    className="h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                    defaultValue={user?.email || ""} 
                    className="h-10 bg-gray-50"
                    disabled 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                    Current Password
                  </Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                    New Password
                  </Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-10"
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={signOut} 
                    className="flex-1 sm:flex-none"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button 
                    type="button"
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
                <Button type="submit" className="flex-1 sm:flex-none">
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
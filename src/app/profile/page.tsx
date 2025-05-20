"use client"

import { useAuth } from "@/context/AuthContext"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import ProtectedRoute from "@/components/protectedRoute"
import { LogOut, User, Mail, Lock, Clock, DollarSign, ChevronRight, ArrowDownCircle } from "lucide-react"
import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { fetchMyCampaigns } from "@/util/helper"


export default function ProfilePage() {

  const campaigns = [
    {
      title: "Save the Local Theater",
      image: "https://imgs.search.brave.com/P6G2ByTgcQN1B1OINYkwQP272VoJtBwCIjuSHql1bhc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQ2LzAyLzQ4/LzM2MF9GXzk0NjAy/NDg2MF9RRFdmQkdx/TXZHQUZFbmtOcDFh/V2lEckZvYno5eERh/di5qcGc",
      requiredAmount: 50000,
      collectedAmount: 32500,
      endDate: "2025-03-15",
      progress: 65
    },
    {
      title: "Community Garden Project",
      image: "https://imgs.search.brave.com/4B2XBoj258CiiZFG1VoTCNaR_dY6_QT33OkP65AE4CE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MTg4NzI5L3Bob3Rv/L2dyb3VwLXdvcmtp/bmctaW4tYW4tdXJi/YW4tb3JnYW5pYy1j/b21tdW5pdHktZ2Fy/ZGVuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz13cVJqX0Za/VThINGEyYlc1VHhf/clFGOVpNMGZfbFJ3/aGhxNWp5dVpUMjlv/PQ",
      requiredAmount: 25000,
      collectedAmount: 18750,
      endDate: "2025-04-01",
      progress: 75
    },
    {
      title: "Youth Sports Program",
      image: "https://imgs.search.brave.com/agiyXUggFb9dh5LJJ_NKpIh_3JqYCK0YHEhhve6mijs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbGlj/a2xvdmVncm93LmNv/bS93cC1jb250ZW50/L25ld19mb2xkZXIv/MjAxNS8wNi8yMDE1/MDUxMC1fQTBBMzQx/OV9GLTEwMjR4Njgz/LmpwZw",
      requiredAmount: 35000,
      collectedAmount: 15750,
      endDate: "2025-03-30",
      progress: 45
    }
];

  const { user, signOut } = useAuth()
  const { toast } = useToast()
  console.log(user)
    //   const activeCampaigns =  fetchMyCampaigns(user?.id);
    // console.log("Approved campaigns here: ", activeCampaigns);

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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <Card className="w-full max-w-3xl mx-auto shadow-lg">
          {/* Header Section */}
          <div className="relative h-40 bg-gradient-to-r from-blue-400/80 to-purple-400/80 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            {/* <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
            </Button> */}
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
                {/* <div className="space-y-2">
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
                </div> */}
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
                  {/* <Button 
                    type="button"
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button> */}
                </div>
                {/* <Button type="submit" className="flex-1 sm:flex-none">
                  Update Profile
                </Button> */}
              </div>
            </form>
          </div>
        </Card>

        {/* MODIFIED YOUR CAMPAIGNS SECTION */}
        <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg">
  <div className="p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Campaigns</h2>
    
    <div className="space-y-4">
      {campaigns.map((campaign, index) => (
        <div key={index} className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/4 h-32 sm:h-auto overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 sm:p-5 sm:w-3/4 flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{campaign.title}</h3>
                <div className="flex items-center mb-3">
                  <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    <span className="text-gray-600">${campaign.collectedAmount.toLocaleString()}</span>
                    <span className="text-gray-400 mx-1">of</span>
                    <span className="text-gray-600">${campaign.requiredAmount.toLocaleString()}</span>
                  </div>
                  <span className="font-medium text-gray-700">{campaign.progress}%</span>
                </div>
                
                <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-green-600 hover:text-green-800 hover:bg-green-50 p-0 h-6" 
                >
                  <ArrowDownCircle className="mr-1 h-3 w-3" />
                  Withdraw
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 p-0 h-6">
                  View details
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-6 flex justify-center">
      <Button variant="outline" className="text-sm">
        <Link href='/campaign'>Create New Campaign</Link>
      </Button>
    </div>
  </div>
</Card>
      </div>
      
      <Footer />
    </ProtectedRoute>
  )
}
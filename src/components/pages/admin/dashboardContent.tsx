import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  BarChart3, CheckCircle, Layout } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dashboard content components
export const DashboardContent: React.FC = () => (
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
              <CheckCircle className="mr-2 h-5 w-5 text-yellow-400" />
              Pending Approval
            </CardTitle>
            <CardDescription>Campaign pending rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">7</p>
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
  
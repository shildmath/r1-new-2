
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import StrategyCallSubmissions from '@/components/admin/StrategyCallSubmissions';
import SiteSettings from '@/components/admin/SiteSettings';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Settings,
  BarChart3,
  Mail,
  Phone,
  Plus,
  Download,
  Bell,
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    {
      title: "Total Clients",
      value: "2,500",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Contact Forms",
      value: "89",
      change: "+23%",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Strategy Calls",
      value: "34",
      change: "+8%",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Revenue",
      value: "$2.1M",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "contact",
      name: "John Smith",
      email: "john@example.com",
      action: "submitted contact form",
      time: "2 hours ago",
      status: "New"
    },
    {
      id: 2,
      type: "strategy_call",
      name: "Sarah Wilson",
      email: "sarah@company.com",
      action: "booked strategy call",
      time: "4 hours ago",
      status: "Scheduled"
    },
    {
      id: 3,
      type: "contact",
      name: "Mike Johnson",
      email: "mike@business.com",
      action: "submitted contact form",
      time: "6 hours ago",
      status: "Contacted"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm border border-gray-200 mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="contact-submissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Contact Forms
            </TabsTrigger>
            <TabsTrigger value="strategy-calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Strategy Calls
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Site Settings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <p className="text-xs text-green-600 font-medium">
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Activity
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Latest form submissions and user activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            {activity.type === 'contact' ? (
                              <Mail className="w-4 h-4 text-white" />
                            ) : (
                              <Phone className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.name}</p>
                            <p className="text-sm text-gray-600">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={activity.status === 'New' ? 'default' : 'secondary'} className="mb-1">
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab("contact-submissions")}
                  >
                    View All Activities
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
                    variant="outline"
                    onClick={() => setActiveTab("services")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Service
                  </Button>
                  <Button 
                    className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
                    variant="outline"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Update Site Settings
                  </Button>
                  <Button 
                    className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
                    variant="outline"
                    onClick={() => setActiveTab("contact-submissions")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review Contact Forms
                  </Button>
                  <Button 
                    className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
                    variant="outline"
                    onClick={() => setActiveTab("strategy-calls")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Strategy Calls
                  </Button>
                  <Button 
                    className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" 
                    variant="outline"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contact-submissions">
            <ContactSubmissions />
          </TabsContent>

          {/* Strategy Calls Tab */}
          <TabsContent value="strategy-calls">
            <StrategyCallSubmissions />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">Service management interface coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">This will integrate with Supabase for full CRUD operations</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Website visitor analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Analytics integration with Supabase coming soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Conversion Rates</CardTitle>
                  <CardDescription>Form submission analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Real-time conversion tracking coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

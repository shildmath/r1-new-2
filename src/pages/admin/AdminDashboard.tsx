
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [contactSubmissions, setContactSubmissions] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      company: "Tech Corp",
      message: "Interested in AI marketing solutions",
      type: "Contact Form",
      date: "2024-01-15",
      status: "New"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      company: "StartupXYZ",
      message: "Looking for comprehensive marketing strategy",
      type: "Strategy Call",
      date: "2024-01-14",
      status: "Contacted"
    }
  ]);

  const [services, setServices] = useState([
    {
      id: 1,
      title: "AI-Powered Social Media Marketing",
      description: "Intelligent content creation and audience targeting",
      status: "Active"
    },
    {
      id: 2,
      title: "SEO & Content Strategy",
      description: "Data-driven SEO strategies",
      status: "Active"
    }
  ]);

  const stats = [
    {
      title: "Total Clients",
      value: "450",
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
      value: "$127K",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
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
                <Settings className="w-4 h-4 mr-2" />
                Settings
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
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border border-gray-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Content
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
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-0 shadow-lg">
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

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Submissions
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      {contactSubmissions.length} Total
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Latest contact forms and strategy call requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactSubmissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            {submission.type === 'Contact Form' ? (
                              <Mail className="w-4 h-4 text-white" />
                            ) : (
                              <Phone className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{submission.name}</p>
                            <p className="text-sm text-gray-600">{submission.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={submission.status === 'New' ? 'default' : 'secondary'}>
                            {submission.status}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">{submission.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Manage your content and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Service
                  </Button>
                  <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Team Info
                  </Button>
                  <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Site Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Form Submissions</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Export CSV</Button>
                <Button>Mark All Read</Button>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contactSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                              <div className="text-sm text-gray-500">{submission.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{submission.type}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={submission.status === 'New' ? 'default' : 'secondary'}>
                              {submission.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Update your website content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <Input defaultValue="AIAdMaxify" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tagline</label>
                    <Input defaultValue="AI-Powered Marketing Solutions" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Hero Description</label>
                    <Textarea defaultValue="Transform your business with AI-powered marketing strategies" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Update homepage statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Client Satisfaction</label>
                      <Input defaultValue="97%" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Average ROI</label>
                      <Input defaultValue="17X" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Happy Clients</label>
                      <Input defaultValue="450+" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Revenue Generated</label>
                      <Input defaultValue="$50M+" />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    Update Stats
                  </Button>
                </CardContent>
              </Card>
            </div>
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
                    <p className="text-gray-500">Analytics Chart Placeholder</p>
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
                    <p className="text-gray-500">Conversion Chart Placeholder</p>
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

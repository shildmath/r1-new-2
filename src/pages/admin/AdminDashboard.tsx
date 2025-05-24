
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import StrategyCallSubmissions from '@/components/admin/StrategyCallSubmissions';
import ServicesManager from '@/components/admin/ServicesManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import SiteSettings from '@/components/admin/SiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  Search,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    contactForms: 0,
    strategyCalls: 0,
    services: 0,
    testimonials: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load stats
      const [contactsRes, callsRes, servicesRes, testimonialsRes] = await Promise.all([
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('strategy_calls').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        contactForms: contactsRes.count || 0,
        strategyCalls: callsRes.count || 0,
        services: servicesRes.count || 0,
        testimonials: testimonialsRes.count || 0
      });

      // Load recent activity
      const recentContactsRes = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      const recentCallsRes = await supabase
        .from('strategy_calls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      const combinedActivity = [
        ...(recentContactsRes.data || []).map(item => ({
          ...item,
          type: 'contact',
          action: 'submitted contact form'
        })),
        ...(recentCallsRes.data || []).map(item => ({
          ...item,
          type: 'strategy_call',
          action: 'booked strategy call'
        }))
      ];

      // Sort by created_at desc
      combinedActivity.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setRecentActivity(combinedActivity.slice(0, 5));
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error loading dashboard data',
        description: 'There was a problem fetching dashboard information.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate('/admin');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        variant: "destructive"
      });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  const dashboardStats = [
    {
      title: "Contact Forms",
      value: stats.contactForms.toString(),
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Strategy Calls",
      value: stats.strategyCalls.toString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Services",
      value: stats.services.toString(),
      icon: Settings,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Testimonials",
      value: stats.testimonials.toString(),
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
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
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
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
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Site Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
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
                        View all {stat.title.toLowerCase()}
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
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivity.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">No recent activity found.</p>
                      ) : (
                        recentActivity.map((activity, index) => (
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
                                {activity.status || 'New'}
                              </Badge>
                              <p className="text-xs text-gray-500">{formatTimeAgo(activity.created_at)}</p>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
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
                    onClick={() => setActiveTab("testimonials")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add New Testimonial
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
          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

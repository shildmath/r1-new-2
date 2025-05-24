
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Settings,
  BarChart3,
  Mail,
  Phone
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Clients",
      value: "450",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Contact Forms",
      value: "89",
      change: "+23%",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "Strategy Calls",
      value: "34",
      change: "+8%",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Revenue",
      value: "$127K",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentSubmissions = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "Contact Form",
      date: "2024-01-15",
      status: "New"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      type: "Strategy Call",
      date: "2024-01-14",
      status: "Contacted"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@startup.io",
      type: "Contact Form",
      date: "2024-01-14",
      status: "New"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="agency-btn">
                <Mail className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                Latest contact forms and strategy call requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        {submission.type === 'Contact Form' ? (
                          <Mail className="w-4 h-4 text-white" />
                        ) : (
                          <Phone className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{submission.name}</p>
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your content and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Team Members
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                View All Testimonials
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Site Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Download, Calendar, Phone } from 'lucide-react';

const StrategyCallSubmissions = () => {
  const [submissions] = useState([
    {
      id: 1,
      firstName: "Alex",
      lastName: "Wilson",
      email: "alex@techstartup.com",
      phone: "+1234567890",
      company: "TechStartup Inc",
      industry: "technology",
      teamSize: "21-50",
      revenue: "1m-5m",
      goals: "Scale our marketing efforts and increase lead generation by 300%",
      challenges: "Limited marketing budget and lack of in-house expertise",
      budget: "10k-25k",
      timeline: "1-month",
      preferredTime: "morning",
      submittedAt: "2024-01-15T11:30:00Z",
      status: "Scheduled"
    },
    {
      id: 2,
      firstName: "Emma",
      lastName: "Davis",
      email: "emma@retailbrand.com",
      phone: "+1234567891",
      company: "Retail Brand Co",
      industry: "retail",
      teamSize: "6-20",
      revenue: "500k-1m",
      goals: "Improve online sales and brand awareness",
      challenges: "Competition from larger brands and low online visibility",
      budget: "5k-10k",
      timeline: "2-3-months",
      preferredTime: "afternoon",
      submittedAt: "2024-01-14T16:20:00Z",
      status: "New"
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Strategy Call Bookings</h2>
          <p className="text-gray-600">Manage strategy call requests and bookings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Calls
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Strategy Call Requests
            <Badge variant="outline" className="text-purple-600 border-purple-600">
              {submissions.length} Total
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage and schedule strategy call consultations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <motion.tr
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {submission.firstName} {submission.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{submission.email}</div>
                        <div className="text-sm text-gray-500">{submission.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.company}</div>
                        <div className="text-sm text-gray-500">{submission.teamSize} employees</div>
                        <div className="text-sm text-gray-500">{submission.revenue} revenue</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{submission.industry}</Badge>
                    </TableCell>
                    <TableCell>{submission.budget}</TableCell>
                    <TableCell>{submission.timeline}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(submission.submittedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyCallSubmissions;

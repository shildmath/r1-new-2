
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { storage } from '@/utils/localStorage';
import { ContactSubmission } from '@/types/admin';
import { MessageSquare, Mail, Phone, Trash2, Filter, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(storage.getContactSubmissions());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const handleStatusChange = (submissionId: string, newStatus: 'new' | 'handled') => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    storage.setContactSubmissions(updatedSubmissions);
    toast({
      title: "Status Updated",
      description: "Contact submission status has been updated successfully.",
    });
  };

  const handleDelete = (submissionId: string) => {
    const updatedSubmissions = submissions.filter(sub => sub.id !== submissionId);
    setSubmissions(updatedSubmissions);
    storage.setContactSubmissions(updatedSubmissions);
    toast({
      title: "Submission Deleted",
      description: "Contact submission has been deleted successfully.",
    });
  };

  const clearFilters = () => {
    setStatusFilter('all');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (statusFilter !== 'all' && submission.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ChevronLeft size={16} />
              Previous
            </Button>
            <h1 className="text-3xl font-bold text-primary">Contact Form Submissions</h1>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <MessageSquare size={20} className="text-primary" />
            <Badge variant="secondary">{submissions.length}</Badge>
          </div>
        </div>

        <p className="text-gray-600 mb-6">View and manage all contact form submissions from both Home and Contact pages</p>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-primary" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New Messages</SelectItem>
                    <SelectItem value="handled">Handled Messages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={clearFilters}>
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredSubmissions.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={submission.source === 'home' ? 'default' : 'secondary'}>
                          {submission.source === 'home' ? 'Contact Page' : 'Contact Page'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={submission.status === 'new' ? 'bg-red-500' : 'bg-green-500'}
                        >
                          {submission.status === 'new' ? 'New Message' : 'Handled'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Select 
                            value={submission.status} 
                            onValueChange={(value: 'new' | 'handled') => handleStatusChange(submission.id, value)}
                          >
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="handled">Handled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(submission.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Contact Submissions</h3>
              <p className="text-gray-600">Contact submissions will appear here when visitors fill out the contact forms.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default ContactSubmissionsPage;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/utils/localStorage';
import { ContactSubmission } from '@/types/admin';
import { MessageSquare, Mail, Phone, Trash2, Filter } from 'lucide-react';
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Contact Submissions</h1>
          
          {/* Status Filter */}
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
        </div>

        {filteredSubmissions.length > 0 ? (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                          <MessageSquare className="text-white" size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{submission.name}</CardTitle>
                          <p className="text-sm text-gray-600 flex items-center space-x-2">
                            <Mail size={14} />
                            <span>{submission.email}</span>
                          </p>
                          {submission.phone && (
                            <p className="text-sm text-gray-600 flex items-center space-x-2">
                              <Phone size={14} />
                              <span>{submission.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={submission.source === 'home' ? 'default' : 'secondary'}>
                          {submission.source} page
                        </Badge>
                        <Badge 
                          className={submission.status === 'new' ? 'bg-orange-500' : 'bg-green-500'}
                        >
                          {submission.status === 'new' ? 'New Message' : 'Handled Message'}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                        
                        {/* Status Change Dropdown */}
                        <Select 
                          value={submission.status} 
                          onValueChange={(value: 'new' | 'handled') => handleStatusChange(submission.id, value)}
                        >
                          <SelectTrigger className="w-32">
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Message:</h4>
                      <p className="text-gray-700">{submission.message}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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

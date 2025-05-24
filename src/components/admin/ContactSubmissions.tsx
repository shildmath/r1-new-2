
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Download, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchDataFromTable, updateDataInTable, deleteDataFromTable } from '@/utils/supabaseHelpers';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await fetchDataFromTable<ContactSubmission>('contact_submissions', { orderBy: 'created_at', ascending: false });
    setSubmissions(data);
    setLoading(false);
  };

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
      case 'Contacted': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (submission: ContactSubmission) => {
    setCurrentSubmission(submission);
    setViewDialogOpen(true);
  };

  const handleEdit = (submission: ContactSubmission) => {
    setCurrentSubmission(submission);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const success = await deleteDataFromTable('contact_submissions', id);
      if (success) {
        setSubmissions(submissions.filter(submission => submission.id !== id));
      }
    }
  };

  const handleStatusChange = async (value: string) => {
    if (!currentSubmission) return;

    const updatedSubmission = await updateDataInTable<ContactSubmission>(
      'contact_submissions', 
      currentSubmission.id, 
      { status: value }
    );
    
    if (updatedSubmission) {
      setSubmissions(submissions.map(s => s.id === currentSubmission.id ? updatedSubmission : s));
      setCurrentSubmission(updatedSubmission);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Submitted'];
    const csvRows = [];
    
    csvRows.push(headers.join(','));
    
    for (const submission of submissions) {
      const row = [
        `"${submission.name.replace(/"/g, '""')}"`,
        `"${submission.email.replace(/"/g, '""')}"`,
        `"${submission.phone?.replace(/"/g, '""') || 'N/A'}"`,
        `"${submission.message.replace(/"/g, '""')}"`,
        `"${submission.status}"`,
        `"${formatDate(submission.created_at)}"`
      ];
      csvRows.push(row.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h2>
          <p className="text-gray-600">Manage and respond to contact form inquiries</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Bulk Email
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Contact Submissions
            <Badge variant="outline" className="text-purple-600 border-purple-600">
              {submissions.length} Total
            </Badge>
          </CardTitle>
          <CardDescription>
            Latest contact form submissions from your website
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No submissions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell className="text-sm">{submission.email}</TableCell>
                        <TableCell className="text-sm">{submission.phone || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status || 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(submission.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleView(submission)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(submission)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(submission.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on {currentSubmission && formatDate(currentSubmission.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {currentSubmission && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p className="font-medium">{currentSubmission.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <Badge className={getStatusColor(currentSubmission.status)}>
                    {currentSubmission.status || 'New'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Email</Label>
                  <p className="font-medium">{currentSubmission.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Phone</Label>
                  <p className="font-medium">{currentSubmission.phone || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Message</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{currentSubmission.message}</p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setViewDialogOpen(false);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleDelete(currentSubmission.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Update Submission Status</DialogTitle>
            <DialogDescription>
              Change the status and add notes to this contact submission
            </DialogDescription>
          </DialogHeader>
          
          {currentSubmission && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Name</Label>
                  <Input value={currentSubmission.name} disabled />
                </div>
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input value={currentSubmission.email} disabled />
                </div>
              </div>
              
              <div>
                <Label className="text-sm">Status</Label>
                <Select
                  defaultValue={currentSubmission.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm">Message</Label>
                <Textarea
                  value={currentSubmission.message}
                  disabled
                  rows={4}
                  className="bg-gray-50"
                />
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setEditDialogOpen(false)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Update Status
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactSubmissions;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit, Trash2, Download, Calendar, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchDataFromTable, updateDataInTable, deleteDataFromTable } from '@/utils/supabaseHelpers';
import { Tables } from '@/integrations/supabase/types';

type StrategyCall = Tables['strategy_calls']['Row'];

const StrategyCallSubmissions = () => {
  const [submissions, setSubmissions] = useState<StrategyCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<StrategyCall | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await fetchDataFromTable('strategy_calls', { orderBy: 'created_at', ascending: false });
    setSubmissions(data as StrategyCall[]);
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
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (submission: StrategyCall) => {
    setCurrentSubmission(submission);
    setViewDialogOpen(true);
  };

  const handleEdit = (submission: StrategyCall) => {
    setCurrentSubmission(submission);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this strategy call submission?')) {
      const success = await deleteDataFromTable('strategy_calls', id);
      if (success) {
        setSubmissions(submissions.filter(submission => submission.id !== id));
      }
    }
  };

  const handleStatusChange = async (value: string) => {
    if (!currentSubmission) return;

    const updatedSubmission = await updateDataInTable(
      'strategy_calls', 
      currentSubmission.id, 
      { status: value }
    );
    
    if (updatedSubmission) {
      setSubmissions(submissions.map(s => s.id === currentSubmission.id ? updatedSubmission as StrategyCall : s));
      setCurrentSubmission(updatedSubmission as StrategyCall);
    }
  };

  const handleBookingDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentSubmission) return;
    
    const updatedSubmission = await updateDataInTable(
      'strategy_calls',
      currentSubmission.id,
      { booking_date: e.target.value ? new Date(e.target.value).toISOString() : null }
    );
    
    if (updatedSubmission) {
      setSubmissions(submissions.map(s => s.id === currentSubmission.id ? updatedSubmission as StrategyCall : s));
      setCurrentSubmission(updatedSubmission as StrategyCall);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Website', 'Goals', 'Status', 'Booking Date', 'Submitted'];
    const csvRows = [];
    
    csvRows.push(headers.join(','));
    
    for (const submission of submissions) {
      const row = [
        `"${submission.name.replace(/"/g, '""')}"`,
        `"${submission.email.replace(/"/g, '""')}"`,
        `"${submission.phone.replace(/"/g, '""')}"`,
        `"${submission.company?.replace(/"/g, '""') || 'N/A'}"`,
        `"${submission.website?.replace(/"/g, '""') || 'N/A'}"`,
        `"${submission.goals.replace(/"/g, '""')}"`,
        `"${submission.status}"`,
        `"${submission.booking_date ? formatDate(submission.booking_date) : 'Not Scheduled'}"`,
        `"${formatDate(submission.created_at)}"`
      ];
      csvRows.push(row.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `strategy_calls_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Strategy Call Bookings</h2>
          <p className="text-gray-600">Manage strategy call requests and bookings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
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
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No strategy call submissions found.
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
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{submission.email}</div>
                            <div className="text-sm">{submission.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{submission.company || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(submission.status || 'New')}>
                            {submission.status || 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {submission.booking_date ? formatDate(submission.booking_date) : 'Not scheduled'}
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
            <DialogTitle>Strategy Call Request Details</DialogTitle>
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
                  <p className="font-medium">{currentSubmission.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Company</Label>
                  <p className="font-medium">{currentSubmission.company || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Website</Label>
                  <p className="font-medium">
                    {currentSubmission.website ? (
                      <a href={currentSubmission.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {currentSubmission.website}
                      </a>
                    ) : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Goals</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{currentSubmission.goals}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Booking Date</Label>
                <p className="font-medium">
                  {currentSubmission.booking_date ? formatDate(currentSubmission.booking_date) : 'Not scheduled'}
                </p>
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
            <DialogTitle>Update Strategy Call</DialogTitle>
            <DialogDescription>
              Schedule and manage this strategy call request
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
              
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Booking Date</Label>
                  <Input
                    type="datetime-local"
                    value={currentSubmission.booking_date ? 
                      new Date(currentSubmission.booking_date).toISOString().slice(0, 16) : 
                      ''
                    }
                    onChange={handleBookingDateChange}
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm">Goals</Label>
                <Textarea
                  value={currentSubmission.goals}
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
                  Update Call Details
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrategyCallSubmissions;

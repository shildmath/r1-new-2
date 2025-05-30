
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { storage } from '@/utils/localStorage';
import { ContactSubmission } from '@/types/admin';
import { exportContactSubmissionsToCSV } from '@/utils/csvExport';
import { MessageSquare, Mail, Filter, Eye, X, Download, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(storage.getContactSubmissions());
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (submissionId: string, status: 'new' | 'handled') => {
    const updatedSubmissions = submissions.map(submission => 
      submission.id === submissionId ? { ...submission, status } : submission
    );
    setSubmissions(updatedSubmissions);
    storage.setContactSubmissions(updatedSubmissions);
    toast({
      title: "Status Updated",
      description: "Contact submission status has been updated successfully.",
    });
  };

  const clearFilters = () => {
    setSourceFilter('all');
    setStatusFilter('all');
    setDateFrom('');
    setDateTo('');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const handleExportCSV = () => {
    exportContactSubmissionsToCSV(filteredSubmissions);
    toast({
      title: "CSV Exported",
      description: "Contact submissions have been exported to CSV file.",
    });
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (sourceFilter !== 'all' && submission.source !== sourceFilter) return false;
    if (statusFilter !== 'all' && submission.status !== statusFilter) return false;
    if (dateFrom && submission.createdAt < dateFrom) return false;
    if (dateTo && submission.createdAt > dateTo) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    return status === 'new' ? 'bg-orange-500' : 'bg-green-500';
  };

  const getSourceColor = (source: string) => {
    return source === 'home' ? 'bg-blue-500' : 'bg-purple-500';
  };

  const totalSubmissions = submissions.length;
  const newSubmissions = submissions.filter(s => s.status === 'new').length;
  const handledSubmissions = submissions.filter(s => s.status === 'handled').length;
  const homeSubmissions = submissions.filter(s => s.source === 'home').length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Submissions
            </h1>
            <p className="text-gray-600 mt-2">Manage all contact form submissions from your website</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={handleExportCSV} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
              <MessageSquare size={20} className="text-blue-600" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">{totalSubmissions}</Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Submissions</p>
                  <p className="text-3xl font-bold">{totalSubmissions}</p>
                  <p className="text-blue-200 text-xs mt-1">All sources</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">New Submissions</p>
                  <p className="text-3xl font-bold">{newSubmissions}</p>
                  <p className="text-orange-200 text-xs mt-1">Needs attention</p>
                </div>
                <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Handled</p>
                  <p className="text-3xl font-bold">{handledSubmissions}</p>
                  <p className="text-green-200 text-xs mt-1">Completed</p>
                </div>
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Home Page</p>
                  <p className="text-3xl font-bold">{homeSubmissions}</p>
                  <p className="text-purple-200 text-xs mt-1">From homepage</p>
                </div>
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6 shadow-lg border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-32 border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 border-green-200 focus:border-green-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="handled">Handled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  type="date" 
                  placeholder="From Date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-36 border-gray-200 focus:border-blue-500"
                />
                
                <Input 
                  type="date" 
                  placeholder="To Date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-36 border-gray-200 focus:border-blue-500"
                />
              </div>
              
              <Button variant="outline" onClick={clearFilters} className="border-red-200 text-red-600 hover:bg-red-50">
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredSubmissions.length > 0 ? (
          <Card className="shadow-xl border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <TableHead className="font-semibold text-gray-700">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                      <TableHead className="font-semibold text-gray-700">Source</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-semibold text-gray-800">{submission.name}</p>
                            <p className="text-sm text-gray-500">ID: {submission.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">{submission.email}</p>
                            {submission.phone && (
                              <p className="text-sm text-gray-600">{submission.phone}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getSourceColor(submission.source)} text-white`}>
                            {submission.source === 'home' ? 'Home Page' : 'Contact Page'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={submission.status} 
                            onValueChange={(value: 'new' | 'handled') => handleStatusChange(submission.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="handled">Handled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{new Date(submission.createdAt).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">{new Date(submission.createdAt).toLocaleTimeString()}</p>
                        </TableCell>
                        <TableCell>
                          <Dialog open={showDetails && selectedSubmission?.id === submission.id} onOpenChange={setShowDetails}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedSubmission(submission)}
                                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              >
                                <Eye size={14} className="mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-xl text-blue-800">
                                  Contact Submission Details
                                </DialogTitle>
                              </DialogHeader>
                              {selectedSubmission && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-600">Name</label>
                                      <p className="font-medium text-lg">{selectedSubmission.name}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-600">Email</label>
                                      <p className="font-medium">{selectedSubmission.email}</p>
                                    </div>
                                    {selectedSubmission.phone && (
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="font-medium">{selectedSubmission.phone}</p>
                                      </div>
                                    )}
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-600">Source</label>
                                      <Badge className={`mt-1 ${getSourceColor(selectedSubmission.source)} text-white`}>
                                        {selectedSubmission.source === 'home' ? 'Home Page' : 'Contact Page'}
                                      </Badge>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-600">Status</label>
                                      <Badge className={`mt-1 ${getStatusColor(selectedSubmission.status)} text-white`}>
                                        {selectedSubmission.status.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <label className="text-sm font-medium text-gray-600">Submitted</label>
                                      <p className="font-medium">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Message</label>
                                    <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                      <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                                    </div>
                                  </div>

                                  <div className="flex justify-end space-x-3">
                                    <Button
                                      variant="outline"
                                      onClick={() => handleStatusChange(selectedSubmission.id, selectedSubmission.status === 'new' ? 'handled' : 'new')}
                                      className={selectedSubmission.status === 'new' ? 'border-green-200 text-green-600 hover:bg-green-50' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}
                                    >
                                      Mark as {selectedSubmission.status === 'new' ? 'Handled' : 'New'}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl">
            <CardContent className="p-12 text-center">
              <MessageSquare size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Submissions Found</h3>
              <p className="text-gray-600 mb-6">No contact submissions match the current filters. Try adjusting your filter criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default ContactSubmissionsPage;

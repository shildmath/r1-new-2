
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { storage } from '@/utils/localStorage';
import { ContactSubmission } from '@/types/admin';
import { Home, Mail, Phone, MessageSquare, Filter, X, Download, Eye, Archive, Trash2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportToCSV } from '@/utils/csvExport';

const HomePageContactPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    month: '',
    search: ''
  });
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = storage.getContactSubmissions();
    const homeSubmissions = allSubmissions.filter(sub => sub.source === 'home');
    setSubmissions(homeSubmissions);
    console.log('Loaded home page contact submissions:', homeSubmissions);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      dateFrom: '',
      dateTo: '',
      month: '',
      search: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const updateSubmissionStatus = (submissionId: string, newStatus: 'new' | 'contacted' | 'closed') => {
    const allSubmissions = storage.getContactSubmissions();
    const updatedSubmissions = allSubmissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    );
    storage.setContactSubmissions(updatedSubmissions);
    loadSubmissions();

    toast({
      title: "Status Updated",
      description: `Submission status changed to ${newStatus}.`,
    });
  };

  const deleteSubmission = (submissionId: string) => {
    const allSubmissions = storage.getContactSubmissions();
    const updatedSubmissions = allSubmissions.filter(sub => sub.id !== submissionId);
    storage.setContactSubmissions(updatedSubmissions);
    loadSubmissions();

    toast({
      title: "Submission Deleted",
      description: "Contact submission has been deleted.",
    });
  };

  const exportCSV = () => {
    const csvData = filteredSubmissions.map(sub => ({
      'Name': sub.name,
      'Email': sub.email,
      'Phone': sub.phone || 'N/A',
      'Message': sub.message,
      'Status': sub.status,
      'Source': sub.source,
      'Date': new Date(sub.createdAt).toLocaleDateString()
    }));

    exportToCSV(csvData, 'home-page-contact-submissions');
    
    toast({
      title: "CSV Exported",
      description: "Contact submissions have been exported to CSV.",
    });
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filters.status !== 'all' && submission.status !== filters.status) return false;
    if (filters.dateFrom && submission.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && submission.createdAt > filters.dateTo) return false;
    if (filters.month) {
      const submissionMonth = submission.createdAt.substring(0, 7);
      if (submissionMonth !== filters.month) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return submission.name.toLowerCase().includes(searchLower) ||
             submission.email.toLowerCase().includes(searchLower) ||
             submission.message.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const newSubmissions = filteredSubmissions.filter(sub => sub.status === 'new');
  const contactedSubmissions = filteredSubmissions.filter(sub => sub.status === 'contacted');
  const closedSubmissions = filteredSubmissions.filter(sub => sub.status === 'closed');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Home Page Contact Submissions
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Home size={20} className="text-primary" />
              <Badge variant="secondary">{filteredSubmissions.length}</Badge>
            </div>
            <Button onClick={exportCSV} className="bg-green-600 hover:bg-green-700">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Manage all contact form submissions from the home page</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-primary">{filteredSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New</p>
                  <p className="text-2xl font-bold text-primary">{newSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contacted</p>
                  <p className="text-2xl font-bold text-primary">{contactedSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <Archive className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-primary">{closedSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Input 
                placeholder="Search submissions..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-48"
              />
              
              <Input 
                type="month" 
                placeholder="Month"
                value={filters.month}
                onChange={(e) => setFilters({...filters, month: e.target.value})}
                className="w-40"
              />
              
              <Input 
                type="date" 
                placeholder="From Date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                className="w-40"
              />
              
              <Input 
                type="date" 
                placeholder="To Date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                className="w-40"
              />
              
              <Button variant="outline" onClick={clearFilters}>
                <X size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Grid */}
        {filteredSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{submission.name}</h3>
                        <p className="text-sm text-gray-600">{submission.email}</p>
                        {submission.phone && (
                          <p className="text-sm text-gray-600">{submission.phone}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          submission.status === 'new' ? 'bg-yellow-500' :
                          submission.status === 'contacted' ? 'bg-orange-500' : 'bg-green-500'
                        }>
                          {submission.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSubmission(submission.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare size={16} className="text-gray-500" />
                        <span className="text-sm truncate">{submission.message}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm">{new Date(submission.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {submission.status !== 'contacted' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubmissionStatus(submission.id, 'contacted')}
                          className="flex-1"
                        >
                          Mark Contacted
                        </Button>
                      )}
                      {submission.status !== 'closed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateSubmissionStatus(submission.id, 'closed')}
                          className="flex-1"
                        >
                          Mark Closed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Home size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions Found</h3>
              <p className="text-gray-600">No home page contact submissions match the current filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contact Submission Details</span>
                  <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                    <X size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-lg">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-lg">{selectedSubmission.email}</p>
                  </div>
                </div>
                
                {selectedSubmission.phone && (
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-lg">{selectedSubmission.phone}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    value={selectedSubmission.message} 
                    readOnly 
                    rows={6}
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={selectedSubmission.status} 
                      onValueChange={(value: 'new' | 'contacted' | 'closed') => {
                        updateSubmissionStatus(selectedSubmission.id, value);
                        setSelectedSubmission({...selectedSubmission, status: value});
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source</label>
                    <p className="text-lg capitalize">{selectedSubmission.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <p className="text-lg">{new Date(selectedSubmission.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HomePageContactPage;

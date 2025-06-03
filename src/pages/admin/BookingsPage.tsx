
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { bookingService, userService } from '@/services/supabase';
import type { Booking } from '@/services/supabase';
import { exportToCSV } from '@/utils/csvExport';
import { Calendar, Clock, User, Phone, Mail, Filter, X, Download, Eye, Edit, MessageSquare, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    closerId: 'all',
    callStatus: 'all',
    dealStatus: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [bookingsData, usersData] = await Promise.all([
        bookingService.getAll(),
        userService.getClosers()
      ]);
      setBookings(bookingsData);
      setUsers(usersData);
      console.log('Loaded bookings:', bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
    try {
      const updated = await bookingService.update(bookingId, updates);
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? updated : booking
      ));
      
      toast({
        title: "Booking Updated",
        description: "Booking has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    await updateBooking(editingBooking.id, editingBooking);
    setShowEdit(false);
    setEditingBooking(null);
  };

  const clearFilters = () => {
    setFilters({
      closerId: 'all',
      callStatus: 'all',
      dealStatus: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const exportCSV = () => {
    const csvData = filteredBookings.map(booking => ({
      'Name': `${booking.first_name} ${booking.last_name}`,
      'Email': booking.email,
      'Phone': booking.phone,
      'Date': booking.preferred_date,
      'Time': booking.preferred_time,
      'Closer': getCloserName(booking.closer_id),
      'Call Status': booking.call_status,
      'Deal Status': booking.deal_status,
      'Payment Link Sent': booking.payment_link_sent ? 'Yes' : 'No',
      'Contract Link Sent': booking.contract_link_sent ? 'Yes' : 'No',
      'Offer Made': booking.offer_made ? 'Yes' : 'No',
      'Created': new Date(booking.created_at || '').toLocaleDateString()
    }));

    exportToCSV(csvData, 'bookings');
    
    toast({
      title: "CSV Exported",
      description: "Bookings have been exported to CSV.",
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.closerId !== 'all' && booking.closer_id !== filters.closerId) return false;
    if (filters.callStatus !== 'all' && booking.call_status !== filters.callStatus) return false;
    if (filters.dealStatus !== 'all' && booking.deal_status !== filters.dealStatus) return false;
    if (filters.dateFrom && booking.preferred_date < filters.dateFrom) return false;
    if (filters.dateTo && booking.preferred_date > filters.dateTo) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return booking.first_name.toLowerCase().includes(searchLower) ||
             booking.last_name.toLowerCase().includes(searchLower) ||
             booking.email.toLowerCase().includes(searchLower) ||
             booking.phone.includes(filters.search);
    }
    return true;
  });

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer ? closer.name : 'Unknown';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-500" />;
      case 'completed': return <CheckCircle size={16} className="text-blue-500" />;
      case 'no-show': return <XCircle size={16} className="text-red-500" />;
      case 'reschedule': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'not-attended': return <XCircle size={16} className="text-gray-500" />;
      case 'closed': return <CheckCircle size={16} className="text-green-600" />;
      case 'follow-up': return <AlertCircle size={16} className="text-blue-500" />;
      case 'client-loss': return <XCircle size={16} className="text-red-500" />;
      case 'unqualified': return <XCircle size={16} className="text-orange-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'no-show': return 'bg-red-500';
      case 'reschedule': return 'bg-yellow-500';
      case 'not-attended': return 'bg-gray-500';
      case 'closed': return 'bg-green-600';
      case 'follow-up': return 'bg-blue-500';
      case 'client-loss': return 'bg-red-500';
      case 'unqualified': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const confirmedBookings = filteredBookings.filter(b => b.call_status === 'confirmed');
  const completedBookings = filteredBookings.filter(b => b.call_status === 'completed');
  const closedDeals = filteredBookings.filter(b => b.deal_status === 'closed');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

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
            Bookings Management
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary" />
              <Badge variant="secondary">{filteredBookings.length}</Badge>
            </div>
            <Button onClick={exportCSV} className="bg-green-600 hover:bg-green-700">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Manage all strategy call bookings and track deal progress</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary">{filteredBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-primary">{confirmedBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-primary">{completedBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Closed Deals</p>
                  <p className="text-2xl font-bold text-primary">{closedDeals.length}</p>
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
              
              <Select value={filters.closerId} onValueChange={(value) => setFilters({...filters, closerId: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Closers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Closers</SelectItem>
                  {users.map((closer) => (
                    <SelectItem key={closer.id} value={closer.id}>
                      {closer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.callStatus} onValueChange={(value) => setFilters({...filters, callStatus: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Call Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                  <SelectItem value="reschedule">Reschedule</SelectItem>
                  <SelectItem value="not-attended">Not Attended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.dealStatus} onValueChange={(value) => setFilters({...filters, dealStatus: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Deal Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deals</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="client-loss">Client Loss</SelectItem>
                  <SelectItem value="unqualified">Unqualified</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                </SelectContent>
              </Select>
              
              <Input 
                placeholder="Search bookings..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-48"
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

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.first_name} {booking.last_name}</h3>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog open={showDetails && selectedBooking?.id === booking.id} onOpenChange={setShowDetails}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye size={14} />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Dialog open={showEdit && editingBooking?.id === booking.id} onOpenChange={setShowEdit}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingBooking(booking)}
                            >
                              <Edit size={14} />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm">{booking.preferred_date}</span>
                        <Clock size={16} className="text-gray-500 ml-2" />
                        <span className="text-sm">{booking.preferred_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm">{getCloserName(booking.closer_id)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getStatusColor(booking.call_status)} text-white text-xs`}>
                        {getStatusIcon(booking.call_status)}
                        <span className="ml-1">{booking.call_status}</span>
                      </Badge>
                      <Badge className={`${getStatusColor(booking.deal_status)} text-white text-xs`}>
                        {getStatusIcon(booking.deal_status)}
                        <span className="ml-1">{booking.deal_status}</span>
                      </Badge>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Payment: {booking.payment_link_sent ? '✓' : '✗'}</span>
                      <span>Contract: {booking.contract_link_sent ? '✓' : '✗'}</span>
                      <span>Offer: {booking.offer_made ? '✓' : '✗'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-600">No bookings match the current filters. Try adjusting your filter criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* Detail Modal */}
        {selectedBooking && (
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User size={24} />
                <span>Booking Details - {selectedBooking.first_name} {selectedBooking.last_name}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Information</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-500" />
                      <span>{selectedBooking.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedBooking.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Appointment Details</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span>{selectedBooking.preferred_date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{selectedBooking.preferred_time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-500" />
                      <span>{getCloserName(selectedBooking.closer_id)}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.additional_info && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Additional Information</label>
                    <p className="mt-2 text-sm bg-gray-50 p-3 rounded-lg">{selectedBooking.additional_info}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-2 space-y-2">
                    <Badge className={`${getStatusColor(selectedBooking.call_status)} text-white`}>
                      {selectedBooking.call_status}
                    </Badge>
                    <Badge className={`${getStatusColor(selectedBooking.deal_status)} text-white ml-2`}>
                      {selectedBooking.deal_status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Progress Tracking</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Link Sent:</span>
                      <span className={selectedBooking.payment_link_sent ? 'text-green-600' : 'text-red-600'}>
                        {selectedBooking.payment_link_sent ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Contract Link Sent:</span>
                      <span className={selectedBooking.contract_link_sent ? 'text-green-600' : 'text-red-600'}>
                        {selectedBooking.contract_link_sent ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Offer Made:</span>
                      <span className={selectedBooking.offer_made ? 'text-green-600' : 'text-red-600'}>
                        {selectedBooking.offer_made ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedBooking.note && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Notes</label>
                    <p className="mt-2 text-sm bg-gray-50 p-3 rounded-lg">{selectedBooking.note}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">Created</label>
                  <p className="text-sm text-gray-500">{new Date(selectedBooking.created_at || '').toLocaleString()}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}

        {/* Edit Modal */}
        {editingBooking && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Call Status</label>
                  <Select 
                    value={editingBooking.call_status} 
                    onValueChange={(value: any) => setEditingBooking({...editingBooking, call_status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                      <SelectItem value="reschedule">Reschedule</SelectItem>
                      <SelectItem value="not-attended">Not Attended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Deal Status</label>
                  <Select 
                    value={editingBooking.deal_status} 
                    onValueChange={(value: any) => setEditingBooking({...editingBooking, deal_status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="client-loss">Client Loss</SelectItem>
                      <SelectItem value="unqualified">Unqualified</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={editingBooking.note || ''}
                  onChange={(e) => setEditingBooking({...editingBooking, note: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">Update Booking</Button>
                <Button type="button" variant="outline" onClick={() => setShowEdit(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;

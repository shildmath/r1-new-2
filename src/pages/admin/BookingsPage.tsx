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
import { ModernCard } from '@/components/admin/ModernCard';
import EnhancedTable from '@/components/admin/EnhancedTable';
import type { Booking } from '@/services/supabase';
import { exportToCSV } from '@/utils/csvExport';
import { Calendar, Clock, User, Phone, Mail, Filter, X, Download, Eye, Edit, TrendingUp, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
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
      console.log('Loaded bookings:', bookingsData.length);
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
  const conversionRate = filteredBookings.length > 0 ? (closedDeals.length / filteredBookings.length * 100).toFixed(1) : '0';

  const bookingColumns = [
    {
      key: 'first_name' as keyof Booking,
      header: 'Client',
      sortable: true,
      render: (value: string, row: Booking) => (
        <div>
          <div className="font-medium">{row.first_name} {row.last_name}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      key: 'preferred_date' as keyof Booking,
      header: 'Date & Time',
      sortable: true,
      render: (value: string, row: Booking) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-sm">{value}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-gray-500" />
            <span className="text-sm">{row.preferred_time}</span>
          </div>
        </div>
      )
    },
    {
      key: 'closer_id' as keyof Booking,
      header: 'Closer',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <User size={14} className="text-gray-500" />
          <span className="text-sm">{getCloserName(value)}</span>
        </div>
      )
    },
    {
      key: 'call_status' as keyof Booking,
      header: 'Call Status',
      render: (value: string) => (
        <Badge variant="secondary" className="flex items-center space-x-1">
          {getStatusIcon(value)}
          <span>{value}</span>
        </Badge>
      )
    },
    {
      key: 'deal_status' as keyof Booking,
      header: 'Deal Status',
      render: (value: string) => (
        <Badge variant="outline" className="flex items-center space-x-1">
          {getStatusIcon(value)}
          <span>{value}</span>
        </Badge>
      )
    },
    {
      key: 'id' as keyof Booking,
      header: 'Actions',
      render: (value: string, row: Booking) => (
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBooking(row)}
              >
                <Eye size={14} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <User size={24} />
                  <span>Booking Details - {row.first_name} {row.last_name}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-500" />
                        <span>{row.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <span>{row.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Appointment Details</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>{row.preferred_date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{row.preferred_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <span>{getCloserName(row.closer_id)}</span>
                      </div>
                    </div>
                  </div>

                  {row.additional_info && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Additional Information</label>
                      <p className="mt-2 text-sm bg-gray-50 p-3 rounded-lg">{row.additional_info}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="mt-2 space-y-2">
                      <Badge className={`${getStatusColor(row.call_status)} text-white`}>
                        {row.call_status}
                      </Badge>
                      <Badge className={`${getStatusColor(row.deal_status)} text-white ml-2`}>
                        {row.deal_status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Progress Tracking</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Payment Link Sent:</span>
                        <span className={row.payment_link_sent ? 'text-green-600' : 'text-red-600'}>
                          {row.payment_link_sent ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Contract Link Sent:</span>
                        <span className={row.contract_link_sent ? 'text-green-600' : 'text-red-600'}>
                          {row.contract_link_sent ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Offer Made:</span>
                        <span className={row.offer_made ? 'text-green-600' : 'text-red-600'}>
                          {row.offer_made ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {row.note && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Notes</label>
                      <p className="mt-2 text-sm bg-gray-50 p-3 rounded-lg">{row.note}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600">Created</label>
                    <p className="text-sm text-gray-500">{new Date(row.created_at || '').toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingBooking(row)}
              >
                <Edit size={14} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Booking</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Call Status</label>
                    <Select 
                      value={row.call_status} 
                      onValueChange={(value: any) => setEditingBooking({...row, call_status: value})}
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
                      value={row.deal_status} 
                      onValueChange={(value: any) => setEditingBooking({...row, deal_status: value})}
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
                    value={row.note || ''}
                    onChange={(e) => setEditingBooking({...row, note: e.target.value})}
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
          </Dialog>
        </div>
      )
    }
  ];

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
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings Management
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive booking system with deal tracking and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary" />
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {filteredBookings.length} bookings
              </Badge>
            </div>
            <Button onClick={exportCSV} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <ModernCard
            title="Total Bookings"
            value={filteredBookings.length}
            icon={Calendar}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
            delay={0}
          />
          <ModernCard
            title="Confirmed"
            value={confirmedBookings.length}
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-green-500 to-emerald-600"
            delay={0.1}
          />
          <ModernCard
            title="Completed"
            value={completedBookings.length}
            icon={Clock}
            gradient="bg-gradient-to-br from-purple-500 to-violet-600"
            delay={0.2}
          />
          <ModernCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-orange-500 to-red-600"
            delay={0.3}
          />
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span className="font-medium">Advanced Filters:</span>
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
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Bookings Table */}
        <EnhancedTable
          data={filteredBookings}
          columns={bookingColumns}
          searchable={false}
          exportable={true}
          onExport={exportCSV}
        />
      </motion.div>
    </div>
  );
};

export default BookingsPage;

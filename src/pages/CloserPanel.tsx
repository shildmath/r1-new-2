
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { bookingService, timeSlotService } from '@/services/supabase';
import type { Booking, TimeSlot } from '@/services/supabase';
import { exportToCSV } from '@/utils/csvExport';
import { Calendar, Clock, User, Phone, Mail, Filter, X, Download, Eye, Edit, LogOut, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CloserPanel = () => {
  const { user, logout } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingFilters, setBookingFilters] = useState({
    callStatus: 'all',
    dealStatus: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const [bookingsData, slotsData] = await Promise.all([
        bookingService.getByCloser(user.id),
        timeSlotService.getAll()
      ]);
      
      // Filter time slots for current user
      const userSlots = slotsData.filter(slot => slot.closer_id === user.id);
      
      setBookings(bookingsData);
      setTimeSlots(userSlots);
      console.log('Loaded closer data:', { bookings: bookingsData, slots: userSlots });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const clearBookingFilters = () => {
    setBookingFilters({
      callStatus: 'all',
      dealStatus: 'all',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All booking filters have been reset.",
    });
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

  const exportBookings = () => {
    const csvData = filteredBookings.map(booking => ({
      'Name': `${booking.first_name} ${booking.last_name}`,
      'Email': booking.email,
      'Phone': booking.phone,
      'Date': booking.preferred_date,
      'Time': booking.preferred_time,
      'Call Status': booking.call_status,
      'Deal Status': booking.deal_status,
      'Created': new Date(booking.created_at || '').toLocaleDateString()
    }));

    exportToCSV(csvData, 'my-bookings');
    
    toast({
      title: "CSV Exported",
      description: "Your bookings have been exported to CSV.",
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (bookingFilters.callStatus !== 'all' && booking.call_status !== bookingFilters.callStatus) return false;
    if (bookingFilters.dealStatus !== 'all' && booking.deal_status !== bookingFilters.dealStatus) return false;
    if (bookingFilters.dateFrom && booking.preferred_date < bookingFilters.dateFrom) return false;
    if (bookingFilters.dateTo && booking.preferred_date > bookingFilters.dateTo) return false;
    if (bookingFilters.search) {
      const searchLower = bookingFilters.search.toLowerCase();
      return booking.first_name.toLowerCase().includes(searchLower) ||
             booking.last_name.toLowerCase().includes(searchLower) ||
             booking.email.toLowerCase().includes(searchLower) ||
             booking.phone.includes(bookingFilters.search);
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'no-show': return 'bg-red-500';
      case 'reschedule': return 'bg-yellow-500';
      case 'closed': return 'bg-green-600';
      case 'follow-up': return 'bg-blue-500';
      case 'client-loss': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalBookings = filteredBookings.length;
  const confirmedBookings = filteredBookings.filter(b => b.call_status === 'confirmed').length;
  const completedBookings = filteredBookings.filter(b => b.call_status === 'completed').length;
  const closedDeals = filteredBookings.filter(b => b.deal_status === 'closed').length;
  const availableSlots = timeSlots.filter(slot => !slot.is_booked).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please log in to access the closer panel.</p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Closer Panel</h1>
                <p className="text-gray-600">Welcome back, {user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={exportBookings} className="bg-green-600 hover:bg-green-700">
                <Download size={16} className="mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-primary">{totalBookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-primary">{confirmedBookings}</p>
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
                    <p className="text-2xl font-bold text-primary">{completedBookings}</p>
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
                    <p className="text-2xl font-bold text-primary">{closedDeals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Slots</p>
                    <p className="text-2xl font-bold text-primary">{availableSlots}</p>
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
                
                <Select value={bookingFilters.callStatus} onValueChange={(value) => setBookingFilters({...bookingFilters, callStatus: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Call Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="reschedule">Reschedule</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={bookingFilters.dealStatus} onValueChange={(value) => setBookingFilters({...bookingFilters, dealStatus: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Deal Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Deals</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="client-loss">Client Loss</SelectItem>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  placeholder="Search bookings..."
                  value={bookingFilters.search}
                  onChange={(e) => setBookingFilters({...bookingFilters, search: e.target.value})}
                  className="w-48"
                />
                
                <Button variant="outline" onClick={clearBookingFilters}>
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
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getStatusColor(booking.call_status)} text-white text-xs`}>
                          {booking.call_status}
                        </Badge>
                        <Badge className={`${getStatusColor(booking.deal_status)} text-white text-xs`}>
                          {booking.deal_status}
                        </Badge>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Payment: {booking.payment_link_sent ? '✓' : '✗'}</span>
                        <span>Contract: {booking.contract_link_sent ? '✓' : '✗'}</span>
                        <span>Offer: {booking.offer_made ? '✓' : '✗'}</span>
                      </div>

                      <div className="flex space-x-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`payment-${booking.id}`}
                            checked={booking.payment_link_sent}
                            onCheckedChange={(checked) => updateBooking(booking.id, { payment_link_sent: checked as boolean })}
                          />
                          <label htmlFor={`payment-${booking.id}`} className="text-xs">Payment Link</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`contract-${booking.id}`}
                            checked={booking.contract_link_sent}
                            onCheckedChange={(checked) => updateBooking(booking.id, { contract_link_sent: checked as boolean })}
                          />
                          <label htmlFor={`contract-${booking.id}`} className="text-xs">Contract</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`offer-${booking.id}`}
                            checked={booking.offer_made}
                            onCheckedChange={(checked) => updateBooking(booking.id, { offer_made: checked as boolean })}
                          />
                          <label htmlFor={`offer-${booking.id}`} className="text-xs">Offer</label>
                        </div>
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
                <p className="text-gray-600">No bookings match the current filters or you don't have any bookings yet.</p>
              </CardContent>
            </Card>
          )}

          {/* Detail Modal */}
          {selectedBooking && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-lg">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-lg">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date & Time</label>
                    <p className="text-lg">{selectedBooking.preferred_date} at {selectedBooking.preferred_time}</p>
                  </div>
                </div>
                
                {selectedBooking.additional_info && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Additional Information</label>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg mt-2">{selectedBooking.additional_info}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Call Status</label>
                    <Badge className={`${getStatusColor(selectedBooking.call_status)} text-white mt-1`}>
                      {selectedBooking.call_status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Deal Status</label>
                    <Badge className={`${getStatusColor(selectedBooking.deal_status)} text-white mt-1`}>
                      {selectedBooking.deal_status}
                    </Badge>
                  </div>
                </div>

                {selectedBooking.note && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Notes</label>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg mt-2">{selectedBooking.note}</p>
                  </div>
                )}
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
    </div>
  );
};

export default CloserPanel;

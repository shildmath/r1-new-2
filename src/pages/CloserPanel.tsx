
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/utils/localStorage';
import { exportBookingsToCSV } from '@/utils/csvExport';
import { TimeSlot, Booking } from '@/types/admin';
import { Calendar, Clock, Plus, Trash2, User, LogOut, Eye, Filter, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CloserPanel = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    callStatus: 'all',
    dealStatus: 'all',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: ''
  });
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  });

  useEffect(() => {
    if (user) {
      const allTimeSlots = storage.getTimeSlots();
      const allBookings = storage.getBookings();
      
      const closerTimeSlots = allTimeSlots.filter(slot => slot.closerId === user.id);
      setTimeSlots(closerTimeSlots);
      
      const closerBookings = allBookings.filter(booking => booking.closerId === user.id);
      setBookings(closerBookings);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const clearFilters = () => {
    setFilters({
      callStatus: 'all',
      dealStatus: 'all',
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: ''
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const handleExportCSV = () => {
    exportBookingsToCSV(filteredBookings);
    toast({
      title: "CSV Exported",
      description: "Your bookings have been exported to CSV file.",
    });
  };

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      closerId: user.id,
      date: formData.date,
      time: formData.time,
      isBooked: false
    };

    const allTimeSlots = storage.getTimeSlots();
    const updatedTimeSlots = [...allTimeSlots, newTimeSlot];
    storage.setTimeSlots(updatedTimeSlots);
    
    setTimeSlots(prev => [...prev, newTimeSlot]);
    setFormData({ date: '', time: '' });
    setShowAddForm(false);
    
    toast({
      title: "Time Slot Added",
      description: "Your available time slot has been added successfully.",
    });
  };

  const handleDeleteTimeSlot = (slotId: string) => {
    const allTimeSlots = storage.getTimeSlots();
    const updatedTimeSlots = allTimeSlots.filter(slot => slot.id !== slotId);
    storage.setTimeSlots(updatedTimeSlots);
    
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
    
    toast({
      title: "Time Slot Deleted",
      description: "Time slot has been removed.",
    });
  };

  const handleStatusChange = (bookingId: string, field: string, value: string) => {
    const allBookings = storage.getBookings();
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    );
    
    storage.setBookings(updatedBookings);
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    ));
    
    toast({
      title: "Status Updated",
      description: "Booking status has been updated successfully.",
    });
  };

  const handleFieldUpdate = (bookingId: string, field: string, value: any) => {
    const allBookings = storage.getBookings();
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    );
    
    storage.setBookings(updatedBookings);
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    ));
    
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, [field]: value });
    }
    
    toast({
      title: "Field Updated",
      description: "Booking field has been updated successfully.",
    });
  };

  const handleDeleteBooking = (bookingId: string) => {
    const allBookings = storage.getBookings();
    const updatedBookings = allBookings.filter(booking => booking.id !== bookingId);
    storage.setBookings(updatedBookings);
    
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    
    // Also free up the time slot
    const allTimeSlots = storage.getTimeSlots();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const updatedTimeSlots = allTimeSlots.map(slot => {
        if (slot.closerId === booking.closerId && 
            slot.date === booking.preferredDate && 
            slot.time === booking.preferredTime) {
          return { ...slot, isBooked: false, clientId: undefined };
        }
        return slot;
      });
      storage.setTimeSlots(updatedTimeSlots);
      setTimeSlots(prev => prev.map(slot => {
        if (slot.closerId === booking.closerId && 
            slot.date === booking.preferredDate && 
            slot.time === booking.preferredTime) {
          return { ...slot, isBooked: false, clientId: undefined };
        }
        return slot;
      }));
    }
    
    toast({
      title: "Booking Deleted",
      description: "Booking has been deleted and time slot freed up.",
    });
  };

  const getCallStatusColor = (status: Booking['callStatus']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'no-show': return 'bg-red-500';
      case 'reschedule': return 'bg-yellow-500';
      case 'not-attended': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getDealStatusColor = (status: Booking['dealStatus']) => {
    switch (status) {
      case 'closed': return 'bg-green-600';
      case 'follow-up': return 'bg-blue-600';
      case 'client-loss': return 'bg-red-600';
      case 'unqualified': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.callStatus !== 'all' && booking.callStatus !== filters.callStatus) return false;
    if (filters.dealStatus !== 'all' && booking.dealStatus !== filters.dealStatus) return false;
    if (filters.dateFrom && booking.preferredDate < filters.dateFrom) return false;
    if (filters.dateTo && booking.preferredDate > filters.dateTo) return false;
    if (filters.timeFrom && booking.preferredTime < filters.timeFrom) return false;
    if (filters.timeTo && booking.preferredTime > filters.timeTo) return false;
    return true;
  });

  const availableSlots = timeSlots.filter(slot => !slot.isBooked);
  const bookedSlots = timeSlots.filter(slot => slot.isBooked);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header with Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ChevronLeft size={16} />
              Previous
            </Button>
            <h1 className="text-3xl font-bold text-primary">Closer Panel</h1>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleExportCSV} className="agency-btn flex items-center space-x-2">
              <Download size={16} />
              <span>Export CSV</span>
            </Button>
            <div className="flex items-center space-x-3">
              <User size={20} className="text-primary" />
              <span className="text-lg font-medium">{user?.name}</span>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-primary">{availableSlots.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booked Slots</p>
                  <p className="text-2xl font-bold text-primary">{bookedSlots.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Calls</p>
                  <p className="text-2xl font-bold text-primary">
                    {bookings.filter(b => b.callStatus === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Time Slot */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Manage Time Slots</CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="agency-btn"
              >
                <Plus size={16} />
                Add Time Slot
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <form onSubmit={handleAddTimeSlot} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Button type="submit" className="agency-btn">
                    Add Time Slot
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Available Time Slots */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Available Time Slots</h3>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-primary">{slot.date}</p>
                          <p className="text-sm text-gray-600">{slot.time}</p>
                          <Badge className="mt-2 bg-green-500">Available</Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTimeSlot(slot.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No available time slots</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Bookings</CardTitle>
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-primary" />
                <Select value={filters.callStatus} onValueChange={(value) => setFilters({...filters, callStatus: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Call Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
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
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="client-loss">Client Loss</SelectItem>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  type="date" 
                  placeholder="From Date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="date" 
                  placeholder="To Date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="time" 
                  placeholder="From Time"
                  value={filters.timeFrom}
                  onChange={(e) => setFilters({...filters, timeFrom: e.target.value})}
                  className="w-32"
                />
                
                <Input 
                  type="time" 
                  placeholder="To Time"
                  value={filters.timeTo}
                  onChange={(e) => setFilters({...filters, timeTo: e.target.value})}
                  className="w-32"
                />
                
                <Button variant="outline" onClick={clearFilters}>
                  <X size={16} className="mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-primary text-lg">
                          {booking.firstName} {booking.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                        <p className="text-sm font-medium mt-2">
                          {booking.preferredDate} at {booking.preferredTime}
                        </p>
                        {booking.additionalInfo && (
                          <p className="text-xs text-gray-500 mt-1">
                            Note: {booking.additionalInfo}
                          </p>
                        )}
                        {booking.country && (
                          <p className="text-xs text-gray-500">
                            Location: {booking.country}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex space-x-2">
                          <Badge className={getCallStatusColor(booking.callStatus || 'confirmed')}>
                            {(booking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getDealStatusColor(booking.dealStatus || 'follow-up')}>
                            {(booking.dealStatus || 'follow-up').replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Select 
                            value={booking.callStatus || 'confirmed'} 
                            onValueChange={(value: Booking['callStatus']) => handleStatusChange(booking.id, 'callStatus', value)}
                          >
                            <SelectTrigger className="w-32">
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
                          
                          <Select 
                            value={booking.dealStatus || 'follow-up'} 
                            onValueChange={(value: Booking['dealStatus']) => handleStatusChange(booking.id, 'dealStatus', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="follow-up">Follow Up</SelectItem>
                              <SelectItem value="client-loss">Client Loss</SelectItem>
                              <SelectItem value="unqualified">Unqualified</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Dialog open={showDetails && selectedBooking?.id === booking.id} onOpenChange={setShowDetails}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye size={14} />
                                See More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Booking Details - {booking.firstName} {booking.lastName}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Status Updates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Call Status</label>
                                    <Select 
                                      value={booking.callStatus || 'confirmed'} 
                                      onValueChange={(value: Booking['callStatus']) => handleStatusChange(booking.id, 'callStatus', value)}
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
                                    <label className="text-sm font-medium mb-2 block">Deal Status</label>
                                    <Select 
                                      value={booking.dealStatus || 'follow-up'} 
                                      onValueChange={(value: Booking['dealStatus']) => handleStatusChange(booking.id, 'dealStatus', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="closed">Closed</SelectItem>
                                        <SelectItem value="follow-up">Follow Up</SelectItem>
                                        <SelectItem value="client-loss">Client Loss</SelectItem>
                                        <SelectItem value="unqualified">Unqualified</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* Additional Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Closed Date</label>
                                    <Input 
                                      type="date"
                                      value={booking.closedDate || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'closedDate', e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Follow Up Date</label>
                                    <Input 
                                      type="date"
                                      value={booking.followUpDate || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'followUpDate', e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Ad Spend</label>
                                    <Input 
                                      placeholder="$0.00"
                                      value={booking.adSpend || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'adSpend', e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Country/Area</label>
                                    <Input 
                                      placeholder="Country/Area"
                                      value={booking.country || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'country', e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Zip Code</label>
                                    <Input 
                                      placeholder="Zip Code"
                                      value={booking.zipCode || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'zipCode', e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Recording Link</label>
                                    <Input 
                                      placeholder="Recording URL"
                                      value={booking.recordingLink || ''}
                                      onChange={(e) => handleFieldUpdate(booking.id, 'recordingLink', e.target.value)}
                                    />
                                  </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      checked={booking.paymentLinkSent}
                                      onCheckedChange={(checked) => handleFieldUpdate(booking.id, 'paymentLinkSent', checked)}
                                    />
                                    <label className="text-sm font-medium">Payment Link Sent</label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      checked={booking.contractLinkSent}
                                      onCheckedChange={(checked) => handleFieldUpdate(booking.id, 'contractLinkSent', checked)}
                                    />
                                    <label className="text-sm font-medium">Contract Link Sent</label>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      checked={booking.offerMade}
                                      onCheckedChange={(checked) => handleFieldUpdate(booking.id, 'offerMade', checked)}
                                    />
                                    <label className="text-sm font-medium">Offer Made</label>
                                  </div>
                                </div>

                                {/* Note */}
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Note - Reason</label>
                                  <Textarea 
                                    placeholder="Add notes or reasons..."
                                    value={booking.note || ''}
                                    onChange={(e) => handleFieldUpdate(booking.id, 'note', e.target.value)}
                                    rows={4}
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookings match the current filters</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CloserPanel;

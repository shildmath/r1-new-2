
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
import { Calendar, Clock, Plus, Trash2, User, LogOut, Eye, Filter, X, Download } from 'lucide-react';
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
  
  const [bookingFilters, setBookingFilters] = useState({
    callStatus: 'all',
    dealStatus: 'all',
    dateFilter: '',
    timeFilter: ''
  });

  const [slotFilters, setSlotFilters] = useState({
    month: '',
    date: ''
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

  const clearBookingFilters = () => {
    setBookingFilters({
      callStatus: 'all',
      dealStatus: 'all',
      dateFilter: '',
      timeFilter: ''
    });
    toast({
      title: "Booking Filters Cleared",
      description: "All booking filters have been reset.",
    });
  };

  const clearSlotFilters = () => {
    setSlotFilters({
      month: '',
      date: ''
    });
    toast({
      title: "Slot Filters Cleared",
      description: "All slot filters have been reset.",
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
      case 'not-started': return 'bg-purple-600';
      default: return 'bg-purple-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (bookingFilters.callStatus !== 'all' && booking.callStatus !== bookingFilters.callStatus) return false;
    if (bookingFilters.dealStatus !== 'all' && booking.dealStatus !== bookingFilters.dealStatus) return false;
    if (bookingFilters.dateFilter && booking.preferredDate !== bookingFilters.dateFilter) return false;
    if (bookingFilters.timeFilter && booking.preferredTime !== bookingFilters.timeFilter) return false;
    return true;
  });

  const filteredTimeSlots = timeSlots.filter(slot => {
    if (slotFilters.month && !slot.date.includes(slotFilters.month)) return false;
    if (slotFilters.date && slot.date !== slotFilters.date) return false;
    return true;
  });

  const availableSlots = filteredTimeSlots.filter(slot => !slot.isBooked);
  const bookedSlots = filteredTimeSlots.filter(slot => slot.isBooked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Closer Panel</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleExportCSV} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <Download size={16} className="mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Available Slots</p>
                  <p className="text-3xl font-bold">{availableSlots.length}</p>
                </div>
                <Clock size={32} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Booked Slots</p>
                  <p className="text-3xl font-bold">{bookedSlots.length}</p>
                </div>
                <Calendar size={32} className="text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                </div>
                <User size={32} className="text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completed</p>
                  <p className="text-3xl font-bold">
                    {bookings.filter(b => b.callStatus === 'completed').length}
                  </p>
                </div>
                <Calendar size={32} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Slots Management */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Manage Time Slots</CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Plus size={16} className="mr-2" />
                Add Time Slot
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Slot Filters */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter size={20} className="text-blue-600" />
                  <Input 
                    type="month"
                    placeholder="Filter by month"
                    value={slotFilters.month}
                    onChange={(e) => setSlotFilters({...slotFilters, month: e.target.value})}
                    className="w-40"
                  />
                  <Input 
                    type="date"
                    placeholder="Filter by date"
                    value={slotFilters.date}
                    onChange={(e) => setSlotFilters({...slotFilters, date: e.target.value})}
                    className="w-40"
                  />
                </div>
                <Button variant="outline" onClick={clearSlotFilters}>
                  <X size={16} className="mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddTimeSlot} className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-800 mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-800 mb-2 block">Time</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add Time Slot
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Available Time Slots</h3>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800">{slot.date}</p>
                          <p className="text-sm text-gray-600">{slot.time}</p>
                          <Badge className="mt-2 bg-green-500">Available</Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTimeSlot(slot.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No available time slots match your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
            <CardTitle className="text-xl">My Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Booking Filters */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter size={20} className="text-purple-600" />
                  <Select value={bookingFilters.callStatus} onValueChange={(value) => setBookingFilters({...bookingFilters, callStatus: value})}>
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
                  
                  <Select value={bookingFilters.dealStatus} onValueChange={(value) => setBookingFilters({...bookingFilters, dealStatus: value})}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Deal Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="follow-up">Follow Up</SelectItem>
                      <SelectItem value="client-loss">Client Loss</SelectItem>
                      <SelectItem value="unqualified">Unqualified</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input 
                    type="date" 
                    placeholder="Filter by date"
                    value={bookingFilters.dateFilter}
                    onChange={(e) => setBookingFilters({...bookingFilters, dateFilter: e.target.value})}
                    className="w-40"
                  />
                  
                  <Input 
                    type="time" 
                    placeholder="Filter by time"
                    value={bookingFilters.timeFilter}
                    onChange={(e) => setBookingFilters({...bookingFilters, timeFilter: e.target.value})}
                    className="w-32"
                  />
                </div>
                
                <Button variant="outline" onClick={clearBookingFilters}>
                  <X size={16} className="mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {booking.firstName} {booking.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                        <p className="text-sm font-medium mt-2 text-blue-700">
                          {booking.preferredDate} at {booking.preferredTime}
                        </p>
                        {booking.additionalInfo && (
                          <p className="text-xs text-gray-500 mt-1 bg-white p-2 rounded">
                            Note: {booking.additionalInfo}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex space-x-2">
                          <Badge className={getCallStatusColor(booking.callStatus || 'confirmed')}>
                            {(booking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getDealStatusColor(booking.dealStatus || 'not-started')}>
                            {(booking.dealStatus || 'not-started').replace('-', ' ').toUpperCase()}
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
                            value={booking.dealStatus || 'not-started'} 
                            onValueChange={(value: Booking['dealStatus']) => handleStatusChange(booking.id, 'dealStatus', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not-started">Not Started</SelectItem>
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
                                className="bg-blue-600 text-white hover:bg-blue-700"
                              >
                                <Eye size={14} className="mr-1" />
                                See More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-xl text-blue-800">
                                  Booking Details - {booking.firstName} {booking.lastName}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                                    <p className="font-medium text-lg">{booking.firstName} {booking.lastName}</p>
                                  </div>
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <label className="text-sm font-medium text-gray-600">Email</label>
                                    <p className="font-medium">{booking.email}</p>
                                  </div>
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <label className="text-sm font-medium text-gray-600">Phone</label>
                                    <p className="font-medium">{booking.phone}</p>
                                  </div>
                                  <div className="p-4 bg-gray-50 rounded-lg">
                                    <label className="text-sm font-medium text-gray-600">Scheduled</label>
                                    <p className="font-medium">{booking.preferredDate} at {booking.preferredTime}</p>
                                  </div>
                                </div>

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
                                      value={booking.dealStatus || 'not-started'} 
                                      onValueChange={(value: Booking['dealStatus']) => handleStatusChange(booking.id, 'dealStatus', value)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="not-started">Not Started</SelectItem>
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
                                    className="resize-none"
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
              <div className="text-center py-12">
                <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
                <p className="text-gray-600">No bookings match the current filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CloserPanel;

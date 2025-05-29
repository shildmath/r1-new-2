
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { storage } from '@/utils/localStorage';
import { Booking, User } from '@/types/admin';
import { Calendar, User as UserIcon, Phone, Mail, Trash2, Eye, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    callStatus: '',
    dealStatus: '',
    dateFrom: '',
    dateTo: ''
  });
  const { toast } = useToast();

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer?.name || 'Unknown Closer';
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

  const handleStatusChange = (bookingId: string, field: string, value: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    );
    
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    
    toast({
      title: "Status Updated",
      description: "Booking status has been updated successfully.",
    });
  };

  const handleFieldUpdate = (bookingId: string, field: string, value: any) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, [field]: value } : booking
    );
    
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    
    toast({
      title: "Field Updated",
      description: "Booking field has been updated successfully.",
    });
  };

  const handleDelete = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    
    // Also free up the time slot
    const timeSlots = storage.getTimeSlots();
    const updatedTimeSlots = timeSlots.map(slot => {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking && slot.closerId === booking.closerId && 
          slot.date === booking.preferredDate && 
          slot.time === booking.preferredTime) {
        return { ...slot, isBooked: false, clientId: undefined };
      }
      return slot;
    });
    storage.setTimeSlots(updatedTimeSlots);
    
    toast({
      title: "Booking Deleted",
      description: "Booking has been deleted and time slot freed up.",
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.callStatus && booking.callStatus !== filters.callStatus) return false;
    if (filters.dealStatus && booking.dealStatus !== filters.dealStatus) return false;
    if (filters.dateFrom && booking.preferredDate < filters.dateFrom) return false;
    if (filters.dateTo && booking.preferredDate > filters.dateTo) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Strategy Call Bookings</h1>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter size={20} />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Call Status</label>
                <Select value={filters.callStatus} onValueChange={(value) => setFilters({...filters, callStatus: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
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
                <Select value={filters.dealStatus} onValueChange={(value) => setFilters({...filters, dealStatus: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="All deals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All deals</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="client-loss">Client Loss</SelectItem>
                    <SelectItem value="unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date From</label>
                <Input 
                  type="date" 
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date To</label>
                <Input 
                  type="date" 
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                          <Calendar className="text-white" size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {booking.firstName} {booking.lastName}
                          </CardTitle>
                          <p className="text-sm text-gray-600 flex items-center space-x-2">
                            <Mail size={14} />
                            <span>{booking.email}</span>
                          </p>
                          <p className="text-sm text-gray-600 flex items-center space-x-2">
                            <Phone size={14} />
                            <span>{booking.phone}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getCallStatusColor(booking.callStatus)}>
                          {(booking.callStatus || 'confirmed').replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getDealStatusColor(booking.dealStatus)}>
                          {(booking.dealStatus || 'follow-up').replace('-', ' ').toUpperCase()}
                        </Badge>
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
                              {/* Basic Info */}
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
                          onClick={() => handleDelete(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>Appointment</span>
                        </h4>
                        <p className="text-sm text-gray-700">
                          <strong>Date:</strong> {booking.preferredDate}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Time:</strong> {booking.preferredTime}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center space-x-1">
                          <UserIcon size={14} />
                          <strong>Closer:</strong> {getCloserName(booking.closerId)}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Status Quick Actions</h4>
                        <div className="space-y-2">
                          <Select 
                            value={booking.callStatus || 'confirmed'} 
                            onValueChange={(value: Booking['callStatus']) => handleStatusChange(booking.id, 'callStatus', value)}
                          >
                            <SelectTrigger className="h-8">
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
                            <SelectTrigger className="h-8">
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

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Quick Info</h4>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(booking.createdAt).toLocaleString()}
                        </p>
                        {booking.country && (
                          <p className="text-xs text-gray-500">
                            Location: {booking.country}
                          </p>
                        )}
                        {booking.adSpend && (
                          <p className="text-xs text-gray-500">
                            Ad Spend: {booking.adSpend}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {booking.additionalInfo && (
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Additional Information:</h4>
                        <p className="text-gray-700">{booking.additionalInfo}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings</h3>
              <p className="text-gray-600">Strategy call bookings will appear here when clients book appointments.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;

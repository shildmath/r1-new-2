
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/utils/localStorage';
import { Booking, User } from '@/types/admin';
import { Calendar, User as UserIcon, Phone, Mail, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const { toast } = useToast();

  const getCloserName = (closerId: string) => {
    const closer = users.find(user => user.id === closerId);
    return closer?.name || 'Unknown Closer';
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'no-show': return 'bg-red-500';
      case 'reschedule': return 'bg-yellow-500';
      case 'not-attended': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    
    setBookings(updatedBookings);
    storage.setBookings(updatedBookings);
    
    toast({
      title: "Status Updated",
      description: "Booking status has been updated successfully.",
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Strategy Call Bookings</h1>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
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
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.createdAt).toLocaleString()}
                        </p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>Appointment Details</span>
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
                        <h4 className="font-medium mb-2">Status Management</h4>
                        <Select 
                          value={booking.status} 
                          onValueChange={(value: Booking['status']) => handleStatusChange(booking.id, value)}
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

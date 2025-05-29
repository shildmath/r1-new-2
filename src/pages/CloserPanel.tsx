
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/utils/localStorage';
import { TimeSlot, Booking } from '@/types/admin';
import { Calendar, Clock, Plus, Trash2, User } from 'lucide-react';

const CloserPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  });

  useEffect(() => {
    if (user) {
      const allTimeSlots = storage.getTimeSlots();
      const allBookings = storage.getBookings();
      
      // Filter time slots for current closer
      const closerTimeSlots = allTimeSlots.filter(slot => slot.closerId === user.id);
      setTimeSlots(closerTimeSlots);
      
      // Filter bookings for current closer
      const closerBookings = allBookings.filter(booking => booking.closerId === user.id);
      setBookings(closerBookings);
    }
  }, [user]);

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

  const availableSlots = timeSlots.filter(slot => !slot.isBooked);
  const bookedSlots = timeSlots.filter(slot => slot.isBooked);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Closer Panel</h1>
          <div className="flex items-center space-x-3">
            <User size={20} className="text-primary" />
            <span className="text-lg font-medium">{user?.name}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-primary">
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
                      </div>
                      <Badge variant={
                        booking.status === 'confirmed' ? 'default' :
                        booking.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookings yet</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CloserPanel;

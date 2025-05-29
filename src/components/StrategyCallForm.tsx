
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/localStorage';
import { TimeSlot, Booking, User } from '@/types/admin';
import { Calendar } from 'lucide-react';

const StrategyCallForm = () => {
  const { toast } = useToast();
  const [availableSlots, setAvailableSlots] = useState<(TimeSlot & { closerName: string })[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    additionalInfo: ''
  });

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const loadAvailableSlots = () => {
    const timeSlots = storage.getTimeSlots().filter(slot => !slot.isBooked);
    const users = storage.getUsers();
    
    const slotsWithClosers = timeSlots.map(slot => {
      const closer = users.find(user => user.id === slot.closerId);
      return {
        ...slot,
        closerName: closer?.name || 'Unknown Closer'
      };
    });

    const uniqueSlots = slotsWithClosers.reduce((acc: (TimeSlot & { closerName: string })[], slot) => {
      const exists = acc.find(s => s.date === slot.date && s.time === slot.time);
      if (!exists) {
        acc.push(slot);
      }
      return acc;
    }, []);

    setAvailableSlots(uniqueSlots.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateCompare;
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotChange = (value: string) => {
    const [date, time] = value.split('|');
    setFormData({
      ...formData,
      preferredDate: date,
      preferredTime: time
    });
  };

  const findAvailableCloser = (date: string, time: string): string | null => {
    const timeSlots = storage.getTimeSlots();
    const availableSlot = timeSlots.find(slot => 
      slot.date === date && 
      slot.time === time && 
      !slot.isBooked
    );
    return availableSlot?.closerId || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Error",
        description: "Please select a preferred date and time.",
        variant: "destructive"
      });
      return;
    }

    try {
      const assignedCloserId = findAvailableCloser(formData.preferredDate, formData.preferredTime);
      
      if (!assignedCloserId) {
        toast({
          title: "Error",
          description: "Selected time slot is no longer available. Please choose another time.",
          variant: "destructive"
        });
        return;
      }

      const newBooking: Booking = {
        id: Date.now().toString(),
        ...formData,
        closerId: assignedCloserId,
        timeSlotId: '',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Update the time slot to mark it as booked
      const timeSlots = storage.getTimeSlots();
      const updatedTimeSlots = timeSlots.map(slot => {
        if (slot.closerId === assignedCloserId && 
            slot.date === formData.preferredDate && 
            slot.time === formData.preferredTime && 
            !slot.isBooked) {
          newBooking.timeSlotId = slot.id;
          return { ...slot, isBooked: true, clientId: newBooking.id };
        }
        return slot;
      });

      // Save the booking and updated time slots
      const bookings = storage.getBookings();
      storage.setBookings([...bookings, newBooking]);
      storage.setTimeSlots(updatedTimeSlots);

      toast({
        title: "Strategy Call Booked!",
        description: "Thank you! Your strategy call has been confirmed. You'll receive a confirmation email shortly.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        additionalInfo: ''
      });

      // Refresh available slots
      loadAvailableSlots();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book strategy call. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="agency-card">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number with Country Code *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Time Slot Selection</h3>
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Select Available Time Slot *
                </label>
                <Select 
                  value={formData.preferredDate && formData.preferredTime ? `${formData.preferredDate}|${formData.preferredTime}` : ''} 
                  onValueChange={handleTimeSlotChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an available time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <SelectItem key={`${slot.date}|${slot.time}`} value={`${slot.date}|${slot.time}`}>
                          {new Date(slot.date).toLocaleDateString()} at {slot.time}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-slots" disabled>
                        No available time slots
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {availableSlots.length === 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    No time slots are currently available. Please check back later or contact us directly.
                  </p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Additional Information</h3>
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  name="additionalInfo"
                  placeholder="Anything else you'd like us to know before our call?"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <Button 
                type="submit" 
                className="agency-btn text-lg px-12 py-4"
                disabled={availableSlots.length === 0}
              >
                Book My Free Strategy Call <Calendar className="ml-2" size={20} />
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                No spam, no obligations. You'll receive a confirmation email shortly.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrategyCallForm;

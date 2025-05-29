
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/localStorage';
import { Booking, TimeSlot, User } from '@/types/admin';
import { Calendar, Clock, User as UserIcon, Phone, Mail } from 'lucide-react';

const StrategyCallForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    additionalInfo: ''
  });
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [closers, setClosers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useState(() => {
    // Load available time slots and closers
    const timeSlots = storage.getTimeSlots().filter(slot => !slot.isBooked);
    const users = storage.getUsers().filter(user => user.role === 'closer');
    setAvailableSlots(timeSlots);
    setClosers(users);
  });

  const getAvailableDates = () => {
    const dates = [...new Set(availableSlots.map(slot => slot.date))];
    return dates.sort();
  };

  const getAvailableTimesForDate = (selectedDate: string) => {
    return availableSlots
      .filter(slot => slot.date === selectedDate)
      .map(slot => slot.time)
      .sort();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find available time slot for the selected date and time
      const selectedSlot = availableSlots.find(
        slot => slot.date === formData.preferredDate && slot.time === formData.preferredTime
      );

      if (!selectedSlot) {
        toast({
          title: "Time Slot Unavailable",
          description: "The selected time slot is no longer available. Please choose another time.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create new booking
      const newBooking: Booking = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        additionalInfo: formData.additionalInfo,
        closerId: selectedSlot.closerId,
        timeSlotId: selectedSlot.id,
        callStatus: 'confirmed',
        dealStatus: 'follow-up',
        paymentLinkSent: false,
        contractLinkSent: false,
        offerMade: false,
        createdAt: new Date().toISOString()
      };

      // Save booking
      const existingBookings = storage.getBookings();
      storage.setBookings([...existingBookings, newBooking]);

      // Mark time slot as booked
      const allTimeSlots = storage.getTimeSlots();
      const updatedTimeSlots = allTimeSlots.map(slot => 
        slot.id === selectedSlot.id 
          ? { ...slot, isBooked: true, clientId: newBooking.id }
          : slot
      );
      storage.setTimeSlots(updatedTimeSlots);

      // Update available slots state
      setAvailableSlots(prev => prev.filter(slot => slot.id !== selectedSlot.id));

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

      toast({
        title: "Booking Confirmed!",
        description: "Your strategy call has been booked successfully. You will receive a confirmation email shortly.",
      });

    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset time when date changes
    if (field === 'preferredDate') {
      setFormData(prev => ({ ...prev, preferredTime: '' }));
    }
  };

  const availableDates = getAvailableDates();
  const availableTimes = formData.preferredDate ? getAvailableTimesForDate(formData.preferredDate) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Book Your Strategy Call
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business? Schedule a personalized strategy call with our experts.
            </p>
          </div>

          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
              <CardTitle className="text-2xl text-center">Schedule Your Free Strategy Call</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <UserIcon size={24} className="mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        First Name *
                      </label>
                      <Input
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block flex items-center">
                        <Mail size={16} className="mr-2" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block flex items-center">
                        <Phone size={16} className="mr-2" />
                        Phone Number with Country Code *
                      </label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slot Section */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <Calendar size={24} className="mr-2" />
                    Time Slot Selection
                  </h3>
                  
                  {availableDates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-primary mb-2 block">
                          Preferred Date *
                        </label>
                        <Select value={formData.preferredDate} onValueChange={(value) => handleChange('preferredDate', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a date" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDates.map((date) => (
                              <SelectItem key={date} value={date}>
                                {new Date(date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-primary mb-2 block flex items-center">
                          <Clock size={16} className="mr-2" />
                          Preferred Time *
                        </label>
                        <Select 
                          value={formData.preferredTime} 
                          onValueChange={(value) => handleChange('preferredTime', value)}
                          disabled={!formData.preferredDate}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={formData.preferredDate ? "Select a time" : "Select date first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                      <Calendar size={48} className="mx-auto text-yellow-500 mb-4" />
                      <h4 className="text-lg font-medium text-yellow-800 mb-2">No Available Slots</h4>
                      <p className="text-yellow-700">
                        All time slots are currently booked. Please check back later or contact us directly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Information Section */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    Additional Information
                  </h3>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Tell us about your business and goals (Optional)
                    </label>
                    <Textarea
                      placeholder="Share any specific topics you'd like to discuss, your current challenges, or questions you have..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleChange('additionalInfo', e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || availableDates.length === 0}
                    className="w-full h-14 text-lg font-semibold agency-btn"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Booking Your Call...</span>
                      </div>
                    ) : (
                      'Book My Strategy Call'
                    )}
                  </Button>
                </div>
              </form>

              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-2">
                  Need immediate assistance? Contact us directly:
                </p>
                <div className="flex justify-center space-x-6 text-sm">
                  <a href="mailto:info@aiadmaxify.com" className="text-primary hover:underline flex items-center">
                    <Mail size={16} className="mr-1" />
                    info@aiadmaxify.com
                  </a>
                  <a href="tel:+15551234567" className="text-primary hover:underline flex items-center">
                    <Phone size={16} className="mr-1" />
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StrategyCallForm;

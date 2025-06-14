
// This frontend-only version fakes available slots, disables Supabase logic, and works fully offline.
// Dummy slots will be rendered and can be "booked" (just shows a confirmation).

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';

const dummyClosers = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Alice Johnson' },
];

const dummySlots = [
  {
    id: 'slot-1',
    date: '2025-06-17',
    time: '10:00 AM',
    closer_id: '1',
  },
  {
    id: 'slot-2',
    date: '2025-06-18',
    time: '02:00 PM',
    closer_id: '2',
  },
  {
    id: 'slot-3',
    date: '2025-06-20',
    time: '04:30 PM',
    closer_id: '1',
  },
];

const StrategyCallForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    additionalInfo: '',
    closerId: '',
    timeSlotId: ''
  });

  const getCloserName = (closerId: string) => {
    const closer = dummyClosers.find(c => c.id === closerId);
    return closer ? closer.name : 'Unknown';
  };

  const handleSlotSelect = (slot: typeof dummySlots[number]) => {
    setSelectedSlot(slot);
    setFormData({
      ...formData,
      preferredDate: slot.date,
      preferredTime: slot.time,
      closerId: slot.closer_id,
      timeSlotId: slot.id
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot before booking your call.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Strategy Call Booked!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking your strategy call. We've confirmed your appointment for{' '}
              <strong>{formData.preferredDate}</strong> at <strong>{formData.preferredTime}</strong>{' '}
              with <strong>{getCloserName(formData.closerId)}</strong>.
            </p>
            <p className="text-sm text-gray-500">
              We'll send you a confirmation email with all the details shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Available Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar size={24} />
            <span>Select Your Preferred Time Slot</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dummySlots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dummySlots.map((slot) => (
                <Card 
                  key={slot.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSlot?.id === slot.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-500" />
                          <span className="font-medium text-sm">{getCloserName(slot.closer_id)}</span>
                        </div>
                        {selectedSlot?.id === slot.id && (
                          <CheckCircle size={16} className="text-primary" />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-gray-500" />
                          <span className="text-sm font-medium">{slot.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-sm font-medium">{slot.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Time Slots</h3>
              <p className="text-gray-600">
                Unfortunately, there are no available time slots at the moment. Please check back later or contact us directly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle>Book Your Strategy Call</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {selectedSlot && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Selected Time Slot:</h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Date:</strong> {selectedSlot.date}</p>
                  <p><strong>Time:</strong> {selectedSlot.time}</p>
                  <p><strong>Closer:</strong> {getCloserName(selectedSlot.closer_id)}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Tell us about your business goals, current challenges, or any specific topics you'd like to discuss during the strategy call..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              disabled={isSubmitting || !selectedSlot}
            >
              {isSubmitting ? 'Booking Your Call...' : 'Book Strategy Call'}
            </Button>

            <p className="text-sm text-gray-600 text-center">
              By booking this call, you agree to our terms of service and privacy policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyCallForm;

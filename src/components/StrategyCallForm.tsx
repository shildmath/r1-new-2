
import { useState } from 'react';
import { format } from "date-fns";
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";

const AVAILABLE_HOURS = [
  "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM",
];

const DUMMY_CLOSER = {
  id: "1",
  name: "John Smith",
};

export default function StrategyCallForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalInfo: '',
  });

  function handleContinue() {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  }

  function handleBack() {
    setStep(1);
  }

  function handleFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1200);
  }

  // Step 3: Confirmation
  if (step === 3) {
    return (
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="max-w-xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Call is Booked!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for scheduling your strategy call for{" "}
              <b>{selectedDate ? format(selectedDate, "PPP") : ""}</b> at <b>{selectedTime}</b> with <b>{DUMMY_CLOSER.name}</b>.
            </p>
            <p className="text-sm text-gray-500">
              We'll send you a confirmation email with all the details shortly.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Step 1: Select date & time
  if (step === 1) {
    return (
      <motion.div initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}} className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
        {/* Calendar Picker */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <Calendar size={20} /> Choose a date
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShadcnCalendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>

        {/* Time slots */}
        <Card className="w-full md:w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle>
              <span className="flex items-center gap-2">
                <Clock size={20} /> Pick a time
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-gray-500 text-sm">Select a date first to view available times.</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {AVAILABLE_HOURS.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-accent text-white" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
            <div className="mt-5">
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-primary to-accent mt-2"
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
              >
                Next: Enter Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Step 2: Info form
  return (
    <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <User size={20} /> Your Information
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-5">
            <h4 className="font-bold mb-2 text-blue-900">Selected:</h4>
            <div className="flex flex-wrap gap-6 text-blue-800 text-sm">
              <div><b>Date:</b> {selectedDate ? format(selectedDate, "PPP") : ""}</div>
              <div><b>Time:</b> {selectedTime}</div>
              <div><b>With:</b> {DUMMY_CLOSER.name}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                value={formData.additionalInfo}
                onChange={handleFieldChange}
                placeholder="Tell us about your business goals, current challenges, or any specific topics you'd like to discuss during the strategy call..."
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-primary to-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm and Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

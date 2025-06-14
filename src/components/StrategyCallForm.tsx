
import { useState } from 'react';
import BookingStep1DateTime from './BookingStep1DateTime';
import BookingStep2InfoForm from './BookingStep2InfoForm';
import BookingStep3Confirmation from './BookingStep3Confirmation';
import { useBookStrategyCall } from '@/hooks/useBookStrategyCall';
import { toast } from 'sonner';

const DUMMY_CLOSER = {
  id: "1",
  name: "John Smith",
};

// TEMP: Demo time slots (to be replaced by dynamic slots)
const DEMO_SLOT = {
  id: "demo-uuid-slot",
  date: "",
  time: ""
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

  // Get Supabase booking hook
  const { bookCall, isBooking, error: bookingError } = useBookStrategyCall();

  function handleContinue() {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  }
  function handleBack() {
    setStep(1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Find/create slot_id for the selected date & time
    // For now, use the demo slot - real implementation would query/create slot in Supabase
    const slot_id = DEMO_SLOT.id;

    // Compose booking data
    const bookingPayload = {
      slot_id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      additional_info: formData.additionalInfo,
    };

    const success = await bookCall(bookingPayload);

    setIsSubmitting(false);
    if (success) {
      toast.success("Booking successful! Confirmation email sent.");
      setStep(3);
    } else {
      toast.error(bookingError || "Booking failed. Please try again.");
    }
  }

  if (step === 3) {
    return (
      <BookingStep3Confirmation 
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        closerName={DUMMY_CLOSER.name}
      />
    );
  }

  if (step === 1) {
    return (
      <BookingStep1DateTime
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onContinue={handleContinue}
      />
    );
  }

  // step === 2
  return (
    <BookingStep2InfoForm
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      formData={formData}
      setFormData={setFormData}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting || isBooking}
      closerName={DUMMY_CLOSER.name}
    />
  );
}

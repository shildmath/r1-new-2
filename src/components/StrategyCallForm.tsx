import { useState, useEffect } from 'react';
import BookingStep1DateTime from './BookingStep1DateTime';
import BookingStep2InfoForm from './BookingStep2InfoForm';
import BookingStep3Confirmation from './BookingStep3Confirmation';
import { useBookStrategyCall } from '@/hooks/useBookStrategyCall';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

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

  // New: Available slots from Supabase
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  // Fetch available slots
  useEffect(() => {
    supabase
      .from("time_slots")
      .select("*")
      .eq("is_available", true)
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .then(({ data }) => setAvailableSlots(data || []));
  }, []);

  function handleContinue() {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  }
  function handleBack() {
    setStep(1);
  }

  // New: when booking succeeds, remove slot from local state
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Right slot for chosen time:
    const slot = availableSlots.find(
      (s) =>
        s.date &&
        selectedDate &&
        s.date === selectedDate.toISOString().split("T")[0] &&
        s.time === selectedTime
    );
    if (!slot) {
      toast.error("Selected slot not available.");
      setIsSubmitting(false);
      return;
    }

    const bookingPayload = {
      slot_id: slot.id,
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
      setAvailableSlots((prev) =>
        prev.filter((s) => s.id !== slot.id)
      );
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
    // Instead of static slot, pass availableSlots for selection
    return (
      <BookingStep1DateTime
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onContinue={handleContinue}
        availableSlots={availableSlots}
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

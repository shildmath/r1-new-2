
import { useState, useEffect } from 'react';
import BookingStep1DateTime from './BookingStep1DateTime';
import BookingStep2InfoForm from './BookingStep2InfoForm';
import BookingStep3Confirmation from './BookingStep3Confirmation';
import { useBookStrategyCall } from '@/hooks/useBookStrategyCall';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

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

  // Available slots from Supabase
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  // Map slotId => closer
  const [closers, setClosers] = useState<{ [closerId: string]: string }>({});

  // Fetch available slots (include time_zone)
  useEffect(() => {
    supabase
      .from("time_slots")
      .select("*")
      .eq("is_available", true)
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .then(async ({ data }) => {
        setAvailableSlots(data || []);
        // Get all closer ids
        const closerIds = Array.from(new Set((data || []).map(s => s.closer_id)));
        // Fetch closer profile names (with fallback)
        if (closerIds.length) {
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", closerIds);
          const closerMap: { [closerId: string]: string } = {};
          profiles?.forEach((prof: any) => {
            closerMap[prof.id] = prof.full_name || "Unknown Closer";
          });
          setClosers(closerMap);
        }
      });
  }, []);

  // Given selected slot, find closer id and name + time zone
  let selectedCloserName = "N/A";
  let selectedTimeZone = "";
  if (selectedDate && selectedTime && availableSlots.length) {
    const slot = availableSlots.find(
      (s) =>
        s.date &&
        selectedDate &&
        s.date === selectedDate.toISOString().split("T")[0] &&
        s.time === selectedTime
    );
    if (slot) {
      selectedTimeZone = slot.time_zone;
      if (slot.closer_id && closers[slot.closer_id]) {
        selectedCloserName = closers[slot.closer_id];
      }
    }
  }

  function handleContinue() {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  }
  function handleBack() {
    setStep(1);
  }

  const { bookCall, isBooking, error: bookingError } = useBookStrategyCall();

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
        closerName={selectedCloserName}
        timeZone={selectedTimeZone}
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
        availableSlots={availableSlots}
        showTimeZone // Pass to BookingStep1DateTime for display if needed
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
      closerName={selectedCloserName}
      timeZone={selectedTimeZone}
    />
  );
}

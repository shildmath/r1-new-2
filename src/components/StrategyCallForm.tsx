
import { useState, useEffect } from 'react';
import BookingStep1DateTime from './BookingStep1DateTime';
import BookingStep2InfoForm from './BookingStep2InfoForm';
import BookingStep3Confirmation from './BookingStep3Confirmation';
import { useBookStrategyCall } from '@/hooks/useBookStrategyCall';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSlots } from "@/hooks/useRealtimeSlots"; // NEW

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

  // Realtime slots from Supabase
  const { slots: availableSlots, isLoading } = useRealtimeSlots();

  // Map slotId => closer
  const [closers, setClosers] = useState<{ [closerId: string]: string }>({});

  // Fetch closer names for all current slots
  useEffect(() => {
    if (availableSlots.length === 0) {
      setClosers({});
      return;
    }
    const closerIds = Array.from(new Set((availableSlots || []).map(s => s.closer_id)));
    if (closerIds.length) {
      supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", closerIds)
        .then(({ data: profiles }) => {
          const closerMap: { [closerId: string]: string } = {};
          (profiles || []).forEach((prof: any) => {
            closerMap[prof.id] = prof.full_name || "Unknown Closer";
          });
          setClosers(closerMap);
        });
    }
  }, [availableSlots]);

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
      selectedTimeZone = slot.time_zone || "UTC";
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
      // No need to manually remove slot, real-time will update availableSlots
      setStep(3);
    } else {
      toast.error(bookingError || "Booking failed. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[320px] text-primary">
        <span className="animate-pulse text-lg font-semibold">Loading available slots…</span>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-2xl shadow-lg p-8 text-white max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">All Slots Fully Booked</h2>
          <p className="mb-6">
            Due to <span className="font-semibold">heavy bookings</span>, there are currently no available slots for strategy calls.<br />
            <span className="text-yellow-200">We apologize for the inconvenience!</span>
          </p>
          <p className="mb-3">
            Please{" "}
            <a
              href="/contact"
              className="underline text-blue-100 hover:text-yellow-200 font-semibold transition"
            >
              go to our Contact Page
            </a>{" "}
            and we&apos;ll reach out to you within <b>12 hours</b>.
          </p>
          <a
            href="/contact"
            className="inline-block mt-4 px-6 py-3 rounded-lg bg-white text-blue-700 font-bold shadow-md hover:bg-blue-100 transition"
          >
            Contact Us Now
          </a>
        </div>
      </div>
    );
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
        showTimeZone={true}
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

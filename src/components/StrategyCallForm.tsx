
import { useState } from 'react';
import BookingStep1DateTime from './BookingStep1DateTime';
import BookingStep2InfoForm from './BookingStep2InfoForm';
import BookingStep3Confirmation from './BookingStep3Confirmation';

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1200);
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
      isSubmitting={isSubmitting}
      closerName={DUMMY_CLOSER.name}
    />
  );
}

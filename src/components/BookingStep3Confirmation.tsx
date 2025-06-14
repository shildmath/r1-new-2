
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";

type BookingStep3ConfirmationProps = {
  selectedDate: Date | undefined;
  selectedTime: string;
  closerName: string;
};

export default function BookingStep3Confirmation({ selectedDate, selectedTime, closerName }: BookingStep3ConfirmationProps) {
  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="max-w-xl mx-auto">
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Call is Booked!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for scheduling your strategy call for{" "}
            <b>{selectedDate ? format(selectedDate, "PPP") : ""}</b> at <b>{selectedTime}</b> with <b>{closerName}</b>.
          </p>
          <p className="text-sm text-gray-500">
            We'll send you a confirmation email with all the details shortly.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

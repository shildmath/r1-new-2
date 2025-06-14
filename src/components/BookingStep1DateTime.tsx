
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

type BookingStep1DateTimeProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onContinue: () => void;
};

const AVAILABLE_HOURS = [
  "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM",
];

export default function BookingStep1DateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onContinue
}: BookingStep1DateTimeProps) {
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
              onClick={onContinue}
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


import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

type TimeSlot = {
  id: string;
  date: string; // ISO date string e.g., "2025-06-15"
  time: string; // e.g., "10:00 AM"
}

type BookingStep1DateTimeProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onContinue: () => void;
  availableSlots: TimeSlot[];
};

export default function BookingStep1DateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onContinue,
  availableSlots
}: BookingStep1DateTimeProps) {
  // Format selected date to YYYY-MM-DD for comparison
  const selectedDateStr = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : undefined;

  // Show only times for the selected date
  const timesForSelectedDate =
    selectedDateStr
      ? availableSlots
          .filter((slot) => slot.date === selectedDateStr)
          .map((slot) => slot.time)
      : [];

  // Make times unique for display in case there are duplicates (defensive)
  const shownTimes = Array.from(new Set(timesForSelectedDate));

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
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
            // Disable past dates and those that do not exist in any availableSlot
            disabled={(date) => {
              const dateStr = date.toISOString().split("T")[0];
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return (
                date < today ||
                !availableSlots.some((slot) => slot.date === dateStr)
              );
            }}
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
          ) : shownTimes.length === 0 ? (
            <div className="text-gray-500 text-sm">No available time slots for this day.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {shownTimes.map((time) => (
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

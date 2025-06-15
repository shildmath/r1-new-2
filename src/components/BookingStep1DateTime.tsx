
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

// Define mapping: IANA ID => Friendly Label
const TIME_ZONE_LABELS: Record<string, string> = {
  "Etc/GMT": "Greenwich Mean Time (GMT)",
  "Europe/London": "British Summer Time (BST)",
  "America/New_York": "Eastern Time (ET)",
  "America/Chicago": "Central Time (CT)",
  "America/Denver": "Mountain Time (MT)",
  "America/Los_Angeles": "Pacific Time (PT)",
  "UTC": "UTC",
};

type TimeSlot = {
  id: string;
  date: string;
  time: string;
  time_zone?: string;
}

type BookingStep1DateTimeProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onContinue: () => void;
  availableSlots: TimeSlot[];
  showTimeZone?: boolean;
  timeZoneForSelectedDate?: string;
};

export default function BookingStep1DateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onContinue,
  availableSlots,
  showTimeZone,
  timeZoneForSelectedDate,
}: BookingStep1DateTimeProps) {
  // Format selected date to YYYY-MM-DD for comparison
  const selectedDateStr = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : undefined;

  // Only times/slots for selected date
  const slotsForSelectedDate =
    selectedDateStr
      ? availableSlots.filter((slot) => slot.date === selectedDateStr)
      : [];

  // Map time => slot
  const timeSlotMap: Record<string, TimeSlot> = {};
  slotsForSelectedDate.forEach(slot => {
    timeSlotMap[slot.time] = slot;
  });

  // Use Set to display unique times
  const shownTimes = Array.from(new Set(slotsForSelectedDate.map(slot => slot.time)));

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
              {shownTimes.map((time) => {
                const slot = timeSlotMap[time];
                const friendlyTz = slot?.time_zone
                  ? (TIME_ZONE_LABELS[slot.time_zone] ?? slot.time_zone)
                  : "UTC";
                const isSelected = selectedTime === time;
                return (
                  <Button
                    key={time}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className={`
                      flex flex-col items-start justify-center px-4 py-2 h-16 rounded-md border
                      ${isSelected ? "bg-accent text-white border-accent" : "bg-white border-muted"}
                      shadow-sm transition-colors
                    `}
                    onClick={() => setSelectedTime(time)}
                  >
                    <span className={`text-base font-bold leading-5 ${isSelected ? "" : "text-primary"}`}>{time}</span>
                    <span className={`text-xs ${isSelected ? "text-white/80" : "text-muted-foreground"} mt-1`}>
                      {friendlyTz}
                    </span>
                  </Button>
                );
              })}
            </div>
          )}
          {/* Selected time zone display */}
          {showTimeZone && selectedTime && timeSlotMap[selectedTime]?.time_zone ? (
            <div className="mt-2 text-xs text-blue-600">
              <b>Selected time zone:</b> {TIME_ZONE_LABELS[timeSlotMap[selectedTime].time_zone] ?? timeSlotMap[selectedTime].time_zone}
            </div>
          ) : null}
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

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

// Define mapping: IANA ID => Friendly Label for /strategy-call UI and slot manager
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
  date: string; // ISO date string e.g., "2025-06-15"
  time: string; // e.g., "10:00 AM"
  time_zone?: string; // add optional time_zone field
}

type BookingStep1DateTimeProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onContinue: () => void;
  availableSlots: TimeSlot[];
  showTimeZone?: boolean;
  timeZoneForSelectedDate?: string; // picked up for currently selected slot
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

  // Map of time => time zone (prefer friendly label)
  const timeZoneMap = Object.fromEntries(
    slotsForSelectedDate.map((slot) => [
      slot.time,
      TIME_ZONE_LABELS[slot.time_zone ?? "UTC"] || slot.time_zone || "UTC"
    ])
  );

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
                  {/* Show friendly label if enabled */}
                  {showTimeZone && timeZoneMap[time] ? (
                    <span className="block text-xs text-muted-foreground ml-2">
                      {timeZoneMap[time]}
                    </span>
                  ) : null}
                </Button>
              ))}
            </div>
          )}
          {/* Selected time zone display */}
          {showTimeZone && selectedTime && timeZoneMap[selectedTime] ? (
            <div className="mt-2 text-xs text-blue-600">
              <b>Selected time zone:</b> {timeZoneMap[selectedTime]}
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

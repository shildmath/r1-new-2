import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Whitelisted time zones and their labels (reuse from slot manager)
const SIMPLE_TIME_ZONES = [
  { label: "Greenwich Mean Time (GMT)", value: "Etc/GMT" },
  { label: "British Summer Time (BST)", value: "Europe/London" },
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "SEPARATOR", value: "SEPARATOR" },
  { label: "UTC", value: "UTC" },
];

interface EditSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: any; // should match time slot object shape
  onSave: (updates: {date: string, time: string, time_zone: string}) => Promise<void>;
}

const TIME_ZONE_LABELS: Record<string, string> = {
  "Etc/GMT": "Greenwich Mean Time (GMT)",
  "Europe/London": "British Summer Time (BST)",
  "America/New_York": "Eastern Time (ET)",
  "America/Chicago": "Central Time (CT)",
  "America/Denver": "Mountain Time (MT)",
  "America/Los_Angeles": "Pacific Time (PT)",
  "UTC": "UTC",
};

export default function EditSlotDialog({ open, onOpenChange, slot, onSave }: EditSlotDialogProps) {
  const [form, setForm] = useState({
    date: slot?.date ?? "",
    time: slot?.time ?? "",
    time_zone: slot?.time_zone ?? "Etc/GMT"
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (slot) {
      setForm({
        date: slot.date,
        time: slot.time,
        time_zone: slot.time_zone ?? "Etc/GMT",
      });
    }
  }, [slot, open]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Prevent bad data (SEPARATOR as time zone)
    if (!form.date || !form.time || !form.time_zone || form.time_zone==="SEPARATOR") {
      toast.error("Please provide all required details.");
      return;
    }
    setLoading(true);
    try {
      await onSave({
        date: form.date,
        time: form.time,
        time_zone: form.time_zone,
      });
      setLoading(false); // ensure loading is reset before closing
      toast.success("Slot updated!");
      onOpenChange(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error updating slot.");
      // Log error for dev trouble-shooting
      console.error(error);
    }
  }

  function renderTimeZoneOptions() {
    return (
      <>
        {SIMPLE_TIME_ZONES.map((tz) =>
          tz.value === "SEPARATOR" ? (
            <option key="sep" disabled>
              ──────────
            </option>
          ) : (
            <option value={tz.value} key={tz.value}>
              {tz.label}
            </option>
          )
        )}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Time Slot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs mb-1 font-medium">Date</label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs mb-1 font-medium">Time</label>
              <Input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Time Zone</label>
            <select
              name="time_zone"
              value={form.time_zone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              {renderTimeZoneOptions()}
            </select>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

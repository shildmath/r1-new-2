
import React, { useState } from "react";
import { useCloserSlots } from "@/hooks/useCloserSlots";
import { CalendarDays, Filter, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CloserSlotManager() {
  const {
    slots,
    addSlot,
    updateSlot,
    removeSlot,
    isLoading,
    filter,
    setFilter,
    clearFilter,
  } = useCloserSlots();
  const [form, setForm] = useState({ date: "", time: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleAddSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!form.date || !form.time) {
      toast.error("Please provide both date and time.");
      return;
    }
    const ok = await addSlot(form.date, form.time);
    if (ok) setForm({ date: "", time: "" });
  }

  // Mobile slot card UI
  if (!isLoading && slots.length > 0 && window.innerWidth < 640) {
    return (
      <div className="grid gap-3 sm:hidden">
        {slots.map(slot => (
          <div key={slot.id} className="bg-white rounded-xl border border-accent shadow p-4 flex flex-col animate-fade-in">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <CalendarDays size={18} />
                {slot.date}
              </div>
              <span className={`text-xs rounded px-2 py-1 ${slot.is_available ? "bg-green-200 text-green-900" : "bg-gray-200 text-gray-500"}`}>
                {slot.is_available ? "Available" : "Booked"}
              </span>
            </div>
            <div className="mb-2 text-sm font-medium">
              <strong>Time:</strong> {slot.time}
            </div>
            <div className="flex flex-row gap-1 mt-1">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeSlot(slot.id)}
                className="w-1/2"
              >
                Remove
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateSlot(slot.id, !slot.is_available)}
                className="w-1/2"
              >
                {slot.is_available ? "Mark Booked" : "Mark Available"}
              </Button>
            </div>
          </div>
        ))}
        {/* Add Slot Action */}
        <form className="bg-accent/10 rounded-lg shadow px-4 py-3 mt-2 flex flex-col md:flex-row gap-2" onSubmit={handleAddSlot}>
          <label className="text-sm text-accent font-semibold mb-1">Add Slot</label>
          <div className="flex flex-row gap-2">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded p-2 w-32"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="border rounded p-2 w-24"
              required
            />
            <Button type="submit" className="bg-primary text-white">
              Add
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Desktop/tablet table UI
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 mb-4 justify-between">
        <form className="flex flex-row gap-2" onSubmit={handleAddSlot}>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <Button type="submit" className="bg-primary text-white">
            Add Slot
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <input
            type="date"
            value={filter.date ?? ""}
            onChange={(e) =>
              setFilter((f: any) => ({ ...f, date: e.target.value || undefined }))
            }
            className="border rounded px-2 py-1"
          />
          <Button size="sm" variant="outline" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>
      <div className="rounded-xl shadow overflow-x-auto bg-white border border-accent/10">
        {isLoading ? (
          <div className="p-8 text-center text-accent animate-pulse">Loading slots...</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    No slots found.
                  </td>
                </tr>
              ) : (
                slots.map((slot) => (
                  <tr key={slot.id} className="border-t transition-colors hover:bg-accent/10">
                    <td className="p-2 font-medium">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={16} className="inline mb-1 mr-1" />
                        {slot.date}
                      </span>
                    </td>
                    <td className="p-2">{slot.time}</td>
                    <td className="p-2">
                      {slot.is_available ? (
                        <span className="text-green-700 font-medium bg-green-100 rounded px-2 py-1">Available</span>
                      ) : (
                        <span className="text-gray-400 bg-gray-100 rounded px-2 py-1">Booked</span>
                      )}
                    </td>
                    <td className="p-2 flex flex-row gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeSlot(slot.id)}
                        className="mr-2"
                      >
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateSlot(slot.id, !slot.is_available)}
                      >
                        {slot.is_available ? "Mark Booked" : "Mark Available"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

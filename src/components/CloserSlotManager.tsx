
import React, { useState } from "react";
import { useCloserSlots } from "@/hooks/useCloserSlots";
import { CalendarDays, X, List, Filter } from "lucide-react";
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

  return (
    <div>
      <form className="flex gap-3 mb-6" onSubmit={handleAddSlot}>
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
      <div className="flex items-center gap-2 mb-3">
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
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full table-auto border rounded">
            <thead>
              <tr className="bg-accent">
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No slots found.
                  </td>
                </tr>
              ) : (
                slots.map((slot) => (
                  <tr key={slot.id} className="border-t">
                    <td>
                      <span>
                        <CalendarDays size={16} className="inline mb-1 mr-1" />
                        {slot.date}
                      </span>
                    </td>
                    <td>{slot.time}</td>
                    <td>
                      {slot.is_available ? (
                        <span className="text-green-600 font-medium">Available</span>
                      ) : (
                        <span className="text-gray-400">Booked</span>
                      )}
                    </td>
                    <td>
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

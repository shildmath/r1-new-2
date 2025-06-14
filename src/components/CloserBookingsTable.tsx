
import React, { useState } from "react";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { toast } from "sonner";

export default function CloserBookingsTable() {
  const {
    bookings,
    updateBooking,
    isLoading,
    filter,
    setFilter,
    clearFilter,
  } = useCloserBookings();

  const [editingNote, setEditingNote] = useState<{ [id: string]: string }>({});

  function handleNoteChange(id: string, value: string) {
    setEditingNote((m) => ({ ...m, [id]: value }));
  }

  async function handleSaveNote(id: string) {
    const note = editingNote[id];
    if (note === undefined) return;
    const ok = await updateBooking(id, note);
    if (ok) toast.success("Note updated!");
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Filter size={18} />
        <input
          type="date"
          value={filter.date ?? ""}
          onChange={(e) =>
            setFilter((f) => ({ ...f, date: e.target.value || undefined }))
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
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <table className="w-full table-auto border rounded">
            <thead>
              <tr className="bg-accent">
                <th>Date</th>
                <th>Time</th>
                <th>Client</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td>{b.slot_date}</td>
                  <td>{b.slot_time}</td>
                  <td>
                    {b.first_name} {b.last_name}
                  </td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>
                    <input
                      className="border rounded px-2 py-1 w-32"
                      value={editingNote[b.id] ?? b.note ?? ""}
                      onChange={(e) => handleNoteChange(b.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveNote(b.id)}
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

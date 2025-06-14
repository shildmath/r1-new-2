import React, { useState, useEffect } from "react";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { toast } from "sonner";
import CloserBookingDetailsModal from "./CloserBookingDetailsModal";

export default function CloserBookingsTable() {
  const {
    bookings,
    isLoading,
    filter,
    setFilter,
    clearFilter
  } = useCloserBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  useEffect(() => {
    console.log("Bookings loaded for table:", bookings);
    console.log("isLoading:", isLoading);
    console.log("Current filter:", filter);
  }, [bookings, isLoading, filter]);

  let infoMessage = '';
  if (!isLoading && bookings.length === 0) {
    infoMessage = "No bookings found for your slots. " + "Make sure that you (the closer) have time slots with bookings " + "and that your user is authenticated correctly. " + "If this issue persists, check slot and booking data in Supabase.";
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Filter size={18} />
        <input
          type="date"
          value={filter.date ?? ""}
          onChange={e =>
            setFilter(f => ({
              ...f,
              date: e.target.value || undefined
            }))
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
          <div className="text-red-500">{infoMessage}</div>
        ) : (
          <table className="w-full table-auto border rounded">
            <thead>
              <tr className="bg-accent">
                <th>Date</th>
                <th>Time</th>
                <th>Client</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Extra Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td>{b.slot_date}</td>
                  <td>{b.slot_time}</td>
                  <td>
                    {b.first_name} {b.last_name}
                  </td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(b)}
                    >
                      Extra Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CloserBookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}

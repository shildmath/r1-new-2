
import React, { useState } from "react";
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
    clearFilter,
  } = useCloserBookings();

  const [selectedBooking, setSelectedBooking] = useState<any>(null);

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
                <th>See More</th>
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(b)}
                    >
                      See More
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

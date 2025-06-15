import React, { useState, useEffect } from "react";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { Button } from "@/components/ui/button";
import { Filter, LayoutList } from "lucide-react";
import { toast } from "sonner";

// Show all closer fields
const CLOSER_LABELS = {
  full_name: "Full Name",
  email: "Email",
};

export default function AllBookingsTable() {
  const { bookings, isLoading } = useAdminBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Info for mobile card view only
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  // Defensive fallback message
  let infoMessage = '';
  if (!isLoading && bookings.length === 0) {
    infoMessage = "No bookings found. If this persists, check booking and slot data in Supabase.";
  }

  // Mobile card view
  if (isMobile && bookings.length > 0) {
    return (
      <div className="grid gap-3 sm:hidden">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow p-4 border border-accent flex flex-col animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-accent flex items-center gap-2">
                <LayoutList size={18} />
                {b.first_name} {b.last_name}
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-accent/20 rounded text-accent">{b.slot_date} {b.slot_time ? `| ${b.slot_time}` : ""}</span>
            </div>
            <div className="mb-2">
              <div className="text-sm"><span className="font-semibold">Email:</span> {b.email}</div>
              <div className="text-sm"><span className="font-semibold">Phone:</span> {b.phone}</div>
              <div className="text-sm"><span className="font-semibold">Closer Name:</span> {b.closer_name || <span className="text-red-500">No closer info</span>}</div>
              <div className="text-sm"><span className="font-semibold">Closer Email:</span> {b.closer_email || <span className="text-red-500">No closer info</span>}</div>
            </div>
            <Button
              size="sm"
              className="self-end mt-2"
              variant="outline"
              onClick={() => setSelectedBooking(b)}
            >
              Extra Details
            </Button>
          </div>
        ))}
        {/* Modal/sheet for extra details if needed */}
      </div>
    );
  }

  // Desktop/tablet table view
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 mb-4 justify-between">
        <span className="text-muted-foreground text-sm hidden sm:inline">
          Total Bookings: <span className="font-semibold text-accent">{bookings.length}</span>
        </span>
      </div>
      <div className="rounded-xl shadow overflow-x-auto bg-white border border-accent/10">
        {isLoading ? (
          <div className="p-8 text-center text-accent animate-pulse">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-red-500 p-6 text-center">{infoMessage}</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Closer Name</th>
                <th className="p-3 text-left">Closer Email</th>
                <th className="p-3 text-left">Call Status</th>
                <th className="p-3 text-left">Deal Status</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Extra Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t transition-colors hover:bg-accent/10">
                  <td className="p-2 font-medium">{b.slot_date}</td>
                  <td className="p-2">{b.slot_time}</td>
                  <td className="p-2">{b.first_name} {b.last_name}</td>
                  <td className="p-2">{b.email}</td>
                  <td className="p-2">{b.phone}</td>
                  <td className="p-2">{b.closer_name ?? <span className="text-red-500">No closer info</span>}</td>
                  <td className="p-2">{b.closer_email ?? <span className="text-red-500">No closer info</span>}</td>
                  <td className="p-2">{b.call_status}</td>
                  <td className="p-2">{b.deal_status}</td>
                  <td className="p-2">{b.created_at}</td>
                  <td className="p-2">
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
      {/* Modal/sheet for extra details if needed */}
    </div>
  );
}

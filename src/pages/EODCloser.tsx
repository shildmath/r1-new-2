
import React, { useMemo } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { PhoneCall, Handshake, CalendarClock, UserCheck2 } from "lucide-react";

function todayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

export default function EODCloser() {
  const { bookings, isLoading } = useCloserBookings();

  const today = todayISO();
  const todayBookings = bookings.filter(
    b => b.slot_date === today
  );

  const stats = useMemo(() => ({
    total: todayBookings.length,
    completed: todayBookings.filter(b => b.call_status === "Completed").length,
    closed: todayBookings.filter(b => (b.deal_status ?? "").toLowerCase() === "closed").length,
    rescheduled: todayBookings.filter(b => b.reschedule_date || b.follow_up_call_date).length,
    noShow: todayBookings.filter(b => b.call_status === "No Show Up").length,
  }), [todayBookings]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">End Of The Day Report</h1>
        <Card className="w-full mb-10 shadow-xl border-2 border-accent/10 bg-white/95">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-4">
            <div className="flex flex-col items-center">
              <PhoneCall className="text-primary mb-1" size={24} />
              <span className="font-bold text-xl">{isLoading ? "…" : stats.total}</span>
              <span className="text-sm text-gray-500">Total For Today</span>
            </div>
            <div className="flex flex-col items-center">
              <UserCheck2 className="text-green-600 mb-1" size={24} />
              <span className="font-bold text-xl">{isLoading ? "…" : stats.completed}</span>
              <span className="text-sm text-gray-500">Completed Calls</span>
            </div>
            <div className="flex flex-col items-center">
              <Handshake className="text-blue-700 mb-1" size={24} />
              <span className="font-bold text-xl">{isLoading ? "…" : stats.closed}</span>
              <span className="text-sm text-gray-500">Closed Deals</span>
            </div>
            <div className="flex flex-col items-center">
              <CalendarClock className="text-orange-500 mb-1" size={24} />
              <span className="font-bold text-xl">{isLoading ? "…" : stats.rescheduled}</span>
              <span className="text-sm text-gray-500">Reschedules</span>
            </div>
            <div className="flex flex-col items-center">
              <PhoneCall className="text-destructive mb-1" size={24} />
              <span className="font-bold text-xl">{isLoading ? "…" : stats.noShow}</span>
              <span className="text-sm text-gray-500">No Shows</span>
            </div>
          </div>
          <table className="w-full table-auto border rounded-xl overflow-hidden bg-white/90">
            <thead className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
              <tr>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Deal Status</th>
                <th className="p-3 text-left">Call Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-accent animate-pulse">Loading…</td>
                </tr>
              ) : todayBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-red-500 p-6 text-center">No bookings for today.</td>
                </tr>
              ) : (
                todayBookings.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="p-2">{b.slot_time}</td>
                    <td className="p-2">{b.first_name} {b.last_name}</td>
                    <td className="p-2">{b.email}</td>
                    <td className="p-2">{b.phone}</td>
                    <td className="p-2">{b.deal_status ?? "-"}</td>
                    <td className="p-2">{b.call_status ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

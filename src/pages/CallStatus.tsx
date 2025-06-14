import React, { useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Filter, PhoneCall } from "lucide-react";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookingExtraDetailsButton from "@/components/BookingExtraDetailsButton";

export default function CallStatus() {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const { bookings, isLoading } = useCloserBookings();

  const dealsWithStatus = bookings.filter(b =>
    (status === "" || (b.call_status || "").toLowerCase().includes(status.toLowerCase())) &&
    (date === "" || (b.slot_date?.toString() ?? "").includes(date)) &&
    (search === "" || [b.first_name, b.last_name, b.email, b.phone].join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-6 gap-3">
        <Card className="w-full max-w-6xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <PhoneCall size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">All Call Status</CardTitle>
              <div className="text-muted-foreground text-base">View and filter call statuses of all bookings</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <Filter className="text-accent" size={18} />
              <Input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="w-40" />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-40" />
              <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1 w-40 bg-white">
                <option value="">All Call Status</option>
                <option value="Not Started Yet">Not Started Yet</option>
                <option value="Completed">Completed</option>
                <option value="No Show Up">No Show Up</option>
                <option value="Reschedule">Reschedule</option>
                <option value="Not Attained">Not Attained</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => {setStatus(""); setDate(""); setSearch("");}}>
                Clear Filters
              </Button>
            </div>
            <div className="overflow-x-auto rounded-xl shadow border border-accent/10 bg-white">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Client</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Closer Mail</th>
                    <th className="p-3 text-left">Call Status</th>
                    <th className="p-3 text-left">Extra Details</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-accent animate-pulse">Loading bookings…</td>
                    </tr>
                  ) : dealsWithStatus.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-red-500 p-6 text-center">No bookings found with these filters.</td>
                    </tr>
                  ) : (
                    dealsWithStatus.map(b => (
                      <tr key={b.id} className="border-t transition-colors hover:bg-accent/10">
                        <td className="p-2 font-medium">{b.slot_date}</td>
                        <td className="p-2">{b.slot_time}</td>
                        <td className="p-2">{b.first_name} {b.last_name}</td>
                        <td className="p-2">{b.email}</td>
                        <td className="p-2">{b.phone}</td>
                        <td className="p-2">{b.closer_email ?? "-"}</td>
                        <td className="p-2">{b.call_status ?? "Not Started Yet"}</td>
                        <td className="p-2">
                          <BookingExtraDetailsButton booking={b} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

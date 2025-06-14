
import React, { useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Filter, CheckCircle, XCircle, UserCheck2 } from "lucide-react";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CloserBookingDetailsModal from "@/components/CloserBookingDetailsModal";

export default function ClosedClients() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const { bookings, isLoading } = useCloserBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Filter to only bookings with deal_status === "Closed"
  const closedClients = bookings.filter(
    (b) =>
      (b.deal_status ?? "").toLowerCase() === "closed" &&
      (date === "" || (b.slot_date?.toString() ?? "").includes(date)) &&
      (search === "" || [b.first_name, b.last_name, b.email, b.phone].join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-6 gap-3">
        <Card className="w-full max-w-6xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <UserCheck2 size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Closed Clients</CardTitle>
              <div className="text-muted-foreground text-base">All clients with closed deals</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <Filter className="text-accent" size={18} />
              <Input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="w-40" />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-40" />
              <Button variant="outline" size="sm" onClick={() => { setDate(""); setSearch(""); }}>
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
                    <th className="p-3 text-left">Deal Status</th>
                    <th className="p-3 text-left">Invoice Sent</th>
                    <th className="p-3 text-left">Contract Sent</th>
                    <th className="p-3 text-left">Extra Details</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-accent animate-pulse">Loading bookings…</td>
                    </tr>
                  ) : closedClients.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-red-500 p-6 text-center">No closed clients found.</td>
                    </tr>
                  ) : (
                    closedClients.map(b => (
                      <tr key={b.id} className="border-t transition-colors hover:bg-accent/10">
                        <td className="p-2 font-medium">{b.slot_date}</td>
                        <td className="p-2">{b.slot_time}</td>
                        <td className="p-2">{b.first_name} {b.last_name}</td>
                        <td className="p-2">{b.email}</td>
                        <td className="p-2">{b.phone}</td>
                        <td className="p-2">{b.closer_email ?? "-"}</td>
                        <td className="p-2">{b.deal_status}</td>
                        <td className="p-2">
                          {b.invoice_sent ? (
                            <span className="text-green-600 flex items-center gap-1 font-bold"><CheckCircle size={16} /> YES</span>
                          ) : (
                            <span className="text-destructive flex items-center gap-1 font-bold"><XCircle size={16} /> NO</span>
                          )}
                        </td>
                        <td className="p-2">
                          {b.contract_sent ? (
                            <span className="text-green-600 flex items-center gap-1 font-bold"><CheckCircle size={16} /> YES</span>
                          ) : (
                            <span className="text-destructive flex items-center gap-1 font-bold"><XCircle size={16} /> NO</span>
                          )}
                        </td>
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
                    ))
                  )}
                </tbody>
              </table>
              <CloserBookingDetailsModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

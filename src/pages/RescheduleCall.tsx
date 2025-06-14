import React, { useMemo, useState } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CalendarClock, Filter } from "lucide-react";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CloserBookingDetailsModal from "@/components/CloserBookingDetailsModal";
import ExportButtons from "@/components/ExportButtons";

export default function RescheduleCall() {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const { bookings, isLoading } = useCloserBookings();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Filter to only bookings with reschedule_date or follow_up_call_date not null
  const allReschedules = React.useMemo(
    () =>
      bookings.filter(
        (b) =>
          (b.reschedule_date || b.follow_up_call_date) &&
          (status === "" || (b.call_status || "").toLowerCase().includes(status.toLowerCase())) &&
          (date === "" || (b.slot_date?.toString() ?? "").includes(date)) &&
          (search === "" ||
            [b.first_name, b.last_name, b.email, b.phone].join(" ").toLowerCase().includes(search.toLowerCase()))
      ),
    [bookings, status, date, search]
  );

  // Some headline numbers for this page
  const stats = useMemo(() => ({
    total: allReschedules.length,
    completed: allReschedules.filter(b => b.call_status === "Completed").length,
    pending: allReschedules.filter(b => (b.call_status ?? "Not Started Yet") === "Not Started Yet").length,
    dealsClosed: allReschedules.filter(b => (b.deal_status ?? "").toLowerCase() === "closed").length,
  }), [allReschedules]);

  const exportHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Slot Date",
    "Slot Time",
    "Time Zone",
    "Call Status",
    "Deal Status",
    "Closed Date",
    "Follow Up Call Date",
    "Reschedule Date",
    "Payment Link Sent",
    "Contract Link Sent",
    "Invoice Sent",
    "Invoice Sent Date",
    "Contract Sent",
    "Contract Sent Date",
    "Offer Made",
    "Ad Spend",
    "Country Area",
    "Zip Code",
    "Recording Link",
    "Note",
    "Additional Info",
    "Created At",
    "Closer Email"
  ];

  const exportData = allReschedules.map((b) => ({
    "ID": b.id,
    "First Name": b.first_name,
    "Last Name": b.last_name,
    "Email": b.email,
    "Phone": b.phone,
    "Slot Date": b.slot_date,
    "Slot Time": b.slot_time,
    "Time Zone": b.slot?.time_zone ?? "UTC",
    "Call Status": b.call_status,
    "Deal Status": b.deal_status,
    "Closed Date": b.closed_date,
    "Follow Up Call Date": b.follow_up_call_date,
    "Reschedule Date": b.reschedule_date,
    "Payment Link Sent": b.payment_link_sent ?? "",
    "Contract Link Sent": b.contract_link_sent ?? "",
    "Invoice Sent": b.invoice_sent ?? "",
    "Invoice Sent Date": b.invoice_sent_date ?? "",
    "Contract Sent": b.contract_sent ?? "",
    "Contract Sent Date": b.contract_sent_date ?? "",
    "Offer Made": b.offer_made ?? "",
    "Ad Spend": b.ad_spend ?? "",
    "Country Area": b.country_area ?? "",
    "Zip Code": b.zip_code ?? "",
    "Recording Link": b.recording_link ?? "",
    "Note": b.note ?? "",
    "Additional Info": b.additional_info ?? "",
    "Created At": b.created_at,
    "Closer Email": b.closer_email ?? "",
  }));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-6 gap-3">
        <Card className="w-full max-w-6xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <CalendarClock size={32} className="text-accent animate-fade-in" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Reschedule / Follow Up Calls</CardTitle>
              <div className="text-muted-foreground text-base">All Rescheduled and Follow Up Calls</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <ExportButtons data={exportData} filename="reschedule-followup-calls" csvHeaders={exportHeaders} />
            </div>
            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-in">
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                <span className="text-2xl font-bold">{isLoading ? "…" : stats.total}</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl border border-green-200">
                <span className="text-2xl font-bold">{isLoading ? "…" : stats.completed}</span>
                <span className="text-xs text-gray-500">Completed</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-2xl font-bold">{isLoading ? "…" : stats.pending}</span>
                <span className="text-xs text-gray-500">Pending</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-2xl font-bold">{isLoading ? "…" : stats.dealsClosed}</span>
                <span className="text-xs text-gray-500">Deals Closed</span>
              </div>
            </div>
            {/* Filters */}
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
              <Button variant="outline" size="sm" onClick={() => { setStatus(""); setDate(""); setSearch(""); }}>
                Clear Filters
              </Button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow border border-accent/10 bg-white animate-fade-in">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-accent-light to-accent font-semibold text-accent-foreground">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Time Zone</th>
                    <th className="p-3 text-left">Client</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Closer Mail</th>
                    <th className="p-3 text-left">Call Status</th>
                    <th className="p-3 text-left">Deal Status</th>
                    <th className="p-3 text-left">Reschedule Date</th>
                    <th className="p-3 text-left">Follow Up Date</th>
                    <th className="p-3 text-left">Extra Details</th>
                  </tr>
                </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={12} className="p-8 text-center text-accent animate-pulse">Loading bookings…</td>
                      </tr>
                    ) : allReschedules.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="text-red-500 p-6 text-center">No rescheduled or follow up calls found with these filters.</td>
                      </tr>
                    ) : (
                      allReschedules.map(b => (
                        <tr key={b.id} className="border-t transition-colors hover:bg-accent/10">
                          <td className="p-2 font-medium">{b.slot_date}</td>
                          <td className="p-2">{b.slot_time}</td>
                          <td className="p-2">{b.slot?.time_zone ?? "UTC"}</td>
                          <td className="p-2">{b.first_name} {b.last_name}</td>
                          <td className="p-2">{b.email}</td>
                          <td className="p-2">{b.phone}</td>
                          <td className="p-2">{b.closer_email ?? "-"}</td>
                          <td className="p-2">{b.call_status ?? "-"}</td>
                          <td className="p-2">{b.deal_status ?? "-"}</td>
                          <td className="p-2">{b.reschedule_date ?? "-"}</td>
                          <td className="p-2">{b.follow_up_call_date ?? "-"}</td>
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


import React, { useState, useMemo } from "react";
import CloserSidebar from "@/components/CloserSidebar";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Filter, FileSpreadsheet, FileText, LayoutList, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExportButtons from "@/components/ExportButtons";

export default function ExportAll() {
  const { bookings, isLoading } = useCloserBookings();
  const [date, setDate] = useState("");
  const [dealStatus, setDealStatus] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [search, setSearch] = useState("");

  const filterBookings = useMemo(() => {
    return bookings.filter(b => 
      (date === "" || (b.slot_date?.toString() ?? "").includes(date)) &&
      (dealStatus === "" || (b.deal_status || "").toLowerCase().includes(dealStatus.toLowerCase())) &&
      (callStatus === "" || (b.call_status || "").toLowerCase().includes(callStatus.toLowerCase())) &&
      (search === "" || [b.first_name, b.last_name, b.email, b.phone].join(" ").toLowerCase().includes(search.toLowerCase()))
    );
  }, [bookings, date, dealStatus, callStatus, search]);

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

  const exportData = filterBookings.map((b) => ({
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
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-accent-light to-secondary">
      <CloserSidebar />
      <div className="flex-1 flex flex-col items-center p-3 md:p-6 gap-3 animate-fade-in">
        <Card className="w-full max-w-6xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-3 pb-1">
            <LayoutList size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Export All Bookings</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Filter your bookings and export as CSV or XLSX.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <ExportButtons data={exportData} filename="exported-bookings" csvHeaders={exportHeaders} />
            </div>
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <Filter className="text-accent" size={18} />
              <Input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="w-40" />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-40" />
              <select value={dealStatus} onChange={e => setDealStatus(e.target.value)} className="border rounded px-2 py-1 w-40 bg-white">
                <option value="">All Deal Status</option>
                <option value="Not Started Yet">Not Started Yet</option>
                <option value="Closed">Closed</option>
                <option value="Open">Open</option>
                <option value="Lost">Lost</option>
                <option value="Pending">Pending</option>
                <option value="Negotiation">Negotiation</option>
              </select>
              <select value={callStatus} onChange={e => setCallStatus(e.target.value)} className="border rounded px-2 py-1 w-40 bg-white">
                <option value="">All Call Status</option>
                <option value="Not Started Yet">Not Started Yet</option>
                <option value="Completed">Completed</option>
                <option value="No Show Up">No Show Up</option>
                <option value="Reschedule">Reschedule</option>
                <option value="Not Attained">Not Attained</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => {setDealStatus(""); setCallStatus(""); setDate(""); setSearch("");}}>
                Clear Filters
              </Button>
            </div>
            <div className="overflow-x-auto rounded-xl shadow border border-accent/10 bg-white">
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
                    <th className="p-3 text-left">Deal Status</th>
                    <th className="p-3 text-left">Call Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-accent animate-pulse">Loading bookings…</td>
                    </tr>
                  ) : filterBookings.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-red-500 p-6 text-center">No bookings found with these filters.</td>
                    </tr>
                  ) : (
                    filterBookings.map(b => (
                      <tr key={b.id} className="border-t transition-colors hover:bg-accent/10">
                        <td className="p-2 font-medium">{b.slot_date}</td>
                        <td className="p-2">{b.slot_time}</td>
                        <td className="p-2">{b.slot?.time_zone ?? "UTC"}</td>
                        <td className="p-2">{b.first_name} {b.last_name}</td>
                        <td className="p-2">{b.email}</td>
                        <td className="p-2">{b.phone}</td>
                        <td className="p-2">{b.closer_email ?? "-"}</td>
                        <td className="p-2">{b.deal_status ?? "Not Started Yet"}</td>
                        <td className="p-2">{b.call_status ?? "Not Started Yet"}</td>
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

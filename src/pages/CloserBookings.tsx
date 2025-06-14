
import React from "react";
import CloserSidebar from "@/components/CloserSidebar";
import CloserBookingsTable from "@/components/CloserBookingsTable";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutList } from "lucide-react";
import ExportButtons from "@/components/ExportButtons";
import { useCloserBookings } from "@/hooks/useCloserBookings";

export default function CloserBookings() {
  const { bookings, isLoading } = useCloserBookings();

  // Here we take all possible booking fields for "Extra Details" export:
  const exportHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Slot Date",
    "Slot Time",
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

  const exportData = bookings.map((b) => ({
    "ID": b.id,
    "First Name": b.first_name,
    "Last Name": b.last_name,
    "Email": b.email,
    "Phone": b.phone,
    "Slot Date": b.slot_date,
    "Slot Time": b.slot_time,
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
      <div className="flex-1 flex flex-col items-center p-6 gap-3 animate-fade-in">
        <Card className="w-full max-w-5xl mb-8 shadow-xl border-2 border-accent/10 bg-white/95">
          <CardHeader className="flex flex-row items-center gap-3 pb-1">
            <LayoutList size={32} className="text-accent" />
            <div>
              <CardTitle className="text-2xl font-extrabold text-primary">Your Bookings</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Review and manage your client call bookings.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-end">
              <ExportButtons data={exportData} filename="all-closer-bookings" csvHeaders={exportHeaders} />
            </div>
            <CloserBookingsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

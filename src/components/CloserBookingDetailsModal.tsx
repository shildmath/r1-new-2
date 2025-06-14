import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCloserBookings } from "@/hooks/useCloserBookings";

type ModalProps = {
  booking: any;
  onClose: () => void;
};

const CALL_STATUS_OPTIONS = [
  "Not Started Yet",
  "Completed",
  "No Show Up",
  "Reschedule",
  "Not Attained"
];
const DEAL_STATUS_OPTIONS = [
  "Not Started Yet",
  "Closed",
  "Follow Up",
  "Client Loss",
  "Unqualified"
];

export default function CloserBookingDetailsModal({ booking, onClose }: ModalProps) {
  const { updateBooking } = useCloserBookings();
  const [form, setForm] = useState<any>(booking);

  // Sync on open
  useEffect(() => {
    setForm(booking);
  }, [booking]);

  if (!booking) return null;

  // FIX: Only use .checked for checkboxes with correct type-guard
  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    // Use type guard for checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setForm((f: any) => ({
        ...f,
        [name]: e.target.checked,
      }));
    } else {
      setForm((f: any) => ({
        ...f,
        [name]: e.target.value,
      }));
    }
  }

  const handleSave = async () => {
    const fields = {
      call_status: form.call_status,
      deal_status: form.deal_status,
      closed_date: form.closed_date,
      invoice_sent: form.invoice_sent,
      invoice_sent_date: form.invoice_sent_date,
      invoice_link: form.invoice_link,
      contract_sent: form.contract_sent,
      contract_sent_date: form.contract_sent_date,
      contract_link: form.contract_link,
      offer_made: form.offer_made,
      ad_spend: form.ad_spend,
      country_area: form.country_area,
      zip_code: form.zip_code,
      note: form.note,
      recording_link: form.recording_link,
      follow_up_call_date: form.follow_up_call_date,
      reschedule_date: form.reschedule_date
    };
    const ok = await updateBooking(booking.id, fields);
    if (ok) {
      toast.success("Booking updated!");
      onClose();
    } else {
      toast.error("Could not update booking.");
    }
  };

  // Fields: see user notes for property list
  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Booking Detail - {booking.first_name} {booking.last_name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Call Status */}
            <div>
              <label className="font-semibold">Call Status</label>
              <select
                name="call_status"
                className="border rounded px-2 py-1 w-full"
                value={form?.call_status || "Not Started Yet"}
                onChange={handleField}
              >
                {CALL_STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {/* 2. Deal Status */}
            <div>
              <label className="font-semibold">Deal Status</label>
              <select
                name="deal_status"
                className="border rounded px-2 py-1 w-full"
                value={form?.deal_status || "Not Started Yet"}
                onChange={handleField}
              >
                {DEAL_STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {/* 3. Closed Date */}
            <div>
              <label className="font-semibold">Closed Date</label>
              <Input type="date" name="closed_date" value={form?.closed_date || ""} onChange={handleField} />
            </div>
            {/* 4. Invoice Sent */}
            <div className="flex items-center gap-2">
              <input type="checkbox" name="invoice_sent" checked={!!form?.invoice_sent} onChange={handleField} />
              <label className="font-semibold">Invoice Sent</label>
            </div>
            {/* 5. Invoice Sent Date */}
            <div>
              <label className="font-semibold">Invoice Sent Date</label>
              <Input type="date" name="invoice_sent_date" value={form?.invoice_sent_date || ""} onChange={handleField} />
            </div>
            {/* 6. Invoice Link */}
            <div>
              <label className="font-semibold">Invoice Link</label>
              <Input name="invoice_link" value={form?.invoice_link || ""} onChange={handleField} />
            </div>
            {/* 7. Contract Sent */}
            <div className="flex items-center gap-2">
              <input type="checkbox" name="contract_sent" checked={!!form?.contract_sent} onChange={handleField} />
              <label className="font-semibold">Contract Sent</label>
            </div>
            {/* 8. Contract Sent Date */}
            <div>
              <label className="font-semibold">Contract Sent Date</label>
              <Input type="date" name="contract_sent_date" value={form?.contract_sent_date || ""} onChange={handleField} />
            </div>
            {/* 9. Contract Link */}
            <div>
              <label className="font-semibold">Contract Link</label>
              <Input name="contract_link" value={form?.contract_link || ""} onChange={handleField} />
            </div>
            {/* 10. What Offer Made */}
            <div className="md:col-span-2">
              <label className="font-semibold">What Offer Made</label>
              <Textarea name="offer_made" value={form?.offer_made || ""} onChange={handleField} />
            </div>
            {/* 11. Ad Spend */}
            <div>
              <label className="font-semibold">Ad Spend</label>
              <Input name="ad_spend" value={form?.ad_spend || ""} onChange={handleField} />
            </div>
            {/* 12. Country/Area */}
            <div>
              <label className="font-semibold">Country/Area</label>
              <Input name="country_area" value={form?.country_area || ""} onChange={handleField} />
            </div>
            {/* 13. Zip Code */}
            <div>
              <label className="font-semibold">Zip Code</label>
              <Input name="zip_code" value={form?.zip_code || ""} onChange={handleField} />
            </div>
            {/* 14. Note */}
            <div className="md:col-span-2">
              <label className="font-semibold">Note</label>
              <Textarea name="note" value={form?.note || ""} onChange={handleField} />
            </div>
            {/* 15. Recording Link */}
            <div>
              <label className="font-semibold">Recording Link</label>
              <Input name="recording_link" value={form?.recording_link || ""} onChange={handleField} />
            </div>
            {/* 16. Follow Up Call - Date */}
            <div>
              <label className="font-semibold">Follow Up Call Date</label>
              <Input type="date" name="follow_up_call_date" value={form?.follow_up_call_date || ""} onChange={handleField} />
            </div>
            {/* 17. Reschedule Date */}
            <div>
              <label className="font-semibold">Reschedule Date</label>
              <Input type="date" name="reschedule_date" value={form?.reschedule_date || ""} onChange={handleField} />
            </div>
          </div>
        </div>
        <DialogFooter className="pt-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

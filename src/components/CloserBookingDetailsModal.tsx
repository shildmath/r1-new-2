
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import CloserBookingStatusFields from "./CloserBookingStatusFields";
import CloserBookingLinksFields from "./CloserBookingLinksFields";
import CloserBookingOtherFields from "./CloserBookingOtherFields";

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

  useEffect(() => {
    setForm(booking);
  }, [booking]);

  if (!booking) return null;

  function handleField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name } = e.target;
    // Safely check for checkbox type before accessing checked
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "checkbox"
    ) {
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
            <CloserBookingStatusFields
              form={form}
              handleField={handleField}
              CALL_STATUS_OPTIONS={CALL_STATUS_OPTIONS}
              DEAL_STATUS_OPTIONS={DEAL_STATUS_OPTIONS}
            />
            <CloserBookingLinksFields form={form} handleField={handleField} />
            <CloserBookingOtherFields form={form} handleField={handleField} />
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

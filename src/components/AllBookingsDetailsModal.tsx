
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BadgeCheck, Link as LinkIcon, Info, UserCheck, Trash2 } from "lucide-react";
import AdminBookingStatusFields from "./AdminBookingStatusFields";
import AdminBookingLinksFields from "./AdminBookingLinksFields";
import AdminBookingOtherFields from "./AdminBookingOtherFields";
import { supabase } from "@/integrations/supabase/client";

// Status field options
const CALL_STATUS_OPTIONS = [
  "Not Started Yet",
  "Completed",
  "No Show Up",
  "Reschedule",
  "Not Attained",
];
const DEAL_STATUS_OPTIONS = [
  "Not Started Yet",
  "Closed",
  "Follow Up",
  "Client Loss",
  "Unqualified",
];

type Props = {
  booking: any;
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export default function AllBookingsDetailsModal({
  booking,
  open,
  onClose,
  onUpdate,
}: Props) {
  const [form, setForm] = useState<any>(booking || {});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setForm(booking || {});
  }, [booking]);

  if (!booking) return null;

  function handleField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm((f: any) => ({
        ...f,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((f: any) => ({
        ...f,
        [name]: e.target.value,
      }));
    }
  }

  function handleCancel() {
    onClose();
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
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
          additional_info: form.additional_info,
          recording_link: form.recording_link,
          follow_up_call_date: form.follow_up_call_date,
          reschedule_date: form.reschedule_date
        })
        .eq('id', booking.id);

      if (error) throw error;
      
      toast.success("Booking updated successfully!");
      onUpdate?.();
      onClose();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error("Failed to update booking");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', booking.id);

      if (error) throw error;
      
      toast.success("Booking deleted successfully!");
      onUpdate?.();
      onClose();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full rounded-xl p-0 shadow-2xl overflow-hidden animate-scale-in">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-5 border-b">
          <DialogTitle className="flex gap-2 items-center text-xl font-bold text-blue-700">
            <UserCheck size={24} className="text-blue-700" />
            Extra Details — {booking.first_name} {booking.last_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col max-h-[70vh] overflow-y-auto bg-gradient-to-tr from-white to-slate-50 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 pt-7 pb-3">
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={18} className="text-violet-600" />
                <span className="text-base font-semibold text-violet-700">
                  Status & Core Fields
                </span>
              </div>
              <AdminBookingStatusFields
                form={form}
                handleField={handleField}
                CALL_STATUS_OPTIONS={CALL_STATUS_OPTIONS}
                DEAL_STATUS_OPTIONS={DEAL_STATUS_OPTIONS}
              />
            </div>
            
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <LinkIcon size={18} className="text-emerald-600" />
                <span className="text-base font-semibold text-emerald-700">
                  Links & Offers
                </span>
              </div>
              <AdminBookingLinksFields form={form} handleField={handleField} />
            </div>
            
            <div className="md:col-span-2 rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Info size={18} className="text-sky-600" />
                <span className="text-base font-semibold text-sky-700">
                  Other Info
                </span>
              </div>
              <AdminBookingOtherFields form={form} handleField={handleField} />
            </div>
          </div>
        </div>
        
        <DialogFooter className="sticky bottom-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-5 border-t flex gap-3">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={saving || deleting}
            className="w-40 font-semibold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || deleting}
            className="w-40 font-semibold"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="w-40 font-semibold"
          >
            <Trash2 className="mr-2" /> {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

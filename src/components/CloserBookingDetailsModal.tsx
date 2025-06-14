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
import { useCloserBookings } from "@/hooks/useCloserBookings";
import CloserBookingStatusFields from "./CloserBookingStatusFields";
import CloserBookingLinksFields from "./CloserBookingLinksFields";
import CloserBookingOtherFields from "./CloserBookingOtherFields";
import { BadgeCheck, Link, Info, UserCheck, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

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
  const { updateBooking, deleteBooking } = useCloserBookings();
  const [form, setForm] = useState<any>(booking);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    setForm(booking);
  }, [booking]);

  if (!booking) return null;

  function handleField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name } = e.target;
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "checkbox"
    ) {
      const checkbox = e.target as HTMLInputElement;
      setForm((f: any) => ({
        ...f,
        [name]: checkbox.checked,
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
      additional_info: form.additional_info,
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

  const handleDelete = async () => {
    const ok = await deleteBooking(booking.id);
    if (ok) {
      toast.success("Booking deleted.");
      setShowDeleteDialog(false);
      onClose();
    } else {
      toast.error("Booking could not be deleted.");
    }
  };

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 rounded-xl overflow-hidden animate-scale-in shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-5 border-b">
          <DialogTitle className="flex gap-2 items-center text-xl font-bold text-blue-700">
            <UserCheck className="text-blue-700" size={24} />
            Extra Details — {booking.first_name} {booking.last_name}
          </DialogTitle>
        </DialogHeader>
        {/* Modal Main Content */}
        <div className="p-0 flex flex-col max-h-[70vh] overflow-y-auto bg-gradient-to-tr from-white to-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 pt-7 pb-3">
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="text-violet-600" size={18} />
                <span className="text-base font-semibold text-violet-700">Status & Core Fields</span>
              </div>
              <CloserBookingStatusFields
                form={form}
                handleField={handleField}
                CALL_STATUS_OPTIONS={CALL_STATUS_OPTIONS}
                DEAL_STATUS_OPTIONS={DEAL_STATUS_OPTIONS}
              />
            </div>
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Link className="text-emerald-600" size={18} />
                <span className="text-base font-semibold text-emerald-700">Links & Offers</span>
              </div>
              <CloserBookingLinksFields form={form} handleField={handleField} />
            </div>
            <div className="md:col-span-2 rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-sky-600" size={18} />
                <span className="text-base font-semibold text-sky-700">Other Info</span>
              </div>
              <CloserBookingOtherFields form={form} handleField={handleField} />
            </div>
          </div>
        </div>
        {/* Modal Footer */}
        <DialogFooter className="sticky bottom-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-5 border-t flex gap-3">
          <Button variant="secondary" onClick={onClose} className="w-40 font-semibold">
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-40 font-semibold">
            Save
          </Button>
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-40 font-semibold"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete this booking? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

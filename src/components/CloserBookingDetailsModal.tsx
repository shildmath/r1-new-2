
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import CloserBookingStatusFields from "./CloserBookingStatusFields";
import CloserBookingLinksFields from "./CloserBookingLinksFields";
import CloserBookingOtherFields from "./CloserBookingOtherFields";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent as AlertContent,
  AlertDialogHeader,
  AlertDialogTitle as AlertTitle,
  AlertDialogDescription,
  AlertDialogFooter as AlertFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type Props = {
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

export default function CloserBookingDetailsModal({ booking, onClose }: Props) {
  const { updateBooking, deleteBooking } = useCloserBookings();
  const [form, setForm] = useState<any>(booking);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);
    const delOk = await deleteBooking(booking.id);
    setIsDeleting(false);
    if (delOk) {
      toast.success("Booking deleted.");
      setIsDeleteOpen(false);
      onClose();
    } else {
      toast.error("Could not delete booking. Please try again.");
    }
  };

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Extra Details - {booking.first_name} {booking.last_name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <CloserBookingStatusFields
            form={form}
            handleField={handleField}
            CALL_STATUS_OPTIONS={CALL_STATUS_OPTIONS}
            DEAL_STATUS_OPTIONS={DEAL_STATUS_OPTIONS}
          />
          <CloserBookingLinksFields
            form={form}
            handleField={handleField}
          />
          <CloserBookingOtherFields
            form={form}
            handleField={handleField}
          />
        </div>
        <DialogFooter className="flex gap-2 mt-6">
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full"
          >
            Save
          </Button>
          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => setIsDeleteOpen(true)}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertContent>
              <AlertDialogHeader>
                <AlertTitle>
                  Confirm Deletion
                </AlertTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this booking? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                >{isDeleting ? "Deleting..." : "Delete Booking"}</AlertDialogAction>
              </AlertFooter>
            </AlertContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

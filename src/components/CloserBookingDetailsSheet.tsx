import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCloserBookings } from "@/hooks/useCloserBookings";
import CloserBookingStatusFields from "./CloserBookingStatusFields";
import CloserBookingLinksFields from "./CloserBookingLinksFields";
import CloserBookingOtherFields from "./CloserBookingOtherFields";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

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

export default function CloserBookingDetailsSheet({ booking, onClose }: Props) {
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
    <Sheet open={!!booking} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="max-w-lg w-full flex flex-col p-0"
      >
        <SheetHeader className="sticky top-0 bg-background z-10 p-6 border-b">
          <SheetTitle>
            Extra Details - {booking.first_name} {booking.last_name}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 space-y-6 bg-muted/50">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <CloserBookingStatusFields
              form={form}
              handleField={handleField}
              CALL_STATUS_OPTIONS={CALL_STATUS_OPTIONS}
              DEAL_STATUS_OPTIONS={DEAL_STATUS_OPTIONS}
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <CloserBookingLinksFields
              form={form}
              handleField={handleField}
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <CloserBookingOtherFields
              form={form}
              handleField={handleField}
            />
          </div>
        </div>
        <SheetFooter className="sticky bottom-0 bg-background z-10 p-6 border-t flex gap-2">
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
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

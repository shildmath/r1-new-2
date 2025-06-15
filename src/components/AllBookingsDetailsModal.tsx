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
};

export default function AllBookingsDetailsModal({
  booking,
  open,
  onClose,
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
    const { name } = e.target;
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

  function handleCancel() {
    onClose();
  }

  async function handleSave() {
    setSaving(true);
    // Replace with real save logic (e.g., update call to backend)
    setTimeout(() => {
      toast.success("Booking updated (demo only)!");
      setSaving(false);
      onClose();
    }, 1000);
  }

  async function handleDelete() {
    setDeleting(true);
    // Replace with real delete logic as needed
    setTimeout(() => {
      toast.success("Booking deleted (demo only)!");
      setDeleting(false);
      onClose();
    }, 1000);
  }

  // COMPONENTS: for more reuse, these can later be moved to separate files!
  // 1. STATUS & CORE FIELDS
  const AdminBookingStatusFields = () => (
    <div className="space-y-2">
      <div>
        <label className="font-semibold">Call Status</label>
        <select
          name="call_status"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.call_status ?? ""}
          onChange={handleField}
        >
          <option value="">Select call status…</option>
          {CALL_STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-semibold">Deal Status</label>
        <select
          name="deal_status"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.deal_status ?? ""}
          onChange={handleField}
        >
          <option value="">Select deal status…</option>
          {DEAL_STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-semibold">Closed Date</label>
        <input
          type="date"
          name="closed_date"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.closed_date ?? ""}
          onChange={handleField}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="invoice_sent"
          checked={!!form.invoice_sent}
          onChange={handleField}
          id="invoice_sent"
        />
        <label htmlFor="invoice_sent" className="font-semibold">Invoice Sent</label>
      </div>
      <div>
        <label className="font-semibold">Invoice Sent Date</label>
        <input
          type="date"
          name="invoice_sent_date"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.invoice_sent_date ?? ""}
          onChange={handleField}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="contract_sent"
          checked={!!form.contract_sent}
          onChange={handleField}
          id="contract_sent"
        />
        <label htmlFor="contract_sent" className="font-semibold">Contract Sent</label>
      </div>
      <div>
        <label className="font-semibold">Contract Sent Date</label>
        <input
          type="date"
          name="contract_sent_date"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.contract_sent_date ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Follow Up Call Date</label>
        <input
          type="date"
          name="follow_up_call_date"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.follow_up_call_date ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Reschedule Date</label>
        <input
          type="date"
          name="reschedule_date"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.reschedule_date ?? ""}
          onChange={handleField}
        />
      </div>
    </div>
  );

  // 2. LINKS & OFFERS
  const AdminBookingLinksFields = () => (
    <div className="space-y-2">
      <div>
        <label className="font-semibold">Invoice Link</label>
        <input
          type="text"
          name="invoice_link"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.invoice_link ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Contract Link</label>
        <input
          type="text"
          name="contract_link"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.contract_link ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">What Offer Made</label>
        <textarea
          name="offer_made"
          className="border rounded px-2 py-1 w-full bg-white min-h-[38px]"
          value={form.offer_made ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Recording Link</label>
        <input
          type="text"
          name="recording_link"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.recording_link ?? ""}
          onChange={handleField}
        />
      </div>
    </div>
  );

  // 3. OTHER FIELDS
  const AdminBookingOtherFields = () => (
    <div className="space-y-2">
      <div>
        <label className="font-semibold">Ad Spend</label>
        <input
          name="ad_spend"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.ad_spend ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Country/Area</label>
        <input
          name="country_area"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.country_area ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Zip Code</label>
        <input
          name="zip_code"
          className="border rounded px-2 py-1 w-full bg-white"
          value={form.zip_code ?? ""}
          onChange={handleField}
        />
      </div>
      <div>
        <label className="font-semibold">Additional Info</label>
        <textarea
          name="additional_info"
          className="border rounded px-2 py-1 w-full bg-white min-h-[38px]"
          value={form.additional_info ?? ""}
          onChange={handleField}
        />
      </div>
    </div>
  );

  // MAIN UI
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full rounded-xl p-0 shadow-2xl overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-5 border-b">
          <DialogTitle className="flex gap-2 items-center text-xl font-bold text-blue-700">
            <UserCheck size={24} className="text-blue-700" />
            Extra Details — {booking.first_name} {booking.last_name}
          </DialogTitle>
        </DialogHeader>
        {/* Body Content */}
        <div className="flex flex-col max-h-[70vh] overflow-y-auto bg-gradient-to-tr from-white to-slate-50 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 pt-7 pb-3">
            {/* Status & Core Fields */}
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={18} className="text-violet-600" />
                <span className="text-base font-semibold text-violet-700">
                  Status & Core Fields
                </span>
              </div>
              <AdminBookingStatusFields />
            </div>
            {/* Links & Offers */}
            <div className="rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <LinkIcon size={18} className="text-emerald-600" />
                <span className="text-base font-semibold text-emerald-700">
                  Links & Offers
                </span>
              </div>
              <AdminBookingLinksFields />
            </div>
            {/* Other Info */}
            <div className="md:col-span-2 rounded-xl bg-white/90 p-5 shadow-sm border mb-2">
              <div className="flex items-center gap-2 mb-3">
                <Info size={18} className="text-sky-600" />
                <span className="text-base font-semibold text-sky-700">
                  Other Info
                </span>
              </div>
              <AdminBookingOtherFields />
            </div>
          </div>
        </div>
        {/* Footer */}
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

// End of file. This file is now VERY LONG. Please consider splitting these 3 field components into their own files for maintainability! Let me know if you want to proceed.

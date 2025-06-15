
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
import { UserCheck, BadgeCheck, Link, Trash2 } from "lucide-react";

// Dropdown options for status values
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
      setForm((f: any) => ({ ...f, [name]: e.target.checked }));
    } else {
      setForm((f: any) => ({ ...f, [name]: e.target.value }));
    }
  }

  function handleCancel() {
    onClose();
  }

  async function handleSave() {
    setSaving(true);
    // Replace with save logic (supabase update call) as needed!
    setTimeout(() => {
      toast.success("Booking updated (demo only)!");
      setSaving(false);
      onClose();
    }, 1000);
  }

  async function handleDelete() {
    setDeleting(true);
    // Replace with delete logic as needed!
    setTimeout(() => {
      toast.success("Booking deleted (demo only)!");
      setDeleting(false);
      onClose();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-full rounded-2xl shadow-2xl p-0 animate-scale-in flex flex-col items-center"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {/* Header */}
        <DialogHeader className="px-0 pt-0 pb-2 w-full">
          <div className="w-full rounded-t-2xl bg-gradient-to-r from-blue-100 to-blue-50 p-6 border-b flex items-center gap-2">
            <UserCheck size={28} className="text-primary" />
            <DialogTitle className="text-xl sm:text-2xl font-bold text-primary flex-1">
              Extra Details —{" "}
              <span className="text-blue-700">
                {booking.first_name} {booking.last_name}
              </span>
            </DialogTitle>
          </div>
        </DialogHeader>
        {/* Body */}
        <div className="flex-1 w-full px-0 pb-0 pt-0 h-full">
          <div className="flex flex-col md:flex-row gap-4 p-6 w-full max-h-[60vh] overflow-y-auto">
            {/* Status & Core Fields */}
            <div className="flex-1 p-5 rounded-xl bg-white border border-accent-light shadow-sm flex flex-col gap-4 min-w-[250px]">
              <div className="inline-flex items-center gap-2 mb-2">
                <BadgeCheck size={18} className="text-violet-600" />
                <span className="text-base font-semibold text-violet-700">
                  Status & Core Fields
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Call Status
                  </label>
                  <select
                    name="call_status"
                    className="w-full border rounded px-3 py-2 text-sm outline-accent"
                    value={form.call_status ?? ""}
                    onChange={handleField}
                  >
                    <option value="">Select status...</option>
                    {CALL_STATUS_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Deal Status
                  </label>
                  <select
                    name="deal_status"
                    className="w-full border rounded px-3 py-2 text-sm outline-accent"
                    value={form.deal_status ?? ""}
                    onChange={handleField}
                  >
                    <option value="">Select status...</option>
                    {DEAL_STATUS_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Closed Date
                  </label>
                  <input
                    type="date"
                    name="closed_date"
                    className="w-full border rounded px-3 py-2 text-sm outline-accent"
                    value={form.closed_date ?? ""}
                    onChange={handleField}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="invoice_sent"
                    id="invoice_sent"
                    checked={!!form.invoice_sent}
                    onChange={handleField}
                  />
                  <label htmlFor="invoice_sent" className="text-sm">
                    Invoice Sent
                  </label>
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Invoice Sent Date
                  </label>
                  <input
                    type="date"
                    name="invoice_sent_date"
                    className="w-full border rounded px-3 py-2 text-sm outline-accent"
                    value={form.invoice_sent_date ?? ""}
                    onChange={handleField}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contract_sent"
                    id="contract_sent"
                    checked={!!form.contract_sent}
                    onChange={handleField}
                  />
                  <label htmlFor="contract_sent" className="text-sm">
                    Contract Sent
                  </label>
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Contract Sent Date
                  </label>
                  <input
                    type="date"
                    name="contract_sent_date"
                    className="w-full border rounded px-3 py-2 text-sm outline-accent"
                    value={form.contract_sent_date ?? ""}
                    onChange={handleField}
                  />
                </div>
              </div>
            </div>
            {/* Links & Offers */}
            <div className="flex-1 p-5 rounded-xl bg-white border border-teal-100 shadow-sm flex flex-col gap-4 min-w-[250px]">
              <div className="inline-flex items-center gap-2 mb-2">
                <Link size={18} className="text-emerald-600" />
                <span className="text-base font-semibold text-emerald-700">
                  Links & Offers
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Invoice Link
                  </label>
                  <input
                    type="text"
                    name="invoice_link"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={form.invoice_link ?? ""}
                    onChange={handleField}
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Contract Link
                  </label>
                  <input
                    type="text"
                    name="contract_link"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={form.contract_link ?? ""}
                    onChange={handleField}
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    What Offer Made
                  </label>
                  <textarea
                    name="offer_made"
                    className="w-full border rounded px-3 py-2 text-sm min-h-[38px]"
                    value={form.offer_made ?? ""}
                    onChange={handleField}
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1 text-sm">
                    Recording Link
                  </label>
                  <input
                    type="text"
                    name="recording_link"
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={form.recording_link ?? ""}
                    onChange={handleField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <DialogFooter className="w-full flex flex-row gap-3 items-center px-6 py-4 border-t bg-gradient-to-r from-blue-50 to-blue-100 rounded-b-2xl">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={saving || deleting}
            className="flex-1 font-semibold py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || deleting}
            className="flex-1 bg-primary text-white font-semibold py-2"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="flex-1 font-semibold py-2"
          >
            <Trash2 className="mr-2" /> {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

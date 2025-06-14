
import React from "react";
import { Input } from "@/components/ui/input";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  CALL_STATUS_OPTIONS: string[];
  DEAL_STATUS_OPTIONS: string[];
};

export default function CloserBookingStatusFields({
  form,
  handleField,
  CALL_STATUS_OPTIONS,
  DEAL_STATUS_OPTIONS,
}: Props) {
  return (
    <div className="space-y-2">
      {/* 1. Call Status */}
      <div>
        <label className="font-semibold">Call Status</label>
        <select
          name="call_status"
          className="border rounded px-2 py-1 w-full bg-white"
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
          className="border rounded px-2 py-1 w-full bg-white"
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
  );
}


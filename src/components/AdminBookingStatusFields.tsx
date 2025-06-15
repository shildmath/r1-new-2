
import React from "react";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  CALL_STATUS_OPTIONS: string[];
  DEAL_STATUS_OPTIONS: string[];
};

export default function AdminBookingStatusFields({
  form,
  handleField,
  CALL_STATUS_OPTIONS,
  DEAL_STATUS_OPTIONS,
}: Props) {
  return (
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
            <option key={opt} value={opt}>
              {opt}
            </option>
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
            <option key={opt} value={opt}>
              {opt}
            </option>
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
        <label htmlFor="invoice_sent" className="font-semibold">
          Invoice Sent
        </label>
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
        <label htmlFor="contract_sent" className="font-semibold">
          Contract Sent
        </label>
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
}


import React from "react";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function AdminBookingLinksFields({ form, handleField }: Props) {
  return (
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
}

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function CloserBookingLinksFields({ form, handleField }: Props) {
  return (
    <div className="space-y-2">
      {/* 6. Invoice Link */}
      <div>
        <label className="font-semibold">Invoice Link</label>
        <Input name="invoice_link" value={form?.invoice_link || ""} onChange={handleField} />
      </div>
      {/* 9. Contract Link */}
      <div>
        <label className="font-semibold">Contract Link</label>
        <Input name="contract_link" value={form?.contract_link || ""} onChange={handleField} />
      </div>
      {/* 10. What Offer Made */}
      <div>
        <label className="font-semibold">What Offer Made</label>
        <Textarea name="offer_made" value={form?.offer_made || ""} onChange={handleField} />
      </div>
      {/* 15. Recording Link */}
      <div>
        <label className="font-semibold">Recording Link</label>
        <Input name="recording_link" value={form?.recording_link || ""} onChange={handleField} />
      </div>
    </div>
  );
}

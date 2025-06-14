import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function CloserBookingOtherFields({ form, handleField }: Props) {
  return (
    <div className="space-y-2">
      {/* 11. Ad Spend */}
      <div>
        <label className="font-semibold">Ad Spend</label>
        <Input name="ad_spend" value={form?.ad_spend || ""} onChange={handleField} />
      </div>
      {/* 12. Country/Area */}
      <div>
        <label className="font-semibold">Country/Area</label>
        <Input name="country_area" value={form?.country_area || ""} onChange={handleField} />
      </div>
      {/* 13. Zip Code */}
      <div>
        <label className="font-semibold">Zip Code</label>
        <Input name="zip_code" value={form?.zip_code || ""} onChange={handleField} />
      </div>
      {/* 14. Note */}
      <div>
        <label className="font-semibold">Note</label>
        <Textarea name="note" value={form?.note || ""} onChange={handleField} />
      </div>
    </div>
  );
}

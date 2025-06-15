
import React from "react";

type Props = {
  form: any;
  handleField: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function AdminBookingOtherFields({ form, handleField }: Props) {
  return (
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
}

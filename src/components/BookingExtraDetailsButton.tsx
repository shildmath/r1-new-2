
import React, { useState } from "react";
import CloserBookingDetailsSheet from "./CloserBookingDetailsSheet";
import { Button } from "@/components/ui/button";

export default function BookingExtraDetailsButton({ booking, ButtonLabel = "Extra Details" }: { booking: any, ButtonLabel?: string }) {
  const [open, setOpen] = useState(false);
  if (!booking) return null;
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {ButtonLabel}
      </Button>
      {open && (
        <CloserBookingDetailsSheet booking={booking} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

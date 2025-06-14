
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface StrategyCallBookingPayload {
  slot_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  additional_info?: string;
}

export function useBookStrategyCall() {
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookCall = async (payload: StrategyCallBookingPayload) => {
    setIsBooking(true);
    setError(null);
    try {
      const { error } = await supabase.from("bookings").insert([payload]);
      if (error) {
        setError(error.message);
        setIsBooking(false);
        return false;
      }
      setIsBooking(false);
      return true;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setIsBooking(false);
      return false;
    }
  };

  return { bookCall, isBooking, error };
}

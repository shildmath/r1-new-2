import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminBooking {
  id: string;
  slot_id: string;
  slot_date: string;
  slot_time: string;
  slot_time_zone: string;
  is_available: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  call_status: string;
  deal_status: string;
  created_at: string;
  closer_id: string;
  closer_name: string;
  closer_email: string;
}

export function useAdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data: userResult } = await supabase.auth.getUser();
    const userId = userResult?.user?.id;

    // Updated join to be sure: fetch all closer fields for real-time closer info
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        slot:time_slots(id, date, time, time_zone, closer_id, is_available, closer:profiles(id, full_name, email))
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("useAdminBookings – Supabase error:", error);
    }

    if (!error && data) {
      setBookings(
        data.map((b: any) => ({
          id: b.id,
          slot_id: b.slot_id,
          slot_date: b.slot?.date,
          slot_time: b.slot?.time,
          slot_time_zone: b.slot?.time_zone || "UTC",
          is_available: b.slot?.is_available,
          first_name: b.first_name,
          last_name: b.last_name,
          email: b.email,
          phone: b.phone,
          call_status: b.call_status,
          deal_status: b.deal_status,
          created_at: b.created_at,
          closer_id: b.slot?.closer?.id ?? b.slot?.closer_id ?? "-",
          closer_name: b.slot?.closer?.full_name || "-",
          closer_email: b.slot?.closer?.email || "-",
          // You can expand here with more fields if added in the future
        }))
      );
    } else {
      setBookings([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, isLoading, refresh: fetchBookings };
}

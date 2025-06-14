import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export function useCloserBookings() {
  const { session } = useSupabaseAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<{ date?: string }>({});

  async function fetchBookings() {
    if (!session?.user) {
      console.log("No active session or user.");
      return;
    }
    setIsLoading(true);

    console.log("Session user id:", session.user.id);

    let slotIds = await getSlotIds(session.user.id);
    console.log("Fetched slotIds for this closer:", slotIds);

    if (!slotIds || slotIds.length === 0) {
      console.log("No slots found for this closer! No bookings will be shown.");
      setBookings([]);
      setIsLoading(false);
      return;
    }

    let query = supabase
      .from("bookings")
      .select(
        `
        *,
        slot:time_slots(id, date, time),
        client:profiles!bookings_client_id_fkey(id, full_name)
        `
      )
      .in("slot_id", slotIds);

    if (filter.date) {
      query = query.eq("slot.date", filter.date);
    }
    const { data, error } = await query;
    if (error) {
      console.log("Error fetching bookings:", error);
    }
    if (data) {
      console.log("Fetched bookings:", data);
      setBookings(
        data.map((b: any) => ({
          ...b,
          slot_date: b.slot?.date,
          slot_time: b.slot?.time,
        }))
      );
    } else {
      setBookings([]);
    }
    setIsLoading(false);
  }

  // Helper: get slot ids for this closer
  async function getSlotIds(closer_id: string) {
    const { data, error } = await supabase
      .from("time_slots")
      .select("id")
      .eq("closer_id", closer_id);
    if (error) {
      console.log("Error fetching time slots:", error);
    }
    console.log("getSlotIds result for closer_id", closer_id, ":", data);
    return data ? data.map((s) => s.id) : [];
  }

  useEffect(() => {
    if (session?.user) fetchBookings();
    // eslint-disable-next-line
  }, [session, filter]);

  async function updateBooking(id: string, fields: any) {
    const { error } = await supabase
      .from("bookings")
      .update(fields)
      .eq("id", id);
    if (!error) fetchBookings();
    return !error;
  }

  function clearFilter() {
    setFilter({});
  }

  return {
    bookings,
    updateBooking,
    isLoading,
    filter,
    setFilter,
    clearFilter,
  };
}

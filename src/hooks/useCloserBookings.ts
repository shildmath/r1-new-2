
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

// Utility to get slot IDs for the closer
export function useCloserBookings() {
  const { session } = useSupabaseAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<{ date?: string }>({});

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

  async function fetchBookings() {
    if (!session?.user) {
      console.log("No active session or user.");
      setBookings([]);
      setIsLoading(false);
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

    // Join slot, client, and closer_profile for closer_email
    let query = supabase
      .from("bookings")
      .select(
        `
        *,
        slot:time_slots(id, date, time, closer_id, time_zone, closer_profile:profiles(email)),
        client:profiles(id, full_name, email)
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
        data.map((b: any) => {
          // Prefer primary fields on the base booking, fall back to client join if present
          let fullName = b.client?.full_name || `${b.first_name ?? ""} ${b.last_name ?? ""}`.trim();
          let email = b.email || b.client?.email || "";
          // Get closer_email from slot.closer_profile?.email
          let closer_email = "";
          if (b.slot?.closer_profile && Array.isArray(b.slot.closer_profile) && b.slot.closer_profile.length > 0) {
            closer_email = b.slot.closer_profile[0]?.email ?? "";
          } else if (b.slot?.closer_profile?.email) {
            closer_email = b.slot.closer_profile.email;
          }
          return {
            ...b,
            slot_date: b.slot?.date,
            slot_time: b.slot?.time,
            first_name: b.first_name ?? (fullName?.split(" ")[0] ?? ""),
            last_name: b.last_name ?? (fullName?.split(" ").slice(1).join(" ") ?? ""),
            email,
            closer_email: closer_email || "",
          };
        })
      );
    } else {
      setBookings([]);
    }
    setIsLoading(false);
  }

  async function deleteBooking(id: string) {
    if (!id) return false;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      console.error("[deleteBooking] Error:", error);
      return false;
    }
    await fetchBookings();
    return true;
  }

  useEffect(() => {
    if (session?.user) fetchBookings();
    // eslint-disable-next-line
  }, [session, filter]);

  async function updateBooking(id: string, fields: any) {
    // Whitelist only valid fields according to the bookings table schema
    const validFields = [
      "call_status", "deal_status", "closed_date", "invoice_sent", "invoice_sent_date",
      "invoice_link", "contract_sent", "contract_sent_date", "contract_link",
      "offer_made", "ad_spend", "country_area", "zip_code", "additional_info",
      "recording_link", "follow_up_call_date", "reschedule_date"
    ];
    // Build a new payload with only known good fields
    const cleanFields: any = {};
    for (const key of validFields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        cleanFields[key] = fields[key] ?? null; // NULL is better than undefined for Supabase
      }
    }

    console.log("[updateBooking] Attempt", { id, cleanFields });
    const { error } = await supabase
      .from("bookings")
      .update(cleanFields)
      .eq("id", id);
    if (error) {
      console.error("[updateBooking] Error details:", error);
    }
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
    deleteBooking,
  };
}


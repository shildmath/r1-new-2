
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminSlot {
  id: string;
  date: string;
  time: string;
  time_zone: string;
  is_available: boolean;
  created_at: string;
  closer_id: string;
  closer_name: string;
  closer_email: string;
}

export function useAdminSlots() {
  const [slots, setSlots] = useState<AdminSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = async () => {
    setIsLoading(true);

    // Get current user
    const { data: userResult } = await supabase.auth.getUser();
    const userId = userResult?.user?.id;
    console.log("useAdminSlots – Current user ID (supabase.auth.getUser):", userId);

    const { data, error } = await supabase
      .from("time_slots")
      .select(
        `
        *,
        closer:profiles(id, full_name, email)
        `
      )
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    console.log("useAdminSlots – Supabase data:", data);
    if (error) {
      console.error("useAdminSlots – Supabase error:", error);
    }

    if (!error && data) {
      const slots = data.map((s: any) => ({
        id: s.id,
        date: s.date,
        time: s.time,
        time_zone: s.time_zone || "UTC",
        is_available: s.is_available,
        created_at: s.created_at,
        closer_id: s.closer?.id,
        closer_name: s.closer?.full_name || "-",
        closer_email: s.closer?.email || "-",
      }));
      setSlots(slots);
      console.log("useAdminSlots – Final mapped slots:", slots);
    } else {
      setSlots([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return { slots, isLoading, refresh: fetchSlots };
}

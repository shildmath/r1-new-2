
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Includes all slot fields
export interface Slot {
  id: string;
  closer_id: string;
  date: string;
  time: string;
  time_zone?: string;
  is_available: boolean;
  created_at: string;
}

export function useRealtimeSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all available slots (is_available = true)
  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("is_available", true)
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    if (!error) setSlots(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvailableSlots();

    // Subscribe to real-time changes
    const realtimeChannel = supabase
      .channel("public:time_slots")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all changes (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "time_slots",
        },
        (payload) => {
          // Refetch all slots (simple & robust, handles all changes)
          fetchAvailableSlots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtimeChannel);
    };
    // eslint-disable-next-line
  }, []);

  return { slots, isLoading, refresh: fetchAvailableSlots };
}

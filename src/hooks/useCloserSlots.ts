
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export function useCloserSlots() {
  const { session } = useSupabaseAuth();
  const [slots, setSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<{ date?: string }>({});

  async function fetchSlots() {
    setIsLoading(true);
    let query = supabase
      .from("time_slots")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true })
      .eq("closer_id", session?.user.id || "");
    if (filter.date) {
      query = query.eq("date", filter.date);
    }
    const { data, error } = await query;
    if (!error) setSlots(data || []);
    setIsLoading(false);
  }

  useEffect(() => {
    if (session?.user) fetchSlots();
    // eslint-disable-next-line
  }, [session, filter]);

  async function addSlot(date: string, time: string) {
    if (!session?.user) return false;
    const { data, error } = await supabase
      .from("time_slots")
      .insert({
        closer_id: session.user.id,
        date,
        time,
        is_available: true,
      });
    if (!error) fetchSlots();
    return !error;
  }

  async function updateSlot(id: string, is_available: boolean) {
    const { error } = await supabase
      .from("time_slots")
      .update({ is_available })
      .eq("id", id);
    if (!error) fetchSlots();
    return !error;
  }

  async function removeSlot(id: string) {
    const { error } = await supabase.from("time_slots").delete().eq("id", id);
    if (!error) fetchSlots();
    return !error;
  }

  function clearFilter() {
    setFilter({});
  }

  return {
    slots,
    addSlot,
    updateSlot,
    removeSlot,
    isLoading,
    filter,
    setFilter,
    clearFilter,
  };
}

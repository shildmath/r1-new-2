
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Type for closer row from the profiles table
export interface CloserProfile {
  id: string;
  full_name: string;
  email: string;
}

export function useAllClosers() {
  const [closers, setClosers] = useState<CloserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .order("full_name", { ascending: true });
      if (!error && data) setClosers(data);
      else setClosers([]);
      setLoading(false);
    })();
  }, []);

  return { closers, loading };
}

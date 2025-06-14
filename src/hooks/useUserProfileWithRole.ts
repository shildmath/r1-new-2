
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export function useUserProfileWithRole() {
  const { user } = useSupabaseAuth();
  const [profile, setProfile] = useState<{ full_name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    Promise.all([
      supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle()
    ]).then(([fullNameRes, roleRes]) => {
      setProfile({
        full_name: fullNameRes.data?.full_name || "User",
        role: roleRes.data?.role || "unknown"
      });
      setLoading(false);
    });
  }, [user]);

  return { profile, loading };
}

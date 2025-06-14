
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
    // Fetch profile and role in one go
    supabase
      .from("profiles")
      .select("full_name, user_roles(role)")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setProfile({
          full_name: data?.full_name || "User",
          role: data?.user_roles?.[0]?.role || "unknown"
        });
        setLoading(false);
      });
  }, [user]);

  return { profile, loading };
}

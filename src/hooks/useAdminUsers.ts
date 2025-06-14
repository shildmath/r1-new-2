
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type UserEntry = {
  id: string;
  email: string;
  full_name?: string;
  role?: "admin" | "closer";
  created_at?: string | null;
};

export function useAdminUsers() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users (profiles + user_roles)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at, user_roles: user_roles(role)")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
      setUsers([]);
      setLoading(false);
      return;
    }
    setUsers(
      (data as any[]).map((user) => ({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
        role: user.user_roles?.[0]?.role ?? undefined,
      }))
    );
    setLoading(false);
  }, []);

  // Add new user
  const addUser = useCallback(
    async (form: { name: string; email: string; password: string; role: "admin" | "closer" }) => {
      setLoading(true);
      setError(null);

      // 1. Sign up user (Supabase Auth: email/password) → must set emailRedirectTo, see auth docs
      const redirectUrl = window.location.origin + "/auth";
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (signUpError) {
        setError(`SignUp Error: ${signUpError.message}`);
        setLoading(false);
        return false;
      }

      const userId = data.user?.id;
      if (!userId) {
        setError("Failed to get new user ID, check email confirmation.");
        setLoading(false);
        return false;
      }

      // 2. Insert into profiles (if not auto inserted by trigger)
      const upsertProfile = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          full_name: form.name,
          email: form.email,
        })
        .select();

      if (upsertProfile.error) {
        setError("Profile Error: " + upsertProfile.error.message);
        setLoading(false);
        return false;
      }

      // 3. Insert into user_roles
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: userId,
        role: form.role,
      });
      if (roleError) {
        setError("Role Error: " + roleError.message);
        setLoading(false);
        return false;
      }

      setLoading(false);
      // Refetch users
      await fetchUsers();
      return true;
    },
    [fetchUsers]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, addUser, fetchUsers };
}

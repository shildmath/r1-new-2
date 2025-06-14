
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
};

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name:full_name, created_at, user_roles: user_roles(role)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const parsed: AdminUser[] = data.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.full_name || "",
        role: (u.user_roles && u.user_roles[0]?.role) || "",
        created_at: u.created_at,
      }));
      setUsers(parsed);
    }
    setLoading(false);
  };

  const addUser = async (info: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // 1. Create auth user
    const { data, error } = await supabase.auth.admin.createUser({
      email: info.email,
      password: info.password,
      email_confirm: true,
    });
    if (error || !data?.user) {
      return { success: false, error: error?.message || "Could not create auth user" };
    }
    const userId = data.user.id;

    // 2. Insert profile
    const { error: profileErr } = await supabase.from("profiles").insert({
      id: userId,
      email: info.email,
      full_name: info.name,
    });
    if (profileErr) return { success: false, error: profileErr.message };

    // 3. Insert role
    const { error: roleErr } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: info.role,
    });
    if (roleErr) return { success: false, error: roleErr.message };

    await fetchUsers();
    return { success: true };
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, addUser, fetchUsers };
};

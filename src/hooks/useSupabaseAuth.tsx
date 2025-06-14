
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

// Types for user session, profile, and roles
type SupaUser = Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"];
type AuthContextType = {
  user: SupaUser | null;
  session: any;
  isLoading: boolean;
  register: (name: string, email: string, password: string, role: "admin" | "closer") => Promise<{ success: boolean; message?: string; }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; }>;
  logout: () => void;
};

// Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auth listener and session initialization
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Register a new user and insert profile & role
  const register = async (
    name: string,
    email: string,
    password: string,
    role: "admin" | "closer"
  ) => {
    setIsLoading(true);

    // Split name for first/last (Supabase usually stores as full_name)
    const full_name = name;

    let redirectUrl = window.location.origin + "/auth"; // or main page after confirm
    try {
      // 1. Sign up (must include emailRedirectTo!)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (signUpError) {
        setIsLoading(false);
        return { success: false, message: signUpError.message };
      }

      // 2. Get user id from response (immediate for password, delayed for email confirmation)
      const userId = data.user?.id;
      if (!userId) {
        setIsLoading(false);
        return { success: false, message: "Check your email for confirmation!" };
      }

      // 3. Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email,
        full_name,
      });

      if (profileError) {
        setIsLoading(false);
        return { success: false, message: "Error creating profile: " + profileError.message };
      }

      // 4. Insert into user_roles table
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: userId,
        role,
      });

      if (roleError) {
        setIsLoading(false);
        return { success: false, message: "Error setting user role: " + roleError.message };
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "Unknown error" };
    }
  };

  // Login logic
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, message: "Invalid email or password" };
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "Unknown error" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider");
  return ctx;
};

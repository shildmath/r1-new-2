
import { createClient } from "@supabase/supabase-js";

// Replace these constants with your actual Supabase project URL and anon key:
const SUPABASE_URL = "https://ewrxfezpviximgyiovmv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cnhmZXpwdml4aW1neWlvdm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTgyODIsImV4cCI6MjA2NTQ3NDI4Mn0.m84AXDCp6D8LEJOLY5JKAAttwMtglWHmkKUhh3IdrRk";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: localStorage,
    },
  }
);

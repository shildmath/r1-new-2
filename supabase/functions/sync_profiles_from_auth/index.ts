
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
  throw new Error("Missing service role key or supabase url env");
}

serve(async (req) => {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    // Use service role to access Auth API
    const res = await fetch(`${SUPABASE_URL}/auth/v1/users`, {
      headers: { apiKey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
    });
    const authData = await res.json();
    const users = authData.users || [];

    // Now upsert missing users to profiles
    const profilesPayload = users.map((u: any) => ({
      id: u.id,
      email: u.email,
    }));

    // Bulk upsert into profiles
    const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: "POST",
      headers: {
        apiKey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(profilesPayload),
    });

    if (!upsertRes.ok) {
      const err = await upsertRes.text();
      return new Response(JSON.stringify({ error: `profiles upsert failed: ${err}` }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, syncedCount: users.length }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});

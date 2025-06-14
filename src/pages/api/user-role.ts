
import { supabase } from "@/integrations/supabase/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "No id" }), { status: 400 });
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", id)
    .maybeSingle();
  if (error || !data) return new Response(JSON.stringify({ error: error?.message || "No role" }), { status: 500 });
  return new Response(JSON.stringify({ role: data.role }), { status: 200 });
}

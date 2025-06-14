
import { supabase } from "@/integrations/supabase/client";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "No id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", id)
      .maybeSingle();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!data) {
      return new Response(JSON.stringify({ error: "No role found for user" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // send proper JSON header
    return new Response(JSON.stringify({ role: data.role }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

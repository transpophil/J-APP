/* deno-lint-ignore-file no-explicit-any */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Destination = { id: string; name: string; address: string };

function corsHeaders(origin?: string) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req.headers.get("origin") || undefined) });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders(req.headers.get("origin") || undefined) },
    });
  }

  const origin = req.headers.get("origin") || undefined;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  const passkey: string | undefined = body?.passkey;
  const destinations: Destination[] | undefined = body?.destinations;

  if (!passkey || !Array.isArray(destinations)) {
    return new Response(JSON.stringify({ error: "Missing passkey or destinations" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Verify admin passkey
  const { data: adminRow, error: adminErr } = await supabase
    .from("app_settings")
    .select("setting_value")
    .eq("setting_key", "admin_passkey")
    .maybeSingle();

  if (adminErr) {
    return new Response(JSON.stringify({ error: `Failed to read admin passkey: ${adminErr.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  if (!adminRow || adminRow.setting_value !== passkey) {
    return new Response(JSON.stringify({ error: "Unauthorized: invalid passkey" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  // Clean and validate destinations
  const cleaned: Destination[] = destinations
    .map((d) => ({
      id: String(d.id || "").trim() || crypto.randomUUID(),
      name: String(d.name || "").trim(),
      address: String(d.address || "").trim(),
    }))
    .filter((d) => d.name && d.address);

  const payload = JSON.stringify(cleaned);

  // Upsert destinations key
  const { error: upsertErr } = await supabase
    .from("app_settings")
    .upsert({ setting_key: "destinations", setting_value: payload }, { onConflict: "setting_key" });

  if (upsertErr) {
    return new Response(JSON.stringify({ error: `Failed to save: ${upsertErr.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
});
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, cookie } = body || {};

    // estrai info minimali dal cookie di CookieConsent
    const acceptType = cookie?.categories?.acceptType || cookie?.acceptType || 'custom';
    const categories = cookie?.categories || cookie?.acceptedCategories || {};

    // hash IP lato server (se vuoi registrarlo)
    const fwd = req.headers.get("x-forwarded-for") || "";
    const ip = fwd.split(",")[0]?.trim() || "";
    const ip_hash = ip ? crypto.createHash("sha256").update(ip).digest("hex") : null;
    const ua = req.headers.get("user-agent") || null;

    // Try to insert the consent log if Supabase is configured
    if (supabase) {
      const { error } = await supabase.from("cookie_consents").insert({
        event: event || 'unknown',
        accept_type: acceptType,
        categories: categories,
        ua,
        ip_hash
      });

      if (error) {
        console.error('Supabase consent log error:', error);
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Consent API error:', error);
    // Return success even if logging fails to not block the user
    return NextResponse.json({ ok: true });
  }
}
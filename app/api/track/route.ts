/**
 * Meta Conversions API (CAPI) — server-side event tracking
 *
 * Recebe POST do client com nome do evento + dados, e duplica pra Meta
 * via Conversions API. Permite trackear eventos mesmo quando o Pixel
 * client-side é bloqueado (iOS 14.5+, adblockers, Safari/Brave strict).
 *
 * Dedup com Pixel: usa `event_id` único — Meta deduplica automaticamente
 * quando o mesmo event_id chega via Pixel + CAPI.
 *
 * Endpoint: POST /api/track
 * Body: { event_name, event_id, value, currency, email?, phone?, source_url? }
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1536814544717090";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const META_API_VERSION = "v21.0";

interface TrackPayload {
  event_name: string;
  event_id?: string;
  value?: number;
  currency?: string;
  email?: string;
  phone?: string;
  source_url?: string;
  custom?: Record<string, unknown>;
  // Identificadores enviados do client pra maximizar EMQ
  external_id?: string;
  fbc?: string;
  fbp?: string;
}

function sha256(value: string): string {
  return createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

function getCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1];
}

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    console.error("[CAPI] META_CAPI_ACCESS_TOKEN não configurado");
    return NextResponse.json(
      { error: "CAPI not configured" },
      { status: 500 }
    );
  }

  let body: TrackPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.event_name) {
    return NextResponse.json(
      { error: "event_name required" },
      { status: 400 }
    );
  }

  // IP — fallback amplo pra cobrir todos os proxies Vercel/Cloudflare/etc.
  // Antes vinha vazio em ~50% dos eventos (Events Manager acusou) por causa
  // de rotas onde só `x-vercel-forwarded-for` ou `cf-connecting-ip` chegam.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  const cookieHeader = req.headers.get("cookie") || "";

  // fbp/fbc: prioriza payload do client (que pode ter sintetizado do fbclid),
  // cai pra cookie como fallback
  const fbp = body.fbp || getCookie(cookieHeader, "_fbp");
  const fbc = body.fbc || getCookie(cookieHeader, "_fbc");

  // User data (hasheado conforme exige a CAPI)
  const userData: Record<string, string | string[] | undefined> = {};

  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  if (body.external_id) {
    userData.external_id = [sha256(body.external_id)];
  }
  if (body.email) {
    userData.em = [sha256(body.email)];
  }
  if (body.phone) {
    // Remove tudo que não é dígito antes de hashear
    userData.ph = [sha256(body.phone.replace(/\D/g, ""))];
  }

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id, // dedup com Pixel
    // Fallback hardcoded é OBRIGATÓRIO. Meta bloqueia eventos com event_source_url
    // vazio em categorias com restrição. Antes ficava "" quando o client esquecia
    // de mandar e o Referer não vinha (Safari/iOS/Brave).
    event_source_url:
      body.source_url ||
      req.headers.get("referer") ||
      "https://casa-da-chita.vercel.app/",
    action_source: "website" as const,
    user_data: userData,
    custom_data: {
      currency: body.currency || "BRL",
      value: body.value ?? 0,
      content_name: "Faça Você Mesma 3.0",
      content_type: "product",
      ...body.custom,
    },
  };

  const url = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });

    const result = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      console.error("[CAPI] Meta returned error:", result);
      return NextResponse.json(
        { error: "Meta CAPI error", details: result },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      events_received: result.events_received,
      event_name: body.event_name,
    });
  } catch (err) {
    console.error("[CAPI] Exception:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}

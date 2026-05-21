/**
 * Webhook Cakto.
 *
 * Recebe POST do Cakto e delega pro handler do tipo do evento:
 * - purchase           → CAPI Purchase + fluxo de onboarding (4 mensagens em 30 dias)
 * - refund/chargeback  → CAPI Refund + cancela fluxos pendentes do contato
 * - pix_pending        → fluxo PIX (3 lembretes em 24h)
 * - payment_declined   → fluxo cartão recusado (1 mensagem)
 * - abandoned          → log (sem fluxo ainda)
 *
 * Endpoint: POST /api/cakto-webhook
 *
 * Validação: Cakto envia a chave secreta no campo `secret` do body.
 * Comparamos contra CAKTO_WEBHOOK_SECRET (env var) em constant-time.
 *
 * Idempotência: event_id baseado no orderId — Meta deduplica. Flow scheduler
 * usa hash(flow + step + phone) — não duplica jobs.
 */

import { NextRequest, NextResponse } from "next/server";
import { parseCaktoPayload, safeCompare } from "@/app/lib/cakto";
import {
  handlePurchase,
  handleRefund,
  handlePixPending,
  handlePaymentDeclined,
  handleAbandoned,
} from "@/app/lib/webhook-handlers";

const WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET;

// Health-check
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "cakto-webhook",
    pixel_id: process.env.META_PIXEL_ID || "1536814544717090",
    capi_configured: !!process.env.META_CAPI_ACCESS_TOKEN,
    secret_configured: !!WEBHOOK_SECRET,
    whatsapp_configured: !!process.env.WHATSAPP_ACCESS_TOKEN,
    resend_configured: !!process.env.RESEND_API_KEY,
    redis_configured: !!(
      process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
    ),
  });
}

export async function POST(req: NextRequest) {
  // Parse JSON
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validar secret
  if (WEBHOOK_SECRET) {
    const receivedSecret = String(payload.secret || "");
    if (!receivedSecret || !safeCompare(receivedSecret, WEBHOOK_SECRET)) {
      console.error("[CAKTO] Invalid secret");
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
  } else {
    console.warn(
      "[CAKTO] CAKTO_WEBHOOK_SECRET não configurado — webhook aceitando qualquer requisição"
    );
  }

  // Normalizar payload
  const n = parseCaktoPayload(payload);

  console.log(
    `[CAKTO] event="${n.rawEvent}" status="${n.rawStatus}" kind="${n.kind}" order=${n.orderId} value=${n.value}`
  );

  // Dispatch
  try {
    let result;
    switch (n.kind) {
      case "purchase":
        result = await handlePurchase(n);
        break;
      case "refund":
        result = await handleRefund(n);
        break;
      case "pix_pending":
        result = await handlePixPending(n);
        break;
      case "payment_declined":
        result = await handlePaymentDeclined(n);
        break;
      case "abandoned":
        result = await handleAbandoned(n);
        break;
      default:
        return NextResponse.json({
          ok: true,
          ignored: true,
          reason: `Unknown event kind`,
          rawEvent: n.rawEvent,
          rawStatus: n.rawStatus,
        });
    }

    return NextResponse.json({
      ...result,
      order_id: n.orderId,
    });
  } catch (err) {
    console.error("[CAKTO] Exception:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

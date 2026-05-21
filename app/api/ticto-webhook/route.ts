/**
 * Webhook Ticto.
 *
 * Recebe POST do Ticto e delega pro handler do tipo do evento:
 * - purchase           → CAPI Purchase + fluxo de onboarding (4 mensagens em 30 dias)
 * - refund/chargeback  → CAPI Refund + cancela fluxos pendentes do contato
 * - pix_pending        → fluxo PIX (3 lembretes em 24h)
 * - payment_declined   → fluxo cartão recusado (1 mensagem)
 * - abandoned          → log (sem fluxo ainda)
 *
 * Endpoint: POST /api/ticto-webhook
 *
 * Validação: Ticto envia a chave secreta no campo `token` do body
 * (Cakto chamava de `secret` — ver `cakto-webhook/route.ts`).
 * Comparamos contra TICTO_WEBHOOK_TOKEN (env var) em constant-time.
 *
 * Idempotência: event_id baseado no orderId (order.hash do Ticto) — Meta deduplica.
 * Flow scheduler usa hash(flow + step + phone) — não duplica jobs.
 *
 * Diferenças vs Cakto:
 * - Cakto: { event, secret, data: {...} }   → tipo do evento no campo `event`
 * - Ticto: { status, token, order, item, transaction, customer, ... } → tipo derivado de `status + payment_method`
 * - Valores monetários em CENTAVOS no Ticto (50000 = R$ 500,00) — `parseTictoPayload` já converte
 * - Ticto não envia fbc/fbp (Pixel/CAPI nativos da Ticto cuidam disso)
 */

import { NextRequest, NextResponse } from "next/server";
import { parseTictoPayload, safeCompare } from "@/app/lib/ticto";
import {
  handlePurchase,
  handleRefund,
  handlePixPending,
  handlePaymentDeclined,
  handleAbandoned,
} from "@/app/lib/webhook-handlers";

const WEBHOOK_TOKEN = process.env.TICTO_WEBHOOK_TOKEN;

// Health-check
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "ticto-webhook",
    pixel_id: process.env.META_PIXEL_ID || "1536814544717090",
    capi_configured: !!process.env.META_CAPI_ACCESS_TOKEN,
    token_configured: !!WEBHOOK_TOKEN,
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

  // Validar token
  if (WEBHOOK_TOKEN) {
    const receivedToken = String(payload.token || "");
    if (!receivedToken || !safeCompare(receivedToken, WEBHOOK_TOKEN)) {
      console.error("[TICTO] Invalid token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } else {
    console.warn(
      "[TICTO] TICTO_WEBHOOK_TOKEN não configurado — webhook aceitando qualquer requisição"
    );
  }

  // Normalizar payload
  const n = parseTictoPayload(payload);

  console.log(
    `[TICTO] status="${n.rawStatus}" method="${n.paymentMethod}" kind="${n.kind}" order=${n.orderId} value=${n.value}`
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
          rawStatus: n.rawStatus,
          paymentMethod: n.paymentMethod,
        });
    }

    return NextResponse.json({
      ...result,
      order_id: n.orderId,
    });
  } catch (err) {
    console.error("[TICTO] Exception:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

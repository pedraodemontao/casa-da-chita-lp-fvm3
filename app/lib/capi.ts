/**
 * Cliente Meta Conversions API (CAPI) — server-to-server.
 *
 * Funções:
 * - sendPurchase(normalized)       dispara Purchase event
 * - sendRefund(normalized)         dispara custom event RefundApproved
 *
 * Idempotência via event_id (Meta deduplica).
 */

import { sha256, type CaktoNormalized } from "./cakto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1536814544717090";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v21.0";

export type CapiResult = {
  ok: boolean;
  eventsReceived?: number;
  error?: unknown;
};

function buildUserData(n: CaktoNormalized): Record<string, string[] | string> {
  const userData: Record<string, string[] | string> = {};
  if (n.customer.email) userData.em = [sha256(n.customer.email)];
  if (n.customer.phone) userData.ph = [sha256(n.customer.phone)];
  if (n.customer.firstName) userData.fn = [sha256(n.customer.firstName)];
  if (n.customer.lastName) userData.ln = [sha256(n.customer.lastName)];
  if (n.customer.docNumber) userData.external_id = [sha256(n.customer.docNumber)];
  if (n.fbc) userData.fbc = n.fbc;
  if (n.fbp) userData.fbp = n.fbp;
  return userData;
}

async function sendEvent(opts: {
  eventName: string;
  eventIdPrefix: string;
  normalized: CaktoNormalized;
}): Promise<CapiResult> {
  if (!ACCESS_TOKEN) {
    return { ok: false, error: "META_CAPI_ACCESS_TOKEN não configurado" };
  }

  const event = {
    event_name: opts.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: `${opts.eventIdPrefix}-${opts.normalized.orderId}`,
    action_source: "website" as const,
    event_source_url: opts.normalized.checkoutUrl || "https://casa-da-chita.vercel.app/",
    user_data: buildUserData(opts.normalized),
    custom_data: {
      currency: "BRL",
      value: opts.normalized.value,
      content_name: opts.normalized.productName,
      content_type: "product",
      content_ids: [opts.normalized.productId],
      order_id: opts.normalized.orderId,
      payment_method: opts.normalized.paymentMethod,
      ...opts.normalized.utms,
    },
  };

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });

    const result = (await resp.json()) as { events_received?: number };

    if (!resp.ok) {
      console.error(`[CAPI] ${opts.eventName} error:`, result);
      return { ok: false, error: result };
    }

    console.log(
      `[CAPI] ${opts.eventName} tracked: ${opts.normalized.orderId} | R$ ${opts.normalized.value} | events_received: ${result.events_received}`
    );
    return { ok: true, eventsReceived: result.events_received };
  } catch (err) {
    console.error(`[CAPI] ${opts.eventName} exception:`, err);
    return { ok: false, error: err };
  }
}

export function sendPurchase(n: CaktoNormalized): Promise<CapiResult> {
  return sendEvent({ eventName: "Purchase", eventIdPrefix: "purchase", normalized: n });
}

export function sendRefund(n: CaktoNormalized): Promise<CapiResult> {
  return sendEvent({ eventName: "RefundApproved", eventIdPrefix: "refund", normalized: n });
}

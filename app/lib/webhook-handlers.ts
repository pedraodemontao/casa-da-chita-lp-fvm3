/**
 * Handlers de eventos Cakto.
 *
 * Cada handler:
 * 1. Trata o lado tracking (CAPI, se aplicável)
 * 2. Trata o lado de relacionamento (enqueueFlow correspondente)
 * 3. Retorna resumo do que aconteceu
 */

import { sendPurchase, sendRefund } from "./capi";
import { enqueueFlow, cancelContactFlows } from "./flow-scheduler";
import type { CaktoNormalized } from "./cakto";

export type HandlerResult = {
  ok: boolean;
  kind: string;
  capi?: { sent: boolean; eventsReceived?: number };
  flow?: { enqueued: number; skipped: number };
  cancelled?: number;
  note?: string;
};

/**
 * Opts:
 * - skipCapi=true → não dispara CAPI Purchase/Refund (Ticto faz nativo, evita dedup).
 *   Mantém todo o fluxo de email/WhatsApp de pós-compra/refund intacto.
 */
type HandleOpts = { skipCapi?: boolean };

export async function handlePurchase(
  n: CaktoNormalized,
  opts: HandleOpts = {}
): Promise<HandlerResult> {
  // 1. CAPI Purchase (skip se a plataforma de checkout já dispara nativamente)
  const capi = opts.skipCapi
    ? { ok: true, eventsReceived: 0 }
    : await sendPurchase(n);

  // 2. Fluxo de onboarding pós-compra
  const flow = await enqueueFlow({
    flow: "purchase_approved",
    contact: n.customer,
    vars: {
      member_area_url: n.memberAreaUrl || "",
      product_name: n.productName,
    },
  });

  return {
    ok: capi.ok,
    kind: "purchase",
    capi: { sent: !opts.skipCapi && capi.ok, eventsReceived: capi.eventsReceived },
    flow,
  };
}

export async function handleRefund(
  n: CaktoNormalized,
  opts: HandleOpts = {}
): Promise<HandlerResult> {
  // 1. CAPI RefundApproved (skip se plataforma cuida)
  const capi = opts.skipCapi
    ? { ok: true, eventsReceived: 0 }
    : await sendRefund(n);

  // 2. Cancela fluxos pendentes do contato
  const cancelled = await cancelContactFlows(n.customer.phone);

  return {
    ok: capi.ok,
    kind: "refund",
    capi: { sent: !opts.skipCapi && capi.ok, eventsReceived: capi.eventsReceived },
    cancelled,
  };
}

export async function handlePixPending(n: CaktoNormalized): Promise<HandlerResult> {
  // Só dispara fluxo PIX se payment_method for pix
  if (!n.paymentMethod.includes("pix")) {
    return { ok: true, kind: "pix_pending", note: "ignored: not a PIX payment" };
  }

  if (!n.pixUrl) {
    return { ok: true, kind: "pix_pending", note: "ignored: no pix_url in payload" };
  }

  const flow = await enqueueFlow({
    flow: "pix_pending",
    contact: n.customer,
    vars: {
      pix_url: n.pixUrl,
      checkout_url: n.checkoutUrl || "",
    },
  });

  return { ok: true, kind: "pix_pending", flow };
}

export async function handlePaymentDeclined(n: CaktoNormalized): Promise<HandlerResult> {
  const flow = await enqueueFlow({
    flow: "payment_declined",
    contact: n.customer,
    vars: {
      utm_campaign: "cartao_recusado",
    },
  });

  return { ok: true, kind: "payment_declined", flow };
}

export async function handleAbandoned(n: CaktoNormalized): Promise<HandlerResult> {
  // Por enquanto, abandono não tem fluxo definido (templates não submetidos).
  // Logamos e ignoramos. Quando tiver template aprovado, criar flow "abandoned" em flows.ts.
  console.log(
    `[handleAbandoned] checkout abandonado: ${n.customer.phone} (${n.customer.email})`
  );
  return { ok: true, kind: "abandoned", note: "no flow defined yet" };
}

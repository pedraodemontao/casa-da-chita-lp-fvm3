/**
 * Parsing e normalização do payload Cakto.
 *
 * Cakto envia webhooks em formato:
 *   { event: string, secret: string, data: {...} }
 *
 * Eventos mapeados (event names):
 * - purchase_approved / payment_approved / order.paid          → compra aprovada
 * - payment_refused / payment_declined                          → cartão recusado
 * - pix_pending / payment.pending / waiting_payment             → PIX gerado, aguardando
 * - refund_approved / chargeback                                → reembolso
 * - abandoned_cart / checkout_abandoned                         → carrinho abandonado
 */

import { createHash } from "crypto";

export type CaktoEventKind =
  | "purchase"
  | "refund"
  | "pix_pending"
  | "payment_declined"
  | "abandoned"
  | "unknown";

export type CaktoNormalized = {
  kind: CaktoEventKind;
  rawEvent: string;
  rawStatus: string;
  orderId: string;
  value: number;
  paymentMethod: string;
  customer: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    docNumber: string;
  };
  pixUrl?: string;
  checkoutUrl?: string;
  memberAreaUrl?: string;
  productName: string;
  productId: string;
  fbc?: string;
  fbp?: string;
  utms: Record<string, string>;
};

const PURCHASE_EVENTS = [
  "purchase_approved",
  "purchase.approved",
  "payment_approved",
  "payment.approved",
  "order.paid",
];
const PURCHASE_STATUSES = ["paid", "approved", "completed", "succeeded"];

const REFUND_EVENTS = ["refund_approved", "refund.approved", "chargeback"];

const PIX_PENDING_EVENTS = [
  "pix_pending",
  "pix.pending",
  "payment.pending",
  "waiting_payment",
];
const PIX_PENDING_STATUSES = ["pending", "waiting_payment", "waiting"];

const PAYMENT_DECLINED_EVENTS = [
  "payment_refused",
  "payment.refused",
  "payment_declined",
  "payment.declined",
  "refused",
];
const PAYMENT_DECLINED_STATUSES = ["refused", "declined", "failed"];

const ABANDONED_EVENTS = [
  "abandoned_cart",
  "checkout_abandoned",
  "abandoned_checkout",
];

function matchesAny(value: string, list: string[]): boolean {
  return list.some((e) => value.includes(e));
}

export function detectEventKind(rawEvent: string, rawStatus: string): CaktoEventKind {
  if (matchesAny(rawEvent, PURCHASE_EVENTS) || PURCHASE_STATUSES.includes(rawStatus)) {
    return "purchase";
  }
  if (matchesAny(rawEvent, REFUND_EVENTS)) return "refund";
  if (matchesAny(rawEvent, PIX_PENDING_EVENTS) || PIX_PENDING_STATUSES.includes(rawStatus)) {
    // Só conta como pix_pending se o payment_method for pix
    return "pix_pending";
  }
  if (
    matchesAny(rawEvent, PAYMENT_DECLINED_EVENTS) ||
    PAYMENT_DECLINED_STATUSES.includes(rawStatus)
  ) {
    return "payment_declined";
  }
  if (matchesAny(rawEvent, ABANDONED_EVENTS)) return "abandoned";
  return "unknown";
}

export function parseCaktoPayload(payload: Record<string, unknown>): CaktoNormalized {
  const data = (payload.data as Record<string, unknown>) || {};
  const rawEvent = String(payload.event || "").toLowerCase();
  const rawStatus = String(data.status || "").toLowerCase();

  const kind = detectEventKind(rawEvent, rawStatus);

  const value = Number(data.amount || data.baseAmount || 0);
  const orderId = String(data.id || data.refId || `cakto-${Date.now()}`);
  const paymentMethod = String(data.paymentMethod || "").toLowerCase();

  // Customer
  const customer = (data.customer as Record<string, unknown>) || {};
  const fullName = String(customer.name || "").trim();
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ").trim();

  // URLs
  const pixUrl = data.pixUrl ? String(data.pixUrl) : undefined;
  const checkoutUrl = data.checkoutUrl
    ? String(data.checkoutUrl)
    : "https://casa-da-chita.vercel.app/";
  const memberAreaUrl = data.memberAreaUrl
    ? String(data.memberAreaUrl)
    : process.env.MEMBER_AREA_URL;

  // Product
  const product = (data.product as Record<string, unknown>) || {};
  const productName = String(product.name || "Faça Você Mesma 3.0");
  const productId = String(product.id || "fvm3");

  // Tracking
  const fbc = data.fbc ? String(data.fbc) : undefined;
  const fbp = data.fbp ? String(data.fbp) : undefined;

  // UTMs
  const utms: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = data[key];
    if (v) utms[key] = String(v);
  }

  return {
    kind,
    rawEvent,
    rawStatus,
    orderId,
    value,
    paymentMethod,
    customer: {
      name: fullName,
      firstName: firstName || fullName,
      lastName,
      email: String(customer.email || ""),
      phone: String(customer.phone || "").replace(/\D/g, ""),
      docNumber: String(customer.docNumber || "").replace(/\D/g, ""),
    },
    pixUrl,
    checkoutUrl,
    memberAreaUrl,
    productName,
    productId,
    fbc,
    fbp,
    utms,
  };
}

export function sha256(value: string): string {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

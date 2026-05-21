/**
 * Parsing e normalização do payload Ticto.
 *
 * Ticto envia o MESMO formato pra todos os eventos e diferencia pelo `status`:
 * - waiting_payment + pix         → pix_pending
 * - waiting_payment + bank_slip   → ignored (sem fluxo de boleto)
 * - waiting_payment + credit_card → ignored (cartão processa imediato)
 * - authorized / paid / approved  → purchase
 * - refused / declined            → payment_declined
 * - refunded                      → refund
 * - chargedback                   → refund
 *
 * Valores monetários vêm em CENTAVOS (50000 = R$ 500,00).
 * Secret de autenticação vem no campo `token`.
 *
 * Retorna o mesmo `CaktoNormalized` (renomeado pra Normalized) pra compatibilidade
 * com os handlers e CAPI existentes.
 */

import { type CaktoNormalized, sha256, safeCompare } from "./cakto";

export type Normalized = CaktoNormalized;
export { sha256, safeCompare };

type TictoPhone = {
  ddd?: string;
  ddi?: string;
  number?: string;
};

type TictoCustomer = {
  name?: string;
  email?: string;
  cpf?: string | null;
  cnpj?: string | null;
  phone?: TictoPhone;
};

type TictoOrder = {
  hash?: string;
  paid_amount?: number;
  installments?: number;
};

type TictoItem = {
  product_name?: string;
  product_id?: number | string;
  offer_name?: string;
  amount?: number;
};

type TictoTransaction = {
  bank_slip_url?: string;
  pix_url?: string;
  pix_qr_code?: string;
};

type TictoPayload = {
  status?: string;
  payment_method?: string;
  url_params?: { query_params?: Record<string, string> };
  order?: TictoOrder;
  item?: TictoItem;
  transaction?: TictoTransaction;
  customer?: TictoCustomer;
  token?: string;
};

const PURCHASE_STATUSES = ["authorized", "paid", "approved", "completed", "succeeded"];
const REFUND_STATUSES = ["refunded", "refund_approved"];
const CHARGEBACK_STATUSES = ["chargedback", "chargeback"];
const PENDING_STATUSES = ["waiting_payment", "pending"];
const DECLINED_STATUSES = ["refused", "declined", "failed"];
const ABANDONED_STATUSES = ["abandoned", "abandoned_cart"];

export type TictoEventKind = CaktoNormalized["kind"];

export function detectTictoEventKind(
  status: string,
  paymentMethod: string
): TictoEventKind {
  if (PURCHASE_STATUSES.includes(status)) return "purchase";
  if (REFUND_STATUSES.includes(status) || CHARGEBACK_STATUSES.includes(status))
    return "refund";
  if (PENDING_STATUSES.includes(status)) {
    // Só dispara fluxo PIX se for PIX; boleto/cartão pending ignoramos
    return paymentMethod === "pix" ? "pix_pending" : "unknown";
  }
  if (DECLINED_STATUSES.includes(status)) return "payment_declined";
  if (ABANDONED_STATUSES.includes(status)) return "abandoned";
  return "unknown";
}

function normalizePhone(phone: TictoPhone | undefined): string {
  if (!phone) return "";
  // Junta ddi+ddd+number, remove tudo que não é dígito, descarta + inicial
  const ddi = (phone.ddi || "").replace(/\D/g, "");
  const ddd = (phone.ddd || "").replace(/\D/g, "");
  const number = (phone.number || "").replace(/\D/g, "");
  // Default Brasil se ddi vazio
  const country = ddi || "55";
  return `${country}${ddd}${number}`.replace(/\D/g, "");
}

export function parseTictoPayload(payload: Record<string, unknown>): Normalized {
  const p = payload as TictoPayload;

  const rawStatus = String(p.status || "").toLowerCase();
  const paymentMethod = String(p.payment_method || "").toLowerCase();
  const kind = detectTictoEventKind(rawStatus, paymentMethod);

  // Valor em centavos (Ticto) → reais
  const amountCents = Number(p.order?.paid_amount ?? p.item?.amount ?? 0);
  const value = amountCents / 100;

  const orderId = String(p.order?.hash || `ticto-${Date.now()}`);

  // Customer
  const customer = p.customer || {};
  const fullName = String(customer.name || "").trim();
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ").trim();
  const docNumber = String(customer.cpf || customer.cnpj || "").replace(/\D/g, "");

  // URLs
  const pixUrl = p.transaction?.pix_url;
  const bankSlipUrl = p.transaction?.bank_slip_url;
  // checkout_url do Ticto vem do query param "code"; usamos a LP como fonte do evento
  const checkoutUrl = "https://casa-da-chita.vercel.app/";
  const memberAreaUrl = process.env.MEMBER_AREA_URL || "";

  // Product
  const productName = String(p.item?.product_name || "Faça Você Mesma 3.0");
  const productId = String(p.item?.product_id || "fvm3");

  // UTMs: Ticto guarda em url_params.query_params (qualquer chave começando com utm_)
  const utms: Record<string, string> = {};
  const queryParams = p.url_params?.query_params || {};
  for (const [key, val] of Object.entries(queryParams)) {
    if (key.startsWith("utm_") && val) utms[key] = String(val);
  }

  return {
    kind,
    rawEvent: rawStatus, // Ticto não tem campo event separado
    rawStatus,
    orderId,
    value,
    paymentMethod,
    customer: {
      name: fullName,
      firstName: firstName || fullName,
      lastName,
      email: String(customer.email || ""),
      phone: normalizePhone(customer.phone),
      docNumber,
    },
    pixUrl: pixUrl || bankSlipUrl,
    checkoutUrl,
    memberAreaUrl,
    productName,
    productId,
    // Ticto não envia fbc/fbp no webhook — Pixel/CAPI nativos da Ticto cuidam disso.
    fbc: undefined,
    fbp: undefined,
    utms,
  };
}

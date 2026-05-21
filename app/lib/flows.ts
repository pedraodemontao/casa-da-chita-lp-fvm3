/**
 * Definição declarativa dos fluxos de mensagens.
 *
 * Cada fluxo é uma sequência de steps. Quando um evento Cakto dispara
 * `enqueueFlow(flowName, contact, vars)`, todos os steps são agendados
 * com seus delays a partir do `now`.
 *
 * Templates referenciados aqui devem existir aprovados no Meta —
 * vide `Setup-Whatsapp/templates-meta.md`.
 */

import { renderEmailTemplate } from "./email";

export type ChannelKind = "whatsapp" | "email";

export type WhatsAppStep = {
  channel: "whatsapp";
  template: string;
  /** quais campos do contact/vars vão como params {{1}}, {{2}}... */
  paramsFrom: string[];
  /** opcional: campo do contact/vars cujo valor vai como parâmetro da URL do botão.
   * Meta exige URL base FIXA na definição do template — só o {{1}} da URL é variável.
   * Ex: template tem url="https://pay.cakto.com.br/{{1}}" e aqui passamos apenas o ID. */
  buttonUrlFrom?: string;
  /** opcional: transforma o valor antes de mandar (ex: extrair ID de URL completa). */
  buttonUrlTransform?: (raw: string) => string;
};

export type EmailStep = {
  channel: "email";
  subject: string;
  /** Função que recebe o contact + vars e devolve o HTML do body (sem o envelope da marca) */
  renderBody: (ctx: FlowContext) => string;
  signature?: string;
};

export type FlowStep = (WhatsAppStep | EmailStep) & {
  /** Nome curto pra log e idempotência. */
  name: string;
  /** Delay em milissegundos a partir do enqueue. */
  delayMs: number;
};

export type FlowContext = {
  contact: {
    name?: string;
    firstName?: string;
    email?: string;
    phone?: string;
    docNumber?: string;
  };
  vars: Record<string, string>;
};

// ============================================================
// Definição dos fluxos
// ============================================================

const ONE_MIN = 60 * 1000;
const ONE_HOUR = 60 * ONE_MIN;
const ONE_DAY = 24 * ONE_HOUR;

// Extrai apenas o trailing path do Cakto: "https://pay.cakto.com.br/XYZ" → "XYZ"
const extractCaktoId = (url: string): string =>
  url.replace(/^https?:\/\/pay\.cakto\.com\.br\//, "");

// Extrai trailing path do member-area: "https://clubecasinhadachi.astronmembers.com/X" → "X"
// Se URL termina sem path, devolve "login" (var não pode ser vazia).
const extractMemberAreaPath = (url: string): string => {
  const path = url.replace(/^https?:\/\/clubecasinhadachi\.astronmembers\.com\//, "");
  return path || "login";
};

export const FLOWS: Record<string, FlowStep[]> = {
  // ─── PIX gerado, ainda não pago ──────────────────────────
  // Template tem url = "https://pay.cakto.com.br/{{1}}" — passamos só o ID.
  pix_pending: [
    {
      name: "pix_lembrete_30min",
      channel: "whatsapp",
      template: "pix_lembrete_30min",
      paramsFrom: ["firstName"],
      buttonUrlFrom: "pix_url",
      buttonUrlTransform: extractCaktoId,
      delayMs: 30 * ONE_MIN,
    },
    {
      name: "pix_lembrete_6h",
      channel: "whatsapp",
      template: "pedido_pix_pendente", // Meta reclassificou v1 como MARKETING; v2 transacional aprovou como UTILITY
      paramsFrom: ["firstName"],
      buttonUrlFrom: "pix_url",
      buttonUrlTransform: extractCaktoId,
      delayMs: 6 * ONE_HOUR,
    },
    {
      name: "pix_lembrete_final",
      channel: "whatsapp",
      template: "pix_lembrete_final",
      paramsFrom: ["firstName"],
      buttonUrlFrom: "pix_url",
      buttonUrlTransform: extractCaktoId,
      delayMs: 18 * ONE_HOUR,
    },
  ],

  // ─── Cartão recusado ─────────────────────────────────────
  // Template tem url = "https://lp-fvm-3.vercel.app/?utm_campaign={{1}}"
  payment_declined: [
    {
      name: "cartao_recusado_ajuda",
      channel: "whatsapp",
      template: "cartao_recusado_ajuda",
      paramsFrom: ["firstName"],
      buttonUrlFrom: "utm_campaign",
      delayMs: 5 * ONE_MIN,
    },
  ],

  // ─── Compra aprovada (onboarding) ────────────────────────
  // Template tem url = "https://clubecasinhadachi.astronmembers.com/{{1}}"
  purchase_approved: [
    {
      name: "compra_boas_vindas",
      channel: "whatsapp",
      template: "pedido_confirmado", // Meta reclassificou v1 como MARKETING; v2 transacional aprovou como UTILITY
      paramsFrom: ["firstName"],
      buttonUrlFrom: "member_area_url",
      buttonUrlTransform: extractMemberAreaPath,
      delayMs: 0, // imediato
    },
    {
      name: "email_boas_vindas",
      channel: "email",
      subject: "Sua vaga no Faça Você Mesma 3.0 tá garantida 🧵",
      delayMs: 2 * ONE_MIN, // 2min depois (dá tempo do WhatsApp chegar primeiro)
      signature: "— Jacira, da Casa da Chita",
      renderBody: (ctx) => `
        <p style="font-size: 18px;">Oi, ${ctx.contact.firstName || "linda"} 🧡</p>

        <p>Sua compra do <strong>Faça Você Mesma 3.0</strong> tá confirmada. Você é uma de nós agora.</p>

        <p>Pra começar, é só clicar no botão abaixo. Seu acesso é vitalício — pode entrar e sair quantas vezes quiser.</p>

        <p style="font-style: italic; color: #323C7F;">Em 7 noites a gente termina sua primeira bolsa. Não tem mistério, linda. Eu te acompanho passo a passo.</p>
      `,
    },
    {
      name: "acesso_lembrete_72h",
      channel: "whatsapp",
      template: "acesso_pendente", // Meta reclassificou v1 como MARKETING; v2 transacional aprovou como UTILITY
      paramsFrom: ["firstName"],
      buttonUrlFrom: "member_area_url",
      buttonUrlTransform: extractMemberAreaPath,
      delayMs: 72 * ONE_HOUR,
    },
    {
      name: "pesquisa_calor_7d",
      channel: "whatsapp",
      template: "pesquisa_calor_7d",
      paramsFrom: ["firstName"],
      delayMs: 7 * ONE_DAY,
    },
    // pedido_ugc_30d (Marketing, opcional) — submeter quando quiser ativar
  ],
};

/**
 * Resolve params do template a partir do FlowContext.
 */
export function resolveParams(step: WhatsAppStep, ctx: FlowContext): string[] {
  return step.paramsFrom.map((key) => {
    const val =
      (ctx.contact as Record<string, string | undefined>)[key] ??
      ctx.vars[key] ??
      "";
    return val;
  });
}

export function resolveButtonUrl(step: WhatsAppStep, ctx: FlowContext): string | undefined {
  if (!step.buttonUrlFrom) return undefined;
  const raw =
    (ctx.contact as Record<string, string | undefined>)[step.buttonUrlFrom] ??
    ctx.vars[step.buttonUrlFrom];
  if (!raw) return undefined;
  return step.buttonUrlTransform ? step.buttonUrlTransform(raw) : raw;
}

/**
 * Renderiza HTML completo (com envelope da marca) pra um EmailStep.
 */
export function renderEmail(step: EmailStep, ctx: FlowContext): string {
  return renderEmailTemplate({
    body: step.renderBody(ctx),
    signature: step.signature,
  });
}

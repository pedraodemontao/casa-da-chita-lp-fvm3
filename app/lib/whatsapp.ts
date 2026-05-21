/**
 * Cliente WhatsApp Cloud API (Meta Graph API).
 *
 * Documentação: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
 *
 * Env vars (vide .env.example):
 * - WHATSAPP_PHONE_NUMBER_ID
 * - WHATSAPP_BUSINESS_ACCOUNT_ID
 * - WHATSAPP_ACCESS_TOKEN
 * - WHATSAPP_API_VERSION (default v21.0)
 *
 * Templates devem estar APROVADOS no Meta Business Suite antes de uso.
 * Catálogo de templates: Setup-Whatsapp/templates-meta.md
 */

const API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export type WhatsAppSendResult = {
  ok: boolean;
  messageId?: string;
  error?: string;
  rawResponse?: unknown;
};

/**
 * Normaliza telefone pro formato E.164 esperado pela Meta (sem +, só dígitos).
 * BR: prefixa 55 se não tiver, remove tudo que não for dígito.
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Já tem código do país (55)
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }
  // 11 dígitos (DDD + 9 + número) ou 10 (DDD + número fixo)
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  // Outros formatos — devolve como veio (chamador valida)
  return digits;
}

/**
 * Envia mensagem usando template aprovado.
 *
 * @param templateName  nome do template (snake_case, conforme aprovado no Meta)
 * @param to            telefone do destinatário (qualquer formato — será normalizado)
 * @param params        array de strings que substituirão {{1}}, {{2}}, ... no template
 * @param language      código BCP-47 do idioma (default pt_BR)
 * @param buttonUrl     opcional: URL dinâmica pro botão CTA (quando o template tem URL var)
 */
export async function sendTemplate(opts: {
  templateName: string;
  to: string;
  params?: string[];
  language?: string;
  buttonUrl?: string;
}): Promise<WhatsAppSendResult> {
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    return {
      ok: false,
      error:
        "WhatsApp não configurado (faltam WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_ACCESS_TOKEN)",
    };
  }

  const phone = normalizePhone(opts.to);
  if (phone.length < 12) {
    return { ok: false, error: `Telefone inválido após normalização: ${phone}` };
  }

  // Monta components do template
  const components: Array<Record<string, unknown>> = [];

  if (opts.params && opts.params.length > 0) {
    components.push({
      type: "body",
      parameters: opts.params.map((text) => ({ type: "text", text })),
    });
  }

  if (opts.buttonUrl) {
    components.push({
      type: "button",
      sub_type: "url",
      index: "0",
      parameters: [{ type: "text", text: opts.buttonUrl }],
    });
  }

  const payload = {
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: opts.templateName,
      language: { code: opts.language || "pt_BR" },
      components,
    },
  };

  const url = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await resp.json();

    if (!resp.ok) {
      const errMsg =
        (result as { error?: { message?: string } })?.error?.message ||
        `HTTP ${resp.status}`;
      console.error(`[WhatsApp] ${opts.templateName} → ${phone} failed:`, result);
      return { ok: false, error: errMsg, rawResponse: result };
    }

    const messageId = (
      result as { messages?: Array<{ id?: string }> }
    )?.messages?.[0]?.id;

    console.log(
      `[WhatsApp] ${opts.templateName} → ${phone} sent: ${messageId}`
    );

    return { ok: true, messageId, rawResponse: result };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[WhatsApp] ${opts.templateName} → ${phone} exception:`, msg);
    return { ok: false, error: msg };
  }
}

/**
 * Envia mensagem de texto livre (free-form).
 * Só funciona DENTRO da janela de 24h após o lead mandar mensagem pro número.
 * Pra disparo proativo, use sendTemplate().
 */
export async function sendText(to: string, body: string): Promise<WhatsAppSendResult> {
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    return { ok: false, error: "WhatsApp não configurado" };
  }

  const phone = normalizePhone(to);

  const url = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body, preview_url: true },
      }),
    });

    const result = await resp.json();

    if (!resp.ok) {
      return {
        ok: false,
        error:
          (result as { error?: { message?: string } })?.error?.message ||
          `HTTP ${resp.status}`,
        rawResponse: result,
      };
    }

    return {
      ok: true,
      messageId: (result as { messages?: Array<{ id?: string }> })?.messages?.[0]?.id,
      rawResponse: result,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}

/**
 * Cliente de e-mail (Resend).
 *
 * Docs: https://resend.com/docs
 *
 * Env vars:
 * - RESEND_API_KEY
 * - EMAIL_FROM       (ex: "Jacira <jacira@casadachita.com.br>")
 * - EMAIL_REPLY_TO   (opcional)
 *
 * Pra usar: domínio precisa estar verificado no Resend com DKIM/SPF/DMARC.
 */

import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "Jacira <jacira@casadachita.com.br>";
const REPLY_TO = process.env.EMAIL_REPLY_TO;

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

export type EmailSendResult = {
  ok: boolean;
  messageId?: string;
  error?: string;
};

/**
 * Envia e-mail transacional.
 * HTML é renderizado pelo Resend. Plain-text opcional (fallback de clientes sem HTML).
 */
export async function send(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, error: "Resend não configurado (falta RESEND_API_KEY)" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: opts.from || FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo || REPLY_TO,
    });

    if (error) {
      console.error(`[Email] send failed:`, error);
      return { ok: false, error: error.message };
    }

    console.log(`[Email] sent to ${opts.to}: ${data?.id}`);
    return { ok: true, messageId: data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Email] exception:`, msg);
    return { ok: false, error: msg };
  }
}

/**
 * Renderiza template padrão da marca (creme + serif).
 * Use pra envelopar conteúdo simples e manter identidade visual.
 *
 * Tokens da marca em `docs/tokens.json`. Hard-code aqui porque
 * e-mail HTML não acessa CSS externo — tem que ser inline.
 */
export function renderEmailTemplate(opts: {
  preheader?: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  signature?: string;
}): string {
  const COLOR_CREME = "#EBD6C2";
  const COLOR_AZUL = "#323C7F";
  const COLOR_VERMELHO = "#CC1E15";
  const COLOR_MOSTARDA = "#E2D030";
  const COLOR_TINTA = "#1A1A1A";

  const cta = opts.ctaText && opts.ctaUrl
    ? `
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 24px auto;">
        <tr>
          <td style="background: ${COLOR_VERMELHO}; padding: 16px 32px; border-radius: 3px;">
            <a href="${opts.ctaUrl}" style="color: ${COLOR_CREME}; font-family: 'DM Serif Display', Georgia, serif; font-size: 18px; text-decoration: none; font-weight: 400;">
              ${opts.ctaText} →
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Casa da Chita</title>
</head>
<body style="margin: 0; padding: 0; background: ${COLOR_CREME}; font-family: Georgia, 'Times New Roman', serif; color: ${COLOR_TINTA};">
  ${opts.preheader ? `<div style="display:none; max-height:0; overflow:hidden;">${opts.preheader}</div>` : ""}

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: ${COLOR_CREME};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background: ${COLOR_CREME};">

          <!-- Header com tagline -->
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <div style="font-family: 'DM Serif Display', Georgia, serif; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase; color: ${COLOR_AZUL};">
                Casa da Chita
              </div>
              <div style="height: 1px; background: ${COLOR_MOSTARDA}; margin: 12px auto; width: 60px;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="font-size: 16px; line-height: 1.6; color: ${COLOR_TINTA}; padding: 0 16px;">
              ${opts.body}
              ${cta}
            </td>
          </tr>

          <!-- Signature -->
          ${opts.signature ? `
          <tr>
            <td style="padding: 32px 16px 0 16px; font-style: italic; color: ${COLOR_AZUL}; font-family: 'DM Serif Display', Georgia, serif; font-size: 18px;">
              ${opts.signature}
            </td>
          </tr>` : ""}

          <!-- Footer -->
          <tr>
            <td style="padding-top: 48px; text-align: center;">
              <div style="height: 1px; background: ${COLOR_MOSTARDA}; margin: 0 auto 16px; width: 60px;"></div>
              <div style="font-style: italic; color: ${COLOR_AZUL}; font-size: 16px; font-family: Georgia, serif;">
                feito com linha e amor ♡
              </div>
              <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: ${COLOR_AZUL}; opacity: 0.7; margin-top: 12px;">
                Casa da Chita · Ouro Preto / MG · @casadachita
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

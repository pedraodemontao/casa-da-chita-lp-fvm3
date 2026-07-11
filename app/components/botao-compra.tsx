"use client";

import { Secao, Manuscrita } from "./marca";

// Link de pagamento oficial — Faça Você Mesma 3.0 (Hotmart — teste de conversão, 11/06/2026)
export const CHECKOUT_URL = "https://pay.hotmart.com/U101396524P?checkoutMode=10&bid=1781151189988";
// Cakto (reverter trocando o de cima por este — Pix com conversão baixa em 11/06):
// export const CHECKOUT_URL = "https://pay.cakto.com.br/39ehrhm_882751";
// Teste Ticto:
// export const CHECKOUT_URL = "https://checkout.ticto.app/O50141A17";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Dispara InitiateCheckout no Pixel + CAPI com o MESMO event_id (Meta deduplica),
 * e empurra o evento pro dataLayer (GTM plug-and-play).
 * keepalive garante que o POST do CAPI sobrevive ao redirect pro checkout.
 * Tracking nunca pode bloquear a compra — fire-and-forget dentro de try/catch.
 */
function trackInitiateCheckout(value: number) {
  if (typeof window === "undefined") return;
  const eventId = `ic-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const content_name = "Faça Você Mesma 3.0";

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };

  if (typeof w.fbq === "function") {
    w.fbq(
      "track",
      "InitiateCheckout",
      { value, currency: "BRL", content_name },
      { eventID: eventId }
    );
  }

  // GTM: evento no dataLayer (dispara mesmo antes do container existir; fica na fila).
  (w.dataLayer = w.dataLayer || []).push({
    event: "initiate_checkout",
    value,
    currency: "BRL",
    content_name,
    event_id: eventId,
  });

  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_name: "InitiateCheckout",
        event_id: eventId,
        value,
        currency: "BRL",
        source_url: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        custom: { content_name },
      }),
    }).catch(() => {});
  } catch {
    /* silencioso — tracking nunca bloqueia a compra */
  }
}

/**
 * Redireciona pro checkout preservando os UTMs/fbclid da URL atual
 * e disparando InitiateCheckout (Pixel + CAPI deduplicados) antes do redirect.
 */
export function goToCheckout(value: number = 127.00) {
  if (typeof window === "undefined") return;

  trackInitiateCheckout(value);

  const params = new URLSearchParams(window.location.search);
  const sep = CHECKOUT_URL.includes("?") ? "&" : "?";
  const targetUrl = `${CHECKOUT_URL}${
    params.toString() ? sep + params.toString() : ""
  }`;

  window.location.href = targetUrl;
}

/**
 * Botão de compra reutilizável.
 *
 * `acao="oferta"` (padrão) → âncora suave pro card de oferta na própria página.
 * `acao="checkout"` → vai direto pro link de pagamento + dispara tracking.
 */
export default function BotaoCompra({
  texto = "Quero fazer minha primeira bolsa",
  acao = "oferta",
  classe = "cta-primary cta-pulse-soft",
  value = 127.00,
}: {
  texto?: string;
  acao?: "oferta" | "checkout";
  classe?: string;
  value?: number;
}) {
  if (acao === "oferta") {
    return (
      <a href="#oferta" data-event="cta_scroll_oferta" className={`cta-secundaria ${classe}`}>
        {texto} →
      </a>
    );
  }
  return (
    <button
      data-event="initiate_checkout"
      onClick={() => goToCheckout(value)}
      className={`cta-principal ${classe}`}
    >
      {texto} →
    </button>
  );
}

/**
 * Seção CTA compacta — pra usar entre seções de conteúdo.
 */
export function SecaoCTACompacta({
  texto = "Quero fazer minha primeira bolsa",
  manuscrita,
  acao = "oferta",
  fundo = "creme",
}: {
  texto?: string;
  manuscrita?: string;
  acao?: "oferta" | "checkout";
  fundo?: "creme" | "creme-claro" | "paper" | "paper-claro";
}) {
  return (
    <Secao
      fundo={fundo}
      padding="nenhum"
      largura="full"
      className="py-12 md:py-16"
      innerClassName="max-w-3xl text-center"
    >
      <BotaoCompra texto={texto} acao={acao} />
      {manuscrita && (
        <Manuscrita tamanho="md" cor="vermelho-chita" display="block" className="md:text-3xl mt-5">
          {manuscrita}
        </Manuscrita>
      )}
    </Secao>
  );
}

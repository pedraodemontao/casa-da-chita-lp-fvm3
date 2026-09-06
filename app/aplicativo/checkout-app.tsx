"use client";

import { OFERTA } from "./oferta.config";

/**
 * Checkout da oferta do aplicativo. Mesma mecânica de tracking da LP do FVM (botao-compra.tsx):
 * evento no dataLayer (GTM é o dono do Pixel) + CAPI própria em /api/track com o MESMO event_id.
 * Tracking nunca bloqueia a compra.
 */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

function trackInitiateCheckout(value: number) {
  if (typeof window === "undefined") return;
  const eventId = `ic-app-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const content_name = OFERTA.nomeCampanha;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer = w.dataLayer || []).push({ event: "initiate_checkout", value, currency: "BRL", content_name, event_id: eventId });
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
    /* silencioso */
  }
}

/** Vai pro checkout preservando UTMs/fbclid. Sem link configurado, rola pra oferta (o card avisa). */
export function goToCheckoutApp() {
  if (typeof window === "undefined") return;
  if (!OFERTA.checkoutUrl) {
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  trackInitiateCheckout(OFERTA.preco);
  const params = new URLSearchParams(window.location.search);
  const sep = OFERTA.checkoutUrl.includes("?") ? "&" : "?";
  window.location.href = `${OFERTA.checkoutUrl}${params.toString() ? sep + params.toString() : ""}`;
}

export function BotaoCheckoutApp({ children = "Quero a Casa da Chita no meu celular", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <button
      id="btn-checkout-app"
      data-event="initiate_checkout"
      onClick={goToCheckoutApp}
      className={`cta-primary cta-pulse-soft cta-principal ${className}`.trim()}
    >
      {children} <span aria-hidden>→</span>
    </button>
  );
}

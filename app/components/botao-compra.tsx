"use client";

import { Secao, Manuscrita } from "./marca";

// Link de pagamento oficial — Faça Você Mesma 3.0 (Hotmart — teste de conversão, 11/06/2026)
export const CHECKOUT_URL = "https://pay.hotmart.com/U101396524P?checkoutMode=10&bid=1781151189988";
// Cakto (reverter trocando o de cima por este — Pix com conversão baixa em 11/06):
// export const CHECKOUT_URL = "https://pay.cakto.com.br/39ehrhm_882751";
// Teste Ticto:
// export const CHECKOUT_URL = "https://checkout.ticto.app/O50141A17";

/**
 * Redireciona pro checkout do Cakto preservando os UTMs da URL atual.
 * Sem tracking client-side — Pixel/CAPI ficam por conta da plataforma de checkout.
 */
export function goToCheckout(_value: number = 127.00) {
  if (typeof window === "undefined") return;

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
      <a href="#oferta" className={classe}>
        {texto} →
      </a>
    );
  }
  return (
    <button onClick={() => goToCheckout(value)} className={classe}>
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

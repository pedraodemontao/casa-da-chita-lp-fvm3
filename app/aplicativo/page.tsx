import Script from "next/script";
import Jacira from "@/app/components/jacira";
import ProvasSociais from "@/app/components/provas-sociais";
import SmoothAnchors from "@/app/components/smooth-anchors";
import { DivisorCostura } from "@/app/components/decorations/divisor";
import { TickerApp } from "./secoes/ticker-app";
import { Hero } from "./secoes/hero";
import { Travou } from "./secoes/travou";
import { Mecanismo } from "./secoes/mecanismo";
import { Dentro } from "./secoes/dentro";
import { ComoFunciona } from "./secoes/como-funciona";
import { PraQuemApp } from "./secoes/pra-quem";
import { OfertaApp } from "./secoes/oferta-app";
import { GarantiaApp } from "./secoes/garantia-app";
import { Confianca } from "./secoes/confianca";
import { FaqApp } from "./secoes/faq-app";
import { FinalApp } from "./secoes/final-app";

/* ───────────────────────────────────────────────────────────────
   LP — "Casa da Chita no seu celular" (FVM 3.0 + 35 Pontos + aplicativo)
   Ordem (anatomia-lp.md, adaptada): ticker → hero → dor/virada → mecanismo (Cores da Chita)
   → o que vem (3 pilares + ferramentas) → como funciona → Jacira → provas reais → pra quem
   → oferta → garantia → confiança → FAQ → final → footer.
   Tracking: mesmo GTM server-side da LP do FVM (track.casadachita.com) + CAPI em /api/track.
   ─────────────────────────────────────────────────────────────── */

export default function AplicativoPage() {
  return (
    <main className="bg-paper text-tinta">
      <Script
        id="gtm-casadachita-app"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://track.casadachita.com/9blkytsbd.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','6hqf8m9=DQZOMy0mQVc0KiEzIVleRBJfQVpITQgMWQESBxgPDQEMCwcVVwgDDw%3D%3D');`,
        }}
      />
      <noscript>
        <iframe
          src="https://track.casadachita.com/ns.html?6hqf8m9=DQZOMy0mQVc0KiEzIVleRBJfQVpITQgMWQESBxgPDQEMCwcVVwgDDw%3D%3D"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
      <SmoothAnchors />
      <TickerApp />
      <Hero />
      <Travou />
      <Mecanismo />
      <DivisorCostura />
      <Dentro />
      <ComoFunciona />
      <Jacira />
      <ProvasSociais />
      <PraQuemApp />
      <DivisorCostura />
      <OfertaApp />
      <GarantiaApp />
      <Confianca />
      <FaqApp />
      <FinalApp />
      <footer className="bg-azul-royal py-10 text-center text-creme bg-papel-amassado" style={{ backgroundColor: "var(--color-azul-royal)" }}>
        <p className="font-serif text-2xl italic text-creme">
          feito com linha e amor <span className="text-mostarda">♡</span>
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-creme/70">Casa da Chita · Ouro Preto / MG · @casadachita</p>
      </footer>
    </main>
  );
}

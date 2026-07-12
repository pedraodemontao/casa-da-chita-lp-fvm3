import dynamic from "next/dynamic";
import Script from "next/script";
import Hero from "./components/hero";
import Jacira from "./components/jacira";
import GaleriaBolsas from "./components/galeria-bolsas";
import MetodoPorDias from "./components/metodo-por-dias";
import TudoIncluso from "./components/tudo-incluso";
import PontosEssenciais from "./components/pontos-essenciais";
import ProvasSociais from "./components/provas-sociais";
import PraQuem from "./components/pra-quem";
import Bonus from "./components/bonus";
import Oferta from "./components/oferta";
import Garantia from "./components/garantia";
import Faq from "./components/faq";
import { DivisorCostura } from "./components/decorations/divisor";
import { SecaoCTACompacta } from "./components/botao-compra";
import SmoothAnchors from "./components/smooth-anchors";

// Decorativo, não-crítico — não bloqueia LCP
const ScrollProgress = dynamic(() => import("./components/animations/scroll-progress"));

export default function Page() {
  return (
    <main>
      {/* Google Tag Manager (server-side, track.casadachita.com) — só na página de vendas */}
      <Script
        id="gtm-casadachita"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://track.casadachita.com/9blkytsbd.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','6hqf8m9=DQZOMy0mQVc0KiEzIVleRBJfQVpITQgMWQESBxgPDQEMCwcVVwgDDw%3D%3D');`,
        }}
      />
      {/* GTM (noscript) — fallback sem JavaScript */}
      <noscript>
        <iframe
          src="https://track.casadachita.com/ns.html?6hqf8m9=DQZOMy0mQVc0KiEzIVleRBJfQVpITQgMWQESBxgPDQEMCwcVVwgDDw%3D%3D"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
      <ScrollProgress />
      <SmoothAnchors />
      <Hero />
      <DivisorCostura />
      <GaleriaBolsas />
      <PraQuem />
      <MetodoPorDias />
      <TudoIncluso />
      <PontosEssenciais />
      <ProvasSociais />
      <SecaoCTACompacta
        manuscrita="a próxima pode ser você ✿"
        fundo="creme-claro"
        acao="oferta"
      />
      <DivisorCostura />
      <Bonus />
      <Oferta />
      <Jacira />
      <Garantia />
      <Faq />
      <footer className="bg-azul-royal text-creme py-10 text-center bg-papel-amassado" style={{backgroundColor: "var(--color-azul-royal)"}}>
        <p className="font-serif italic text-2xl text-creme">
          feito com linha e amor <span className="text-mostarda">♡</span>
        </p>
        <p className="mt-3 text-sm tracking-[0.3em] uppercase text-creme/70">
          Casa da Chita · Ouro Preto / MG · @casadachita
        </p>
      </footer>
    </main>
  );
}

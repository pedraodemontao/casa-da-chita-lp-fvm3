import dynamic from "next/dynamic";
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

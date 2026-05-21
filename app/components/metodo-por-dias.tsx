import { Agulha, Bastidor, Novelo, CoracaoBordado } from "./decorations/flor";
import FadeInView from "./animations/fade-in-view";
import type { ComponentType } from "react";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

type Etapa = {
 diaLabel: string;
 titulo: string;
 body: string;
 Icon: ComponentType<{ size?: number; className?: string }>;
};

const etapas: Etapa[] = [
 {
 diaLabel: "Dia 1-2",
 titulo: "As primeiras técnicas",
 body: "Te apresento os materiais e os pontos básicos — cruz, haste e o famoso caseado. Não tem mistério, é só entender a dinâmica do ponto.",
 Icon: Agulha,
 },
 {
 diaLabel: "Dia 3",
 titulo: "Escolha o seu modelo",
 body: "Você escolhe entre os modelos que eu ensino (Flora, Jardim, Festa…) e a gente prepara o risco na chita. É o dia de decidir qual vai ser a sua.",
 Icon: Bastidor,
 },
 {
 diaLabel: "Dia 4-5",
 titulo: "Mãos à obra",
 body: "Aqui você borda a peça principal — flor central, folhas, miolos. É quando a chita ganha vida com a sua mão.",
 Icon: Bastidor,
 },
 {
 diaLabel: "Dia 6",
 titulo: "Finalize e fotografe",
 body: "A gente monta a bolsa: forro de algodão, alça, fechamento. E tira uma foto bonita pra você guardar — ou mostrar pra quem você quiser.",
 Icon: Novelo,
 },
 {
 diaLabel: "Dia 7",
 titulo: "Use e abuse",
 body: "A bolsa pronta no mundo real — passeio, presente, ou só pra você mesma. Cada uma decide o que fazer com a sua.",
 Icon: CoracaoBordado,
 },
];

export default function MetodoPorDias() {
 return (
 <Secao id="metodo" fundo="paper-claro" padding="hero" largura="large">
 <FadeInView>
 <div className="text-center mb-14">
 <Eyebrow>O método</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 Como funciona o <Destaque>Desafio Primeira Bolsa</Destaque> em 7 dias.
 </TituloEditorial>
 <p className="mt-4 text-lg text-tinta-suave max-w-2xl mx-auto">
 5 etapas, no seu tempo, comigo te guiando passo a passo. Tudo dividido em noites curtas — aqui ninguém corre.
 </p>
 </div>
 </FadeInView>

 <div className="space-y-6">
 {etapas.map((etapa, i) => {
 const { Icon } = etapa;
 return (
 <FadeInView key={i} delay={i * 0.08} x={i % 2 === 0 ? -30 : 30}>
 <article
 className={`bg-creme borda-costurada p-6 md:p-8  transition-transform duration-500`}
 >
 <div className="flex flex-col md:flex-row gap-6 md:items-center">
 {/* Etiqueta do dia */}
 <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-2">
 <div className="selo !text-xs !py-2 !px-4 uppercase tracking-widest whitespace-nowrap">
 {etapa.diaLabel}
 </div>
 <div className="text-vermelho-chita">
 <Icon size={48} />
 </div>
 </div>

 {/* Conteúdo */}
 <div className="flex-1">
 <h3 className="font-serif text-2xl md:text-3xl text-azul-royal mb-3 leading-tight">
 {etapa.titulo}
 </h3>
 <p className="text-tinta-suave leading-relaxed text-lg">
 {etapa.body}
 </p>
 </div>
 </div>
 </article>
 </FadeInView>
 );
 })}
 </div>

 <FadeInView delay={0.4}>
 <div className="mt-12 text-center">
 <p className="font-serif italic text-2xl text-azul-royal">
 Em 7 noites,{" "}
 <Manuscrita tamanho="xl" cor="vermelho-chita" className="not-italic">
 sua primeira bolsa pronta.
 </Manuscrita>
 </p>
 </div>
 </FadeInView>
 </Secao>
 );
}

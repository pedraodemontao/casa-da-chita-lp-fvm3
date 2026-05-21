import Image from "next/image";
import FadeInView from "./animations/fade-in-view";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

const pontos = [
 {
 arquivo: "/fotos/bonus/embroidery-1-chita-floral.jpg",
 titulo: "Bordado em chita estampada",
 body: "Como bordar diretamente sobre a estampa — usando o desenho como guia natural.",
 tilt: "",
 },
 {
 arquivo: "/fotos/bonus/embroidery-2-azul-denso.jpg",
 titulo: "Camadas que dão relevo",
 body: "Como sobrepor pontos pra peça ganhar profundidade ao toque.",
 tilt: "",
 },
 {
 arquivo: "/fotos/bonus/embroidery-3-flor-macro.jpg",
 titulo: "Flor central com miolo",
 body: "Como construir uma flor protagonista do zero — pétala, miolo, contorno.",
 tilt: "",
 },
 {
 arquivo: "/fotos/bonus/embroidery-4-folhas-verde.jpg",
 titulo: "Folhas que respiram",
 body: "Ponto haste + ponto cheio em verde — o equilíbrio que valoriza a flor.",
 tilt: "",
 },
 {
 arquivo: "/fotos/bonus/embroidery-5-colorido-denso.jpg",
 titulo: "Mix de cores e técnicas",
 body: "Como combinar 5+ cores sem perder harmonia — a chita ensina o caminho.",
 tilt: "",
 },
 {
 arquivo: "/fotos/bonus/embroidery-6-laranja-folhas.jpg",
 titulo: "Acabamento que valoriza",
 body: "Os pontos finos de contorno que dão a apresentação especial pra peça.",
 tilt: "",
 },
];

export default function PontosEssenciais() {
 return (
 <Secao fundo="papel-amassado" padding="hero" largura="wide">
 <FadeInView>
 <div className="text-center mb-14">
 <Eyebrow cor="mostarda">Bônus especial</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 Conheça os <Destaque>35 Pontos Essenciais</Destaque> do bordado.
 </TituloEditorial>
 <p className="mt-4 text-lg text-tinta-suave max-w-2xl mx-auto">
 Biblioteca completa em <strong className="text-azul-royal font-normal">3 níveis</strong> — do ponto cruz básico ao acabamento que dá apresentação especial. Cada ponto explicado em vídeo curto, sem mistério.
 </p>
 <Manuscrita tamanho="lg" cor="vermelho-chita" className="mt-3">
 o bônus que as alunas mais usam ✿
 </Manuscrita>
 </div>
 </FadeInView>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
 {pontos.map((p, i) => (
 <FadeInView key={i} delay={(i % 3) * 0.1} y={40}>
 <article
 className={`bg-creme borda-costurada p-3 ${p.tilt} transition-transform duration-500 group`}
 >
 <div className="relative aspect-[4/3] overflow-hidden">
 <Image
 src={p.arquivo}
 alt={p.titulo}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 sizes="(max-width: 768px) 100vw, 33vw"
 />
 <div className="absolute inset-2 border border-dashed border-creme/60 pointer-events-none" />
 </div>
 <div className="px-3 pt-4 pb-3">
 <h3 className="font-serif text-xl text-azul-royal leading-tight mb-2">
 {p.titulo}
 </h3>
 <p className="text-tinta-suave leading-relaxed text-sm">{p.body}</p>
 </div>
 </article>
 </FadeInView>
 ))}
 </div>

 <FadeInView delay={0.4}>
 <p className="text-center mt-12 font-serif italic text-2xl text-azul-royal">
 35 pontos. 3 níveis.{" "}
 <Manuscrita tamanho="lg" cor="vermelho-chita" className="not-italic">
 Biblioteca pra sempre.
 </Manuscrita>
 </p>
 </FadeInView>
 </Secao>
 );
}

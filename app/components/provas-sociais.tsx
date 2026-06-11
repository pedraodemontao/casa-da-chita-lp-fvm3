import Image from "next/image";
import FadeInView from "./animations/fade-in-view";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

// Prints reais do grupo de alunas — depoimentos do WhatsApp
type Depoimento = {
 nome: string;
 arquivo: string;
 quote: string;
 contexto: string;
 tilt: string;
};

const depoimentos: Depoimento[] = [
 {
 nome: "Lidia",
 arquivo: "/fotos/provas-sociais/social-prof-lidia.png",
 quote: "A Jacira ensina tão bem que consegui fazer a bolsa.",
 contexto: "Primeira bolsa — sem saber costurar nem bordar.",
 tilt: "",
 },
 {
 nome: "Selma",
 arquivo: "/fotos/provas-sociais/social-prof-selma.png",
 quote: "Olha só minha terceira bolsa!",
 contexto: "Aluna desde o início, agora já vendendo.",
 tilt: "",
 },
 {
 nome: "Lorena",
 arquivo: "/fotos/provas-sociais/social-prof-lorena.png",
 quote: "Minha quarta filha! Tenho seis noras pra presentear.",
 contexto: "Faz uma bolsa atrás da outra — todas pra família.",
 tilt: "",
 },
 {
 nome: "Lo",
 arquivo: "/fotos/provas-sociais/social-prof-lo.png",
 quote: "Viciada em bolsa, essa é a décima quinta!",
 contexto: "Aluna avançada — 15 peças e contando.",
 tilt: "",
 },
 {
 nome: "Rosangela",
 arquivo: "/fotos/provas-sociais/social-prof-rosangela.png",
 quote: "Consegui terminar meu colete 🙏",
 contexto: "Levou a técnica pra outras peças além da bolsa.",
 tilt: "",
 },
];

export default function ProvasSociais() {
 return (
 <Secao fundo="paper" padding="hero" largura="wide">
 <FadeInView>
 <div className="text-center mb-14">
 <Eyebrow>Provas reais</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 Olha só o que minhas <Destaque>alunas</Destaque> tão fazendo.
 </TituloEditorial>
 <p className="mt-4 font-serif italic text-2xl md:text-3xl text-azul-royal leading-snug max-w-2xl mx-auto">
 Mais de <Destaque cor="vermelho-chita">1.000 mulheres</Destaque> já bordaram comigo.
 <br />
 <Manuscrita tamanho="lg" cor="vermelho-chita" className="not-italic">
 a próxima pode ser você ✿
 </Manuscrita>
 </p>
 <p className="mt-4 text-lg text-tinta-suave max-w-2xl mx-auto">
 Depoimentos reais do grupo das bordadeiras. Todas começaram do zero — não tem mistério. Algumas presenteiam a família, outras tão vendendo em feira. Cada uma no seu tempo.
 </p>
 </div>
 </FadeInView>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
 {depoimentos.map((d, i) => (
 <FadeInView key={i} delay={(i % 3) * 0.1} y={30}>
 <article
 className={`bg-creme borda-costurada p-4 h-full ${d.tilt} transition-transform duration-500`}
 >
 <div className="relative aspect-[3/4] overflow-hidden bg-creme-claro">
 <Image
 src={d.arquivo}
 alt={`Depoimento de ${d.nome}`}
 fill
 className="object-cover"
 sizes="(max-width: 768px) 100vw, 33vw"
 />
 </div>
 <div className="mt-4 px-3 pb-2">
 <p className="font-serif italic text-xl text-azul-royal leading-snug mb-2">
 &ldquo;{d.quote}&rdquo;
 </p>
 <p className="text-sm text-tinta-suave">
 <strong className="text-vermelho-chita font-normal">— {d.nome}.</strong>{" "}
 {d.contexto}
 </p>
 </div>
 </article>
 </FadeInView>
 ))}
 </div>

 </Secao>
 );
}

import Image from "next/image";
import dynamic from "next/dynamic";
import FadeInView from "./animations/fade-in-view";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

// Sticky-stack só carrega no desktop (esconde via CSS em mobile),
// então separa o chunk via next/dynamic — só puxa o JS quando faz sentido.
const StickyStackCard = dynamic(() => import("./animations/sticky-stack"));

const modelos = [
  {
    src: "/fotos/bolsa-lilas-flores-bordadas.jpg",
    titulo: "Modelo Flora",
    descricao:
      "Chita lilás com flores soltas em ponto haste. Combina com tudo — do casual ao mais arrumadinho.",
  },
  {
    src: "/fotos/bolsa-azul-miniflores.jpg",
    titulo: "Modelo Jardim",
    descricao:
      "Chita azul com miniflores em ponto pipoca colorido. Quem quer textura, esse é o queridinho.",
  },
  {
    src: "/fotos/bolsas-laranja-verde-prateleira.jpg",
    titulo: "Modelo Festa",
    descricao:
      "Chita laranja-coral com bordado denso em mouliné. A peça que sai do armário pra todo passeio.",
  },
];

function BolsaCard({ m, i }: { m: typeof modelos[0]; i: number }) {
  return (
    <article className="bg-creme borda-costurada p-4 md:p-6 max-w-3xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-center">
        <div className="aspect-[4/5] relative overflow-hidden">
          <Image
            src={m.src}
            alt={m.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-2 border-2 border-dashed border-creme/80 pointer-events-none" />
        </div>

        <div className="p-2 md:p-2">
          <span className="text-mostarda font-serif text-3xl md:text-5xl leading-none">
            0{i + 1}
          </span>
          <h3 className="font-serif text-2xl md:text-4xl text-azul-royal mt-3 mb-3 leading-tight">
            {m.titulo}
          </h3>
          <Manuscrita tamanho="md" cor="vermelho-chita" className="mb-3 md:text-2xl">
            Faça Você Mesma 3.0
          </Manuscrita>
          <p className="text-tinta-suave leading-relaxed text-sm md:text-base">
            {m.descricao}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function GaleriaBolsas() {
  return (
    <Secao fundo="papel-amassado" padding="nenhum" largura="wide" innerClassName="pt-14 md:pt-28">
        <FadeInView>
          <div className="text-center mb-10 md:mb-16">
            <Eyebrow>O que você vai criar</Eyebrow>
            <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
              Olha só o que minhas <Destaque>alunas</Destaque> tão fazendo.
            </TituloEditorial>
            <p className="mt-4 text-base md:text-lg text-tinta-suave max-w-2xl mx-auto">
              Mesmo passo a passo, mas cada uma faz a sua —{" "}
              <strong className="text-azul-royal font-normal">cor, estampa e ponto</strong>{" "}
              do jeito que combina com ela.
            </p>
            <Manuscrita tamanho="md" cor="mostarda" className="mt-3 md:text-3xl">
              essas são minhas favoritas ✿
            </Manuscrita>
          </div>
        </FadeInView>

        {/* Mobile: grid vertical leve (sem framer-motion stack) */}
        <div className="md:hidden space-y-6">
          {modelos.map((m, i) => (
            <FadeInView key={i} delay={i * 0.08}>
              <BolsaCard m={m} i={i} />
            </FadeInView>
          ))}
        </div>

        {/* Desktop: sticky stacking (lazy via next/dynamic) */}
        <div className="hidden md:block relative">
          {modelos.map((m, i) => (
            <div
              key={i}
              className="h-[80vh] flex items-start justify-center"
            >
              <StickyStackCard
                index={i}
                total={modelos.length}
                topOffset={80}
              >
                <BolsaCard m={m} i={i} />
              </StickyStackCard>
            </div>
          ))}
        </div>

        <FadeInView>
          <div className="text-center max-w-2xl mx-auto pt-10 md:pt-12 pb-14 md:pb-28">
            <p className="font-serif text-xl md:text-3xl text-azul-royal italic leading-snug">
              E muitas outras combinações.
              <br />
              O passo a passo é o mesmo —{" "}
              <Destaque cor="vermelho-chita">a sua bolsa é sua.</Destaque>
            </p>
            <div className="mt-6 md:mt-8 inline-flex items-center gap-3 text-tinta-suave">
              <span className="h-px w-8 md:w-12 bg-mostarda" />
              <Manuscrita tamanho="sm" cor="vermelho-chita" className="md:text-2xl">
                veja a oferta abaixo ↓
              </Manuscrita>
              <span className="h-px w-8 md:w-12 bg-mostarda" />
            </div>
          </div>
        </FadeInView>
    </Secao>
  );
}

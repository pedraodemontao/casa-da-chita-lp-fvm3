"use client";

import dynamic from "next/dynamic";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Manuscrita,
  FotoEmoldurada,
} from "./marca";

// Below-the-fold: framer-motion sai do bundle inicial
const AnimatedText = dynamic(() => import("./animations/animated-text"));
const ParallaxPhoto = dynamic(() => import("./animations/parallax-photo"));

export default function Jacira() {
 return (
 <Secao fundo="paper-claro" padding="compact" largura="wide">
 <div className="grid md:grid-cols-2 gap-16 items-center">

 <div className="relative">
 <ParallaxPhoto range={50}>
 <FotoEmoldurada
 src="/fotos/jacira-atelie-bolsa-preta.jpg"
 alt="Jacira no ateliê com uma das bolsas"
 aspect="3-4"
 corMoldura="creme"
 />
 </ParallaxPhoto>
 </div>

 <div>
 <Eyebrow>A especialista</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-4 mb-3">
 Jacira Barros.
 </TituloEditorial>
 <Manuscrita tamanho="lg" cor="mostarda" className="mb-8">
 bordadeira da Casa da Chita
 </Manuscrita>
 <div className="space-y-4 text-lg text-tinta-suave leading-relaxed">
 <p>
 Bordo há mais de 25 anos, no ateliê da Casa da Chita em Ouro Preto. Linha, agulha e chita há tanto tempo que perdi a conta.
 </p>
 <p>
 Tem muita gente que me liga dizendo: <em>&ldquo;Jacira, eu nunca peguei numa agulha!&rdquo;</em> E eu digo: não tem problema, linda. Não tem mistério, é só entender a dinâmica do ponto. Já ensinei mais de 1.000 mulheres assim.
 </p>
 <p>
 Em 2023, passei por um câncer. Nesse tempo, criei o Coração Bordado. O bordado me devolveu o tempo que a doença tinha me tomado. A linha não para.
 </p>
 </div>

 <blockquote className="mt-10 pl-6 border-l-4 border-mostarda relative">
 <span className="absolute -top-4 -left-3 text-mostarda font-serif text-7xl leading-none opacity-50">&ldquo;</span>
 <AnimatedText
 text="Eu não ensino bordado. Eu ensino mulheres a se descobrirem com as próprias mãos."
 className="font-serif italic text-2xl md:text-3xl text-azul-royal leading-snug"
 />
 </blockquote>

 <Manuscrita tamanho="md" cor="vermelho-chita" className="mt-6">— Jacira</Manuscrita>
 </div>

 </div>
 </Secao>
 );
}

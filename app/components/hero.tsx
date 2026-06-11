import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Secao,
  TituloEditorial,
  Destaque,
  BotaoCta,
  FotoEmoldurada,
  Selo,
} from "./marca";

// Decorativos — só carrega depois do LCP via dynamic
const Magnet = dynamic(() => import("./animations/magnet"));

export default function Hero() {
 return (
 <>
 {/* ───────── MOBILE: foto da expert no topo + degradê + headline embaixo ───────── */}
 <div className="md:hidden bg-paper relative overflow-hidden">
 <div className="relative w-full aspect-[4/5] animate-fade-up">
 <Image
   src="/fotos/jacira-loja-bracos-abertos.jpg"
   alt="Jacira, professora do curso, na Casa da Chita"
   fill
   priority
   sizes="100vw"
   className="object-cover object-top"
 />
 {/* Scrim no topo — dá contraste pra marca sobre a foto */}
 <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-azul-royal/45 to-transparent" />
 {/* Degradê na junção — foto funde no creme do fundo */}
 <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[#EBD6C2]" />

 {/* Marca sobreposta no topo da foto */}
 <div className="absolute top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
 <Image
   src="/logo/casa-da-chita-logo.png"
   alt="Casa da Chita"
   width={64}
   height={64}
   priority
   className="object-contain drop-shadow-md"
 />
 <span className="text-[10px] tracking-[0.3em] uppercase text-creme font-medium drop-shadow">
 Curso da Casa da Chita
 </span>
 </div>
 </div>

 <div className="relative z-10 -mt-12 px-5 pb-14 text-center">
 <TituloEditorial as="h1" tamanho="lg" leading="tight" className="mb-5">
 Em 7 dias, sua primeira bolsa.
 <br />
 <Destaque>Mesmo que você nunca tenha pegado uma agulha.</Destaque>
 </TituloEditorial>

 <p className="text-lg text-tinta-suave leading-relaxed mb-8 max-w-md mx-auto">
 Aulas em vídeo, no seu ritmo, com a Jacira te guiando do risco até o acabamento.
 </p>

 <BotaoCta href="#metodo" pulse className="w-full justify-center">
 Quero fazer a minha primeira bolsa
 </BotaoCta>

 <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-tinta-suave">
 <span className="flex items-center gap-2">🪡 Acesso vitalício</span>
 <span className="flex items-center gap-2">🧵 14 dias de garantia</span>
 <span className="flex items-center gap-2">🏠 +1.000 alunas</span>
 </div>
 </div>
 </div>

 {/* ───────── DESKTOP: layout de 2 colunas ───────── */}
 <Secao fundo="paper" padding="hero" largura="wide" priority className="hidden md:block">
 <div className="grid md:grid-cols-2 gap-12 items-center">

 <div className="animate-fade-up">
 <div className="flex items-center gap-4 mb-7">
 <Image
   src="/logo/casa-da-chita-logo.png"
   alt="Casa da Chita"
   width={84}
   height={84}
   priority
   className="object-contain flex-shrink-0"
 />
 <div className="flex flex-col">
 <span className="text-[11px] tracking-[0.3em] uppercase text-azul-royal/70 font-medium">
 Curso da Casa da Chita
 </span>
 </div>
 </div>

 <TituloEditorial as="h1" tamanho="xl" leading="tight" className="mb-6">
 Em 7 dias, sua primeira bolsa.
 <br />
 <Destaque>Mesmo que você nunca tenha pegado uma agulha.</Destaque>
 </TituloEditorial>

 <p className="text-lg md:text-xl text-tinta-suave leading-relaxed mb-9 max-w-xl">
 Aulas em vídeo, no seu ritmo, com a Jacira te guiando do risco até o acabamento.
 </p>

 <BotaoCta href="#metodo" pulse>
 Quero fazer a minha primeira bolsa
 </BotaoCta>

 <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-tinta-suave">
 <span className="flex items-center gap-2">🪡 Acesso vitalício</span>
 <span className="flex items-center gap-2">🧵 14 dias de garantia</span>
 <span className="flex items-center gap-2">🏠 +1.000 alunas</span>
 </div>
 </div>

 <div className="relative animate-fade-up-d2">
 <FotoEmoldurada
 src="/fotos/blusa-azul-bordada-chita.jpg"
 alt="Blusa azul bordada em chita no manequim"
 aspect="4-5"
 corMoldura="creme"
 />
 <div className="absolute -bottom-5 -left-6 z-10">
 <Magnet padding={120} strength={4}>
 <Selo>feito à mão, ensinado com afeto</Selo>
 </Magnet>
 </div>
 </div>

 </div>
 </Secao>
 </>
 );
}

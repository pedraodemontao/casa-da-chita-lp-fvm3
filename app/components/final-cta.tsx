"use client";

import dynamic from "next/dynamic";

const ParallaxPhoto = dynamic(() => import("./animations/parallax-photo"));
import {
  Secao,
  Manuscrita,
  TituloEditorial,
  Destaque,
  ListaItens,
  BotaoCta,
  FotoEmoldurada,
} from "./marca";

export default function FinalCta() {

 return (
 <Secao fundo="paper-claro" padding="compact" largura="large">
 <div className="grid md:grid-cols-2 gap-12 items-center">

 <div className="relative">
 <ParallaxPhoto range={50}>
 <FotoEmoldurada
 src="/fotos/jacira-segurando-varias-bolsas.jpg"
 alt="Jacira com várias bolsas, convite final"
 aspect="4-5"
 corMoldura="creme"
 />
 </ParallaxPhoto>
 </div>

 <div>
 <Manuscrita tamanho="lg" cor="vermelho-chita" className="mb-4">
 uma última coisa…
 </Manuscrita>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mb-6">
 Imagina olhar pra uma bolsa linda na sua mão e dizer: <Destaque>fui eu que fiz.</Destaque>
 </TituloEditorial>

 <p className="text-lg text-tinta-suave mb-8 italic font-serif">
 Em 7 noites isso pode ser real.
 <br />
 Vem com a gente, querida, não tem mistério.
 </p>

 <ListaItens
 formato="inline"
 cor="vermelho-chita"
 items={["Acesso vitalício", "14 dias de garantia", "Grupo de alunas"]}
 className="mb-9"
 />

<BotaoCta href="#oferta" pulse>
 Quero fazer minha primeira bolsa
 </BotaoCta>

 <p className="mt-6 text-sm text-tinta-suave">
 Precisa de ajuda?{" "}
 <a
 href="https://wa.me/5531973039899"
 className="text-vermelho-chita underline underline-offset-4 decoration-dashed hover:text-azul-royal transition-colors"
 >
 Me chama no WhatsApp →
 </a>
 </p>
 </div>

 </div>
 </Secao>
 );
}

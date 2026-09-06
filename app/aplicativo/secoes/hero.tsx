import Image from "next/image";
import { Secao, TituloEditorial, Destaque, Eyebrow, Manuscrita, BotaoCta } from "@/app/components/marca";
import { Celular } from "./celular";
import { OFERTA } from "../oferta.config";

export function Hero() {
  const chips = ["📱 Funciona no seu celular", "🪡 Acesso vitalício", `🧵 ${OFERTA.garantiaDias} dias de garantia`];
  return (
    <Secao fundo="paper" padding="hero" largura="wide" priority>

      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-4">
            <Image src="/logo/casa-da-chita-logo.png" alt="Casa da Chita" width={72} height={72} priority className="object-contain" />
            <Eyebrow cor="azul-royal">{OFERTA.nomeCampanha}</Eyebrow>
          </div>
          <Manuscrita tamanho="md" cor="vermelho-chita" display="block" className="mb-2">
            Olá, querida ✿
          </Manuscrita>
          <TituloEditorial as="h1" tamanho="xl" leading="tight" className="mb-6">
            Sua primeira bolsa de chita em um fim de semana.
            <br />
            <Destaque>E a Jacira no seu celular pra você nunca travar sozinha.</Destaque>
          </TituloEditorial>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-tinta-suave md:text-xl">
            A aula da bolsa, os 35 pontos um por um, e um aplicativo que te diz a cor, o ponto e o que bordar depois.
            Não tem mistério. Agora tem aplicativo.
          </p>
          <BotaoCta href="#oferta" pulse dataEvent="cta_scroll_oferta" className="cta-secundaria w-full justify-center md:w-auto">
            Quero a Casa da Chita no meu celular
          </BotaoCta>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base text-tinta-suave">
            {chips.map((c) => (
              <span key={c} className="flex items-center gap-2">{c}</span>
            ))}
          </div>
          <p className="mt-6 text-base text-tinta-suave">
            Já é minha aluna do Faça Você Mesma?{" "}
            <a href={`${OFERTA.appUrl}/login`} className="text-vermelho-chita underline decoration-dashed underline-offset-4 hover:text-azul-royal">
              Entra de graça, com o mesmo e-mail →
            </a>
          </p>
        </div>

        <div className="animate-fade-up-d2 flex justify-center pb-6">
          <div className="relative">
            <Celular tela="inicio" />
            {/* selo no canto do aparelho, como o selo sobre a foto na LP do FVM */}
            <div className="absolute -bottom-5 -left-10 z-10">
              <div className="selo">a Jacira no seu bolso</div>
            </div>
          </div>
        </div>
      </div>
    </Secao>
  );
}

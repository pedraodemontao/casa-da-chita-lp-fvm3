import Image from "next/image";
import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita } from "@/app/components/marca";
import { OFERTA } from "../oferta.config";

export function GarantiaApp() {
  return (
    <Secao fundo="azul-royal" padding="default" largura="default" innerClassName="text-center">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(235, 214, 194, 0.06) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
      <div className="relative">
        <div className="mb-8 flex justify-center">
          <Image src="/logo/casa-da-chita-logo.png" alt="Casa da Chita" width={140} height={140} className="object-contain" />
        </div>
        <Eyebrow cor="mostarda">A garantia</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" cor="creme" leading="snug" className="mt-3 mb-6">
          <span className="text-creme">Primeira bolsa</span> <Destaque cor="mostarda">ou seu dinheiro de volta.</Destaque>
        </TituloEditorial>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-creme/90 md:text-xl">
          Você entra, monta a bolsa comigo no fim de semana, mexe no aplicativo à vontade. Se em {OFERTA.garantiaDias} dias você não estiver com a sua bolsa na mão e sentir que não era pra você, me manda uma mensagem e eu devolvo tudo.
          <br />
          <br />
          Sem pergunta. <strong className="font-normal text-mostarda">Sem letra miúda.</strong>
        </p>
        <Manuscrita tamanho="lg" cor="mostarda">— Jacira, da Casa da Chita</Manuscrita>
      </div>
    </Secao>
  );
}

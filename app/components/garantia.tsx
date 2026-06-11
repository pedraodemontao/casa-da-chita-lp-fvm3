import Image from "next/image";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

export default function Garantia() {
 return (
 <Secao fundo="azul-royal" padding="default" largura="default" innerClassName="text-center">
 {/* paper grain leve sobre azul */}
 <div className="absolute inset-0 opacity-30" style={{
 backgroundImage: "radial-gradient(circle at 1px 1px, rgba(235, 214, 194, 0.06) 1px, transparent 0)",
 backgroundSize: "26px 26px"
 }} />

 <div className="relative">
 <div className="flex justify-center mb-8">
 <Image
   src="/logo/casa-da-chita-logo.png"
   alt="Casa da Chita"
   width={140}
   height={140}
   className="object-contain"
 />
 </div>

 <Eyebrow cor="mostarda">A garantia</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" cor="creme" leading="snug" className="mt-3 mb-6">
 14 dias <Destaque cor="mostarda">100% incondicionais.</Destaque>
 </TituloEditorial>

 <p className="text-lg md:text-xl leading-relaxed text-creme/90 max-w-2xl mx-auto mb-8">
 Se você abrir o curso, ver as aulas e sentir que não é pra você, me manda uma mensagem dentro de 14 dias e eu devolvo cada centavo.
 <br />
 <br />
 Sem perguntas. Sem julgamento. <strong className="text-mostarda font-normal">Só linha e amor.</strong>
 </p>

 <Manuscrita tamanho="lg" cor="mostarda">— Jacira, da Casa da Chita</Manuscrita>
 </div>
 </Secao>
 );
}

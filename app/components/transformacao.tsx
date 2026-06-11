import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
  BordaTracejada,
} from "./marca";

export default function Transformacao() {
 const antes = [
 "Já tentei aprender pelo YouTube e desisti em 10 minutos.",
 "Comprei kit caro e nunca consegui terminar uma peça.",
 "Sempre quis fazer presente bonito pras filhas, mas acho que sou desastrada.",
 "Tenho medo de não dar conta e gastar dinheiro à toa.",
 ];

 const em7dias = [
 "Você risca o desenho na chita com confiança.",
 "Vai ser você que sabe como começar a sua bolsa.",
 "Você aprendeu o novo projeto.",
 "Sua primeira bolsa tá pronta, com forro, alça e acabamento.",
 ];

 return (
 <Secao fundo="paper" padding="compact" largura="wide">
 <div className="text-center mb-16">
 <Eyebrow>A virada</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 De quem nunca pegou uma agulha
 <br />
 a quem bordou a <Destaque>primeira bolsa</Destaque>.
 </TituloEditorial>
 </div>

 <div className="grid md:grid-cols-2 gap-8">

 <div className="bg-creme-claro p-10 borda-costurada">
 <h3 className="font-serif text-2xl text-tinta-suave mb-6">Como você chega</h3>
 <ul className="space-y-4">
 {antes.map((item, i) => (
 <li key={i} className="flex gap-3 text-tinta-suave leading-relaxed">
 <span className="text-vermelho-chita mt-1 font-bold">✕</span>
 <span className="italic">&ldquo;{item}&rdquo;</span>
 </li>
 ))}
 </ul>
 </div>

 <div className="bg-azul-royal text-creme p-10 relative">
 <h3 className="font-serif text-2xl text-creme mb-6">Como você sai em 7 dias</h3>
 <ul className="space-y-4">
 {em7dias.map((item, i) => (
 <li key={i} className="flex gap-3 leading-relaxed">
 <span className="text-mostarda mt-1">❀</span>
 <span>{item}</span>
 </li>
 ))}
 </ul>
 <BordaTracejada cor="creme" inset={2} />
 </div>
 </div>

 <div className="mt-10 mx-auto max-w-3xl">
 <div className="bg-mostarda text-azul-royal p-8 text-center relative">
 <Manuscrita tamanho="lg" display="block" className="mb-2">e pra sempre…</Manuscrita>
 <p className="font-serif text-xl md:text-2xl italic leading-snug">
 Você ganha um ofício seu.
 <br />
 Suas bolsas viram presente, lembrança, e se quiser, renda também.
 </p>
 <BordaTracejada cor="azul-royal" inset={2} />
 </div>
 </div>
 </Secao>
 );
}

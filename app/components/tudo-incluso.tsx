import FadeInView from "./animations/fade-in-view";
import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
  BordaTracejada,
} from "./marca";

const itens = [
 {
 icone: "🎥",
 titulo: "Videoaulas completas",
 body: "Todo o passo a passo em vídeo HD, no seu ritmo. Você assiste pelo celular, computador ou TV.",
 },
 {
 icone: "📐",
 titulo: "Moldes prontos",
 body: "Os riscos prontos pra imprimir e transferir pra chita, sem precisar desenhar do zero.",
 },
 {
 icone: "📅",
 titulo: "Cronograma de 7 dias",
 body: "Um guia pra cada noite. Você sabe exatamente onde está e o que vem a seguir, aqui ninguém fica perdida.",
 },
 {
 icone: "📋",
 titulo: "Lista de fornecedores",
 body: "Onde comprar tecido, linha mouliné e ferragens com qualidade, fornecedores testados por mim no ateliê.",
 },
 {
 icone: "💰",
 titulo: "Guia de preço",
 body: "Se um dia quiser vender, como calcular o preço da sua bolsa pronta. Mão de obra, material, tudo na tabela.",
 },
 {
 icone: "📸",
 titulo: "Manual de fotografia",
 body: "Como fotografar sua peça pronta, pra postar, presentear ou vender se você quiser.",
 },
];

export default function TudoIncluso() {
 return (
 <Secao fundo="paper" padding="hero" largura="wide">
 <FadeInView>
 <div className="text-center mb-14">
 <Eyebrow>O que está incluso</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 Tudo que você precisa pra <Destaque>começar hoje mesmo</Destaque>.
 </TituloEditorial>
 <p className="mt-4 text-lg text-tinta-suave max-w-2xl mx-auto">
 Não é só videoaula. É <strong className="text-azul-royal font-normal">tudo o que você precisa</strong> pra fazer sua primeira bolsa, com calma e sem mistério.
 </p>
 </div>
 </FadeInView>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {itens.map((item, i) => (
 <FadeInView key={i} delay={(i % 3) * 0.1}>
 <article
 className={`bg-creme-claro p-7 borda-costurada h-full  transition-transform duration-500`}
 >
 <div className="text-4xl mb-4">{item.icone}</div>
 <h3 className="font-serif text-2xl mb-3 text-azul-royal leading-tight">
 {item.titulo}
 </h3>
 <p className="text-tinta-suave leading-relaxed">{item.body}</p>
 </article>
 </FadeInView>
 ))}
 </div>

 <FadeInView delay={0.3}>
 <div className="mt-12 max-w-2xl mx-auto bg-mostarda text-azul-royal p-6 text-center relative">
 <p className="font-serif text-xl md:text-2xl italic leading-snug">
 Tudo pra você ir mais longe
 </p>
 <Manuscrita tamanho="md" display="block" className="mt-2">
 + 35 pontos essenciais (logo ali embaixo) ↓
 </Manuscrita>
 <BordaTracejada cor="azul-royal" inset={2} />
 </div>
 </FadeInView>
 </Secao>
 );
}

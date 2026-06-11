import { Secao, Eyebrow, TituloEditorial, Manuscrita } from "./marca";

export default function Bonus() {
 const bonus = [
   {
     n: "01",
     titulo: "35 Pontos Essenciais",
     body: "Biblioteca catalogada com 35 pontos de bordado em vídeo curto, referência vitalícia que você consulta sempre que esquecer.",
     valor: "R$ 67",
   },
   {
     n: "02",
     titulo: "Encontro Ao Vivo com a Jacira",
     body: "Encontro online de boas-vindas comigo no Zoom. Demonstração ao vivo do primeiro ponto e dúvidas em tempo real. Só desta rodada.",
     valor: "R$ 47",
     destaque: true,
   },
   {
     n: "03",
     titulo: "Kit Imprimível da Bordadeira",
     body: "PDF pronto pra imprimir em casa: risco da bolsa, folhas pautadas pra anotar pontos, tabela de cores mouliné e cartão de bordadeira.",
     valor: "R$ 37",
     destaque: true,
   },
   {
     n: "04",
     titulo: "Grupo Exclusivo de Alunas",
     body: "Comunidade vitalícia pra tirar dúvida, mostrar sua peça e conhecer outras bordadeiras. Onde a magia continua depois da última aula.",
     valor: "R$ 27",
   },
   {
     n: "05",
     titulo: "Aulas ao Vivo de Dúvidas",
     body: "Lives marcadas comigo, sob demanda, pra tirar dúvida real, na hora. Quando o grupo pede, eu apareço.",
     valor: "R$ 17",
   },
   {
     n: "06",
     titulo: "Lista de Fornecedores",
     body: "Onde comprar tecido de chita, linha mouliné e ferragens com qualidade, fornecedores testados por mim no ateliê.",
     valor: "R$ 7",
   },
 ];

 return (
   <Secao fundo="paper-claro" padding="hero" largura="wide">
       <div className="text-center mb-14">
         <Eyebrow cor="mostarda">Bônus inclusos</Eyebrow>
         <TituloEditorial as="h2" tamanho="lg" className="mt-3">
           Tudo isso vem junto.
           <br />
           <Manuscrita tamanho="2xl" cor="vermelho-chita">
             Sem custo a mais.
           </Manuscrita>
         </TituloEditorial>
       </div>

       <div className="grid md:grid-cols-2 gap-7">
         {bonus.map((b) => (
           <article
             key={b.n}
             className={`bg-creme p-8 borda-costurada relative hover:shadow-md transition-shadow ${
               b.destaque ? "ring-2 ring-vermelho-chita ring-offset-4 ring-offset-creme-claro" : ""
             }`}
           >
             <div className="selo absolute -top-4 left-6 !text-xs !py-2 !px-3 uppercase tracking-widest">
               Bônus {b.n}
             </div>
             {b.destaque && (
               <div className="absolute -top-4 right-6 bg-vermelho-chita text-creme px-3 py-2 text-[10px] tracking-[0.2em] uppercase rounded-sm">
                 desta rodada
               </div>
             )}
             <div className="mt-8">
               <h3 className="font-serif text-2xl mb-3 text-azul-royal leading-tight">
                 {b.titulo}
               </h3>
               <p className="text-tinta-suave leading-relaxed mb-5">{b.body}</p>
               <div className="flex items-center justify-between costura pt-4">
                 <span className="text-vermelho-chita font-sans text-sm tracking-widest uppercase">
                   ✓ Incluso
                 </span>
                 <span className="text-tinta-suave line-through text-lg">
                   {b.valor}
                 </span>
               </div>
             </div>
           </article>
         ))}
       </div>
   </Secao>
 );
}

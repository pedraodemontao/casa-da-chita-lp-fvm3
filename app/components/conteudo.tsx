import {
  Secao,
  Eyebrow,
  TituloEditorial,
  Destaque,
  Manuscrita,
} from "./marca";

export default function Conteudo() {
 const aulas = [
 { n: "01", titulo: "Preparação do tecido", body: "Como escolher a chita, deixar o tecido pronto e os materiais que a gente vai usar do começo ao fim." },
 { n: "02", titulo: "O risco do desenho", body: "Como transferir o desenho pra chita sem errar — o segredinho que muita gente pula." },
 { n: "03", titulo: "Os pontos do bordado", body: "Ponto cruz, ponto haste e o famoso ponto caseado. Cada um explicado com calma — é só entender a dinâmica." },
 { n: "04", titulo: "Bordando a flor central", body: "A parte mais bonita: dar vida ao desenho com as cores da chita. Aqui ela vira altíssima qualidade." },
 { n: "05", titulo: "Montagem da bolsa", body: "Como fechar a peça, colocar forro firme de algodão e a alça. Sem máquina — só com agulha e linha." },
 { n: "06", titulo: "Acabamento e detalhes", body: "Os pontos finos que valorizam imenso: arremate, dobras, retoque. Sua bolsa pronta pra usar." },
 ];

 return (
 <Secao fundo="paper-claro" padding="hero" largura="wide">
 <div className="text-center mb-14">
 <Eyebrow>O conteúdo</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 6 aulas. <Destaque>~5 horas.</Destaque>
 <br />Sua bolsa pronta na 7ª noite.
 </TituloEditorial>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {aulas.map((aula) => (
 <article
 key={aula.n}
 className="bg-creme p-8 borda-costurada relative hover:shadow-md transition-shadow"
 >
 <div className="flex items-start justify-between mb-4">
 <span className="text-mostarda font-serif text-4xl leading-none">{aula.n}</span>
 </div>
 <h3 className="font-serif text-2xl mb-3 leading-tight">{aula.titulo}</h3>
 <p className="text-tinta-suave leading-relaxed">{aula.body}</p>
 </article>
 ))}
 </div>

 <p className="text-center mt-12 font-serif italic text-2xl text-azul-royal">
 Acesso vitalício.{" "}
 <Manuscrita tamanho="lg" cor="vermelho-chita" className="not-italic">
 Vem com tudo, no seu tempo.
 </Manuscrita>
 </p>
 </Secao>
 );
}

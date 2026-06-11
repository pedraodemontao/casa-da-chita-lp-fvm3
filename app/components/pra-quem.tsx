import { Agulha, Bastidor, Novelo, CoracaoBordado } from "./decorations/flor";
import { Secao, Eyebrow, TituloEditorial, Destaque } from "./marca";

export default function PraQuem() {
 const personas = [
 { Icon: Agulha, titulo: "Pra quem nunca pegou na agulha", body: "Eu te explico do zero, agulha por agulha. Não tem mistério, linda." },
 { Icon: Bastidor, titulo: "Pra quem trabalha em casa", body: "Aprende no seu tempo, no seu ritmo, sem horário marcado." },
 { Icon: CoracaoBordado, titulo: "Pra quem quer presentear", body: "Bolsa bordada à mão é presente que ninguém esquece." },
 { Icon: Novelo, titulo: "Pra quem quer começar a vender", body: "Algumas das minhas alunas começaram assim, eu te conto como funciona." },
 { Icon: Bastidor, titulo: "Pra quem tem pouco tempo", body: "Aulas curtas, do tamanho de um café. Você assiste no celular, na cozinha mesmo." },
 { Icon: Bastidor, titulo: "Pra quem só quer um hobby bonito", body: "Bordar acalma a alma. Você vai sentir." },
 ];

 return (
 <Secao fundo="paper" padding="hero" largura="wide">
 <div className="text-center mb-14">
 <Eyebrow>Pra quem é</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" className="mt-3">
 Esse curso é <Destaque>pra você?</Destaque>
 </TituloEditorial>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {personas.map((p, i) => {
 const { Icon } = p;
 return (
 <div
 key={i}
 className="bg-creme-claro p-7 borda-costurada-azul hover:shadow-md transition-shadow"
 >
 <div className="text-vermelho-chita mb-4">
 <Icon size={40} />
 </div>
 <h3 className="font-serif text-xl mb-3 text-azul-royal leading-tight">{p.titulo}</h3>
 <p className="text-tinta-suave leading-relaxed">{p.body}</p>
 </div>
 );
 })}
 </div>
 </Secao>
 );
}

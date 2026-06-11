import { Secao, Eyebrow, TituloEditorial, Manuscrita } from "./marca";

export default function Faq() {
 const perguntas = [
 { q: "Funciona pra quem nunca pegou numa agulha?", a: "Funciona sim, linda. Não tem mistério — é só entender a dinâmica do ponto. Eu explico cada detalhe, agulha por agulha, como se estivesse sentada ao seu lado." },
 { q: "Quanto tempo leva pra terminar a primeira bolsa?", a: "Em 7 dias, no seu ritmo, você termina sua primeira peça. Algumas alunas fazem em 5, outras em 10. Aqui ninguém corre." },
 { q: "Preciso comprar muito material antes de começar?", a: "Não. Você pode começar com o que já tem em casa: agulha, linha, um pedaço de tecido. Na primeira aula eu explico tudo, e tem a Lista de Fornecedores caso queira comprar de uma vez." },
 { q: "Preciso de máquina de costura?", a: "Não. Tudo é feito à mão, com agulha e linha. Sem máquina, sem complicação." },
 { q: "Como funciona o acesso?", a: "Depois da compra, você tem acesso imediato e vitalício ao curso no celular, computador ou tablet. É seu pra sempre — estuda no seu ritmo, quando quiser, quantas vezes precisar." },
 { q: "E se eu não conseguir? Tem garantia mesmo?", a: "Tem 14 dias de garantia incondicional. Se não rolar — por qualquer motivo — você me manda uma mensagem e eu devolvo cada centavo. Sem perguntas, sem julgamento." },
 { q: "Tem suporte pra tirar dúvida durante o curso?", a: "Tem. Você entra no grupo exclusivo de alunas, onde eu e as outras bordadeiras respondemos toda semana. E ainda tem o Encontro Ao Vivo de boas-vindas e as Aulas ao Vivo de Dúvidas sob demanda." },
 { q: "Posso aprender no celular ou só no computador?", a: "No celular, no tablet, no computador, na TV. As aulas funcionam em qualquer tela. Várias alunas estudam só pelo celular, na cozinha mesmo." },
 ];

 return (
 <Secao fundo="paper" padding="hero" largura="default" innerClassName="max-w-3xl">
 <div className="text-center mb-12">
 <Eyebrow>Dúvidas</Eyebrow>
 <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
 Talvez você esteja
 <br />
 <Manuscrita tamanho="2xl" cor="vermelho-chita">pensando…</Manuscrita>
 </TituloEditorial>
 </div>

 <div>
 {perguntas.map((p, i) => (
 <details key={i}>
 <summary>{p.q}</summary>
 <p className="text-tinta-suave leading-relaxed text-lg">{p.a}</p>
 </details>
 ))}
 </div>

 <p className="text-center mt-12 text-tinta-suave">
 Não achou sua dúvida?{" "}
 <a
 href="https://wa.me/5531973039899"
 className="text-vermelho-chita underline underline-offset-4 decoration-dashed hover:text-azul-royal transition-colors"
 >
 Me chama no WhatsApp →
 </a>
 </p>
 </Secao>
 );
}

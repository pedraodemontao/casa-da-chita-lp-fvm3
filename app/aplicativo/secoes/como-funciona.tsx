import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita, Selo } from "@/app/components/marca";
import { OFERTA } from "../oferta.config";

const passos = [
  { selo: "Hoje", titulo: "Entra pelo celular", texto: "Depois da compra você recebe o acesso no e-mail e no WhatsApp. Entra com e-mail e senha em aulas.casadachita.com e coloca na tela do celular: um toque e fica igual um aplicativo. Sem loja, sem baixar nada." },
  { selo: "Fim de semana", titulo: "Monta a sua bolsa comigo", texto: "Material, molde, montagem e ferragem, aula por aula. No fim do fim de semana a bolsa está na sua mão. Se travar na cor, Cores da Chita. Se esquecer o ponto, Os pontos." },
  { selo: "Toda noite", titulo: "Vinte minutinhos, no seu ritmo", texto: "O Desafio 25 Pontos, um dia de cada vez. O Meu próximo bordado te diz o que fazer depois. O diário guarda cada peça. E quando ficar na dúvida, você pergunta, e eu respondo." },
];

export function ComoFunciona() {
  return (
    <Secao fundo="paper" padding="default" largura="default">
      <div className="mb-12 text-center">
        <Eyebrow>Como funciona</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
          Do “será que eu consigo?”
          <br />
          <Destaque>ao “fui eu que fiz”.</Destaque>
        </TituloEditorial>
      </div>
      <ol className="space-y-6">
        {passos.map((p, i) => (
          <li key={i} className="relative bg-creme-claro p-7 borda-costurada md:flex md:items-start md:gap-8">
            <div className="mb-3 md:mb-0 md:w-40 md:shrink-0">
              <Selo>{p.selo}</Selo>
            </div>
            <div>
              <TituloEditorial as="h3" tamanho="sm" className="mb-2">
                {p.titulo}
              </TituloEditorial>
              <p className="text-lg leading-relaxed text-tinta-suave">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center font-serif text-2xl italic text-azul-royal">
        Acesso vitalício.{" "}
        <Manuscrita tamanho="lg" cor="vermelho-chita" className="not-italic">
          a bolsa é sua pra sempre ✿
        </Manuscrita>
      </p>
      <p className="mt-4 text-center text-base text-tinta-suave">
        Precisa de ajuda pra entrar? <a href={OFERTA.whatsapp} className="text-vermelho-chita underline decoration-dashed underline-offset-4">Fala com a gente no WhatsApp</a>. Responde uma pessoa de verdade.
      </p>
    </Secao>
  );
}

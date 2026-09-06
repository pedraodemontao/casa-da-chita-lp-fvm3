import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita, ListaItens, BordaTracejada } from "@/app/components/marca";

/** Dor do meio do caminho (avatar.md): não é "não sei bordar", é "travo sozinha e largo". */
export function Travou() {
  return (
    <Secao fundo="paper-claro" padding="default" largura="wide">
      <div className="mb-12 text-center">
        <Eyebrow>Sabe quando…</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
          Você não trava porque não sabe bordar.
          <br />
          <Destaque>Trava porque está sozinha na frente do tecido.</Destaque>
        </TituloEditorial>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative bg-creme p-8 borda-costurada">
          <TituloEditorial as="h3" tamanho="sm" className="mb-5">
            O que as minhas alunas me contam
          </TituloEditorial>
          <ListaItens
            icone="ponto"
            cor="vermelho-chita"
            items={[
              { texto: "Na hora de bordar eu travo: qual cor eu uso aqui? qual ponto vai aqui?", italic: true },
              { texto: "Comprei a linha errada. Não sei onde acha o tecido bom na minha cidade.", italic: true },
              { texto: "E agora, Jacira? O que eu bordo depois dessa?", italic: true },
              { texto: "Tenho medo de empolgar agora e daqui a pouco largar, igual fiz com o crochê.", italic: true },
            ]}
          />
        </div>
        <div className="relative bg-azul-royal p-8 text-creme">
          <TituloEditorial as="h3" tamanho="sm" cor="creme" className="mb-5">
            <span className="text-creme">Foi pra isso que eu fiz o aplicativo</span>
          </TituloEditorial>
          <ListaItens
            icone="flor"
            cor="mostarda"
            corTexto="text-creme/90"
            items={[
              "Travou na cor? Manda a foto da chita, eu te mostro a linha e o porquê.",
              "Esqueceu o ponto? Abre e me vê fazendo, um por um.",
              "Ficou na dúvida? Pergunta. Eu respondo com o que já expliquei nas aulas, com o minuto pra conferir.",
              "Terminou uma parte? Mostra pra mim que eu dou uma olhada.",
              "Não sabe o que fazer depois? Responde cinco perguntas e eu te digo o que dá pra bordar hoje, com o que tem em casa.",
            ]}
          />
          <BordaTracejada cor="creme" inset={2} />
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl italic leading-snug text-azul-royal md:text-3xl">
        Você nunca fica sozinha na frente do tecido.
        <br />
        <Manuscrita tamanho="lg" cor="vermelho-chita" className="not-italic">
          a Jacira fica no seu celular ✿
        </Manuscrita>
      </p>
    </Secao>
  );
}

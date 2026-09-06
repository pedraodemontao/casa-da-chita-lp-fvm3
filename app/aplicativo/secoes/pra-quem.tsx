import { Secao, Eyebrow, TituloEditorial, Destaque, ListaItens } from "@/app/components/marca";

export function PraQuemApp() {
  return (
    <Secao fundo="paper" padding="compact" largura="default">
      <div className="mb-10 text-center">
        <Eyebrow>Pra quem é</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
          Se você se viu em <Destaque>alguma dessas</Destaque>, é pra você.
        </TituloEditorial>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ListaItens
            icone="flor"
            cor="vermelho-chita"
            items={[
              "Nunca pegou numa agulha, mas olha uma bolsa de chita e pensa “queria fazer uma”.",
              "Já tentou pelo YouTube, travou na cor ou no ponto e largou.",
              "Quer uma coisa que é só sua, depois de anos cuidando de todo mundo.",
              "Prefere o celular ao computador e não gosta de ficar procurando onde está a aula.",
            ]}
          />
        </div>
        <div>
          <ListaItens
            icone="x"
            cor="azul-royal"
            items={[
              "Não é pra quem quer aprender vinte pontos antes de fazer uma peça. Aqui é poucos pontos, muitas cores.",
              "Não é promessa de renda. Algumas alunas vendem em feira; a maioria faz pra presentear ou pra ter uma atividade que acalma a alma.",
              "Não é curso de máquina: a bolsa é bordada à mão, e a montagem dá pra fazer sem máquina.",
            ]}
          />
        </div>
      </div>
    </Secao>
  );
}

import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita, FotoEmoldurada } from "@/app/components/marca";
import { Celular } from "./celular";

/** O mecanismo único da marca em forma de ferramenta: Cores da Chita. */
export function Mecanismo() {
  return (
    <Secao fundo="paper" padding="default" largura="wide" id="mecanismo">
      <div className="mb-12 text-center">
        <Eyebrow>O segredo que eu repito em toda aula</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
          Não é quantos pontos você sabe.
          <br />
          <Destaque>É a cor que você escolhe.</Destaque>
        </TituloEditorial>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tinta-suave">
          Poucos pontos, muitas cores. Uma chita com a linha certa vira peça de altíssima qualidade. Com a linha errada, some. Por isso a primeira ferramenta do aplicativo é essa:
        </p>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex justify-center">
          <Celular tela="cores" />
        </div>
        <div>
          <Manuscrita tamanho="lg" cor="vermelho-chita" display="block" className="mb-3">
            Cores da Chita
          </Manuscrita>
          <TituloEditorial as="h3" tamanho="md" leading="snug" className="mb-5">
            Manda a foto da sua chita. Eu te mostro a linha que combina, e por quê.
          </TituloEditorial>
          <div className="space-y-4 text-lg leading-relaxed text-tinta-suave">
            <p>
              O aplicativo lê as cores do seu tecido e escolhe, dentro da cartela de linhas que eu uso, a que casa com o fundo, a que puxa a flor pra frente e a que dá o realce. Com o código da meada, pra você levar na loja.
            </p>
            <p>
              E explica do meu jeito: <em>“essa cor puxa a flor, essa acalma o fundo, essa some, não usa pra contornar”</em>. Não é uma máquina escolhendo por você: são as minhas regras de cor, as mesmas que eu ensino ao vivo.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <FotoEmoldurada src="/fotos/bordado-close-flor-vermelha.jpg" alt="Bordado em chita, close na flor vermelha" aspect="1-1" corMoldura="creme" sizes="(max-width: 768px) 50vw, 25vw" />
            <FotoEmoldurada src="/fotos/bolsa-azul-miniflores.jpg" alt="Bolsa azul bordada com flores miúdas" aspect="1-1" corMoldura="creme" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        </div>
      </div>
    </Secao>
  );
}

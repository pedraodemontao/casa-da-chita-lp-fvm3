import { Secao, Eyebrow, TituloEditorial, Destaque, Manuscrita, BordaTracejada } from "@/app/components/marca";
import { Celular } from "./celular";

const pilares = [
  {
    num: "01",
    titulo: "A bolsa",
    manuscrita: "Faça Você Mesma 3.0",
    texto: "Sua primeira bolsa de chita, do molde à ferragem, em um fim de semana. Na máquina doméstica, na de manivela ou na mão: a máquina independe. E a Bolsa Eternizada, um segundo modelo do meu acervo.",
    meta: "6 aulas · 143 min",
  },
  {
    num: "02",
    titulo: "Os pontos",
    manuscrita: "35 Pontos Essenciais",
    texto: "Um ponto por vez, comigo fazendo na tela. Você consulta quando esquece, guarda os seus favoritos e busca por intenção: “quero contornar”, “quero preencher”, “quero uma flor”. E o Desafio 25 Pontos: um dia de cada vez, sete dias, os 25 na mão.",
    meta: "52 pontos catalogados · 106 aulas",
  },
  {
    num: "03",
    titulo: "O aplicativo",
    manuscrita: "a Jacira no seu celular",
    texto: "Cores da Chita, Meu próximo bordado, Mostra pra mim, Pergunta pra Jacira, Buscar nas aulas, Meu ateliê com diário da peça e certificado com o seu nome. Tudo com letra grande, um toque por tela, feito pra quem não gosta de mexer em aplicativo.",
    meta: "funciona no celular, sem baixar nada",
  },
];

const ferramentas = [
  { icone: "🎨", nome: "Cores da Chita", texto: "A foto da chita vira a linha certa, com o código e o porquê." },
  { icone: "🧭", nome: "Meu próximo bordado", texto: "Cinco perguntas e eu digo o que dá pra fazer hoje com o que você tem em casa." },
  { icone: "📷", nome: "Mostra pra mim", texto: "Manda a foto da peça e eu dou uma olhada: um elogio de verdade e uma ideia." },
  { icone: "💬", nome: "Pergunta pra Jacira", texto: "Responde com o que eu já falei nas aulas e mostra o minuto pra você conferir." },
  { icone: "🔎", nome: "Buscar nas aulas", texto: "48 horas de aula e 21 horas de live, por palavra e por minuto." },
  { icone: "🪡", nome: "Meu ateliê", texto: "A história de cada peça sua: uma foto por dia, do primeiro ponto até pronta." },
  { icone: "🏅", nome: "Certificado com seu nome", texto: "Bordadeira Casa da Chita. Pra imprimir e mandar pra família." },
  { icone: "🌙", nome: "Sua noite de bordado", texto: "Se quiser, eu te lembro. Você escolhe o dia e a hora. Nada mais." },
];

export function Dentro() {
  return (
    <Secao fundo="paper-claro" padding="default" largura="wide" id="dentro">
      <div className="mb-12 text-center">
        <Eyebrow>O que vem</Eyebrow>
        <TituloEditorial as="h2" tamanho="lg" leading="snug" className="mt-3">
          Três coisas, numa casa só:
          <br />
          <Destaque>a bolsa, os pontos e o aplicativo.</Destaque>
        </TituloEditorial>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pilares.map((p) => (
          <div key={p.num} className="relative bg-creme p-7 borda-costurada">
            <span className="font-serif text-5xl text-mostarda">{p.num}</span>
            <TituloEditorial as="h3" tamanho="sm" className="mt-2">
              {p.titulo}
            </TituloEditorial>
            <Manuscrita tamanho="md" cor="vermelho-chita" display="block" className="mb-3">
              {p.manuscrita}
            </Manuscrita>
            <p className="text-base leading-relaxed text-tinta-suave">{p.texto}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-azul-royal/70">{p.meta}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_0.8fr]">
        <div>
          <Eyebrow cor="azul-royal">As ferramentas</Eyebrow>
          <TituloEditorial as="h3" tamanho="md" leading="snug" className="mt-3 mb-6">
            Tudo o que você precisa quando trava, num toque.
          </TituloEditorial>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ferramentas.map((f) => (
              <li key={f.nome} className="flex gap-3">
                <span className="text-2xl leading-none" aria-hidden>{f.icone}</span>
                <span>
                  <span className="block font-medium text-azul-royal">{f.nome}</span>
                  <span className="block text-base leading-relaxed text-tinta-suave">{f.texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex justify-center">
          <Celular tela="pergunta" />
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-3xl bg-mostarda p-8 text-center text-azul-royal">
        <Manuscrita tamanho="lg" cor="azul-royal" display="block" className="mb-2">
          e ninguém precisa te ensinar a mexer…
        </Manuscrita>
        <p className="font-serif text-xl italic leading-snug md:text-2xl">
          Letra grande. Um toque por tela. Botão “Falar com a gente” em todo canto, que responde uma pessoa de verdade. No primeiro acesso eu te mostro tudo em três telas.
        </p>
        <BordaTracejada cor="azul-royal" inset={2} />
      </div>
    </Secao>
  );
}

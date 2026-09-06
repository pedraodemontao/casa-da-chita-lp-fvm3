import { Secao, Eyebrow, TituloEditorial, Manuscrita } from "@/app/components/marca";
import { OFERTA } from "../oferta.config";

export function FaqApp() {
  const perguntas = [
    { q: "Não sei mexer em aplicativo. Vou conseguir?", a: "Vai, linda. É um toque no ícone e você está lá dentro. No primeiro acesso eu te mostro tudo em três telas. A letra é grande, tem um botão pra deixar maior ainda, e o “Falar com a gente” abre o WhatsApp: responde uma pessoa de verdade." },
    { q: "Precisa baixar da loja? Ocupa espaço?", a: "Não precisa baixar nada. Você entra pelo navegador do celular e coloca na tela inicial, que fica igual um aplicativo. Funciona no Android e no iPhone. Não ocupa espaço." },
    { q: "Nunca peguei numa agulha. Funciona pra mim?", a: "Funciona. A aula da bolsa foi feita pra quem nunca pegou. Não tem mistério, é só entender a dinâmica do ponto. E o Desafio 25 Pontos é um por dia, no seu ritmo. Se travar, você pergunta." },
    { q: "Preciso de máquina de costura?", a: "A máquina independe. Doméstica, de manivela ou na mão: eu mostro os três jeitos. A bolsa é bordada à mão." },
    { q: "Tenho medo de começar e largar.", a: "Por isso tem o diário da peça, o lembrete da sua noite de bordado (só se você quiser), o Bordadinho da semana e eu te perguntando “e agora?”. Você não fica sozinha com o material na gaveta." },
    { q: "Já tentei pelo YouTube e desisti.", a: "O YouTube te mostra o ponto. Aqui eu te levo pelo caminho: qual cor, qual ponto, o que fazer depois. E quando você trava, você me pergunta e eu respondo com o que já expliquei nas aulas, com o minuto pra conferir." },
    { q: "Como funciona o acesso?", a: "Depois da compra você recebe e-mail e mensagem com o seu acesso. É vitalício: a bolsa e os pontos são seus pra sempre. O aplicativo vai ganhando coisa nova e você recebe junto." },
    { q: "Já sou aluna do Faça Você Mesma. Pago de novo?", a: "Não. Você já está lá dentro. Entra em aulas.casadachita.com com o mesmo e-mail e senha de sempre e o aplicativo é seu." },
    { q: "E se eu não gostar?", a: `${OFERTA.garantiaDias} dias de garantia incondicional. Se não for pra você, por qualquer motivo, me manda uma mensagem e eu devolvo tudo. Sem pergunta, sem letra miúda.` },
  ];
  return (
    <Secao fundo="paper" padding="hero" largura="default" innerClassName="max-w-3xl">
      <div className="mb-12 text-center">
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
            <p className="text-lg leading-relaxed text-tinta-suave">{p.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-12 text-center text-tinta-suave">
        Não achou sua dúvida?{" "}
        <a href={OFERTA.whatsapp} className="text-vermelho-chita underline decoration-dashed underline-offset-4 transition-colors hover:text-azul-royal">
          Me chama no WhatsApp →
        </a>
      </p>
    </Secao>
  );
}

import { Secao, Eyebrow, TituloEditorial, Manuscrita } from "@/app/components/marca";

/** Política de confiança (05-copy-app.md §12) — escrita no app, repetida aqui. */
export function Confianca() {
  const itens = [
    { t: "Pagamento único.", d: "Não é assinatura. Paga uma vez, é seu pra sempre. Nada renova sozinho." },
    { t: "Seu preço não sobe.", d: "Se um dia você quiser o Clube, o preço que você vê é o que você paga enquanto for aluna. Combinado é combinado." },
    { t: "Parar é um toque.", d: "No Clube, antes de renovar eu te aviso. Se quiser parar, é um toque, sem pergunta." },
    { t: "Responde uma pessoa.", d: "O botão “Falar com a gente” está em toda tela do aplicativo e abre o WhatsApp. Do outro lado tem gente de verdade." },
  ];
  return (
    <Secao fundo="paper-claro" padding="compact" largura="default">
      <div className="mb-8 text-center">
        <Eyebrow>Combinado é combinado</Eyebrow>
        <TituloEditorial as="h2" tamanho="md" leading="snug" className="mt-3">
          O que eu prometo, escrito.
        </TituloEditorial>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {itens.map((i) => (
          <li key={i.t} className="relative bg-creme p-6 borda-costurada">
            <p className="font-serif text-xl text-azul-royal">{i.t}</p>
            <p className="mt-2 text-base leading-relaxed text-tinta-suave">{i.d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Manuscrita tamanho="md" cor="vermelho-chita">sem letra miúda ✿</Manuscrita>
      </p>
    </Secao>
  );
}

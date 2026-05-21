/**
 * Lista de itens com ícone à esquerda — usada em "o que tá incluso",
 * "antes/depois", checklist de garantias.
 *
 * @example
 * <ListaItens icone="check" cor="vermelho-chita" items={[
 *   "Acesso vitalício",
 *   "14 dias de garantia",
 *   "Grupo de alunas",
 * ]} />
 */

type Icone = "check" | "flor" | "x" | "ponto";
type Cor = "vermelho-chita" | "mostarda" | "azul-royal" | "creme";

const iconeChar: Record<Icone, string> = {
  check: "✓",
  flor: "❀",
  x: "✕",
  ponto: "•",
};

const corClass: Record<Cor, string> = {
  "vermelho-chita": "text-vermelho-chita",
  mostarda: "text-mostarda",
  "azul-royal": "text-azul-royal",
  creme: "text-creme",
};

type Props = {
  items: (string | { texto: string; italic?: boolean })[];
  icone?: Icone;
  cor?: Cor;
  /** Cor do texto. Default herda do pai. */
  corTexto?: string;
  /** Aparência inline (chip) vs lista (uma por linha). Default "lista". */
  formato?: "lista" | "inline";
  className?: string;
};

export function ListaItens({
  items,
  icone = "check",
  cor = "vermelho-chita",
  corTexto = "text-tinta-suave",
  formato = "lista",
  className = "",
}: Props) {
  const Wrapper = formato === "lista" ? "ul" : "div";
  const wrapperClass =
    formato === "lista"
      ? `space-y-4 ${className}`
      : `flex flex-wrap gap-x-5 gap-y-2 text-sm ${corTexto} ${className}`;

  return (
    <Wrapper className={wrapperClass}>
      {items.map((item, i) => {
        const texto = typeof item === "string" ? item : item.texto;
        const isItalic = typeof item === "object" && item.italic;

        if (formato === "inline") {
          return (
            <span key={i} className="flex items-center gap-2">
              <span className={corClass[cor]}>{iconeChar[icone]}</span>
              <span>{texto}</span>
            </span>
          );
        }

        return (
          <li key={i} className={`flex gap-3 ${corTexto} leading-relaxed`}>
            <span className={`${corClass[cor]} mt-1`}>{iconeChar[icone]}</span>
            <span className={isItalic ? "italic" : ""}>
              {isItalic ? `“${texto}”` : texto}
            </span>
          </li>
        );
      })}
    </Wrapper>
  );
}

/**
 * Borda dashed posicionada DENTRO de um container relativo.
 * Cria o efeito de "moldura costurada interna" sobre blocos coloridos.
 *
 * Requer que o container pai tenha `position: relative`.
 *
 * @example
 * <div className="relative bg-azul-royal p-10">
 *   <h3>Conteúdo</h3>
 *   <BordaTracejada cor="creme" inset={2} />
 * </div>
 */

type Cor = "creme" | "azul-royal" | "mostarda";

const corClass: Record<Cor, string> = {
  creme: "border-creme/30",
  "azul-royal": "border-azul-royal/20",
  mostarda: "border-mostarda/40",
};

type Props = {
  cor?: Cor;
  /** Distância do inset em unidades Tailwind (1 = 4px). Default 2 (8px). */
  inset?: 1 | 2 | 3 | 4;
  espessura?: "thin" | "base";
};

export function BordaTracejada({
  cor = "creme",
  inset = 2,
  espessura = "thin",
}: Props) {
  const insetClass = `inset-${inset}`;
  const borderClass = espessura === "thin" ? "border" : "border-2";
  return (
    <div
      className={`absolute ${insetClass} ${borderClass} border-dashed ${corClass[cor]} pointer-events-none`}
      aria-hidden
    />
  );
}

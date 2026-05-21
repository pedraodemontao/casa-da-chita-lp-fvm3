import { type ReactNode } from "react";

/**
 * Trecho de título destacado em italic vermelho (ou cor alternativa).
 * Use dentro de <TituloEditorial>.
 *
 * @example
 * <TituloEditorial>
 *   De quem nunca pegou uma agulha
 *   a quem bordou a <Destaque>primeira bolsa</Destaque>.
 * </TituloEditorial>
 */

type Cor = "vermelho-chita" | "mostarda" | "creme";

const corClass: Record<Cor, string> = {
  "vermelho-chita": "text-vermelho-chita",
  mostarda: "text-mostarda",
  creme: "text-creme",
};

type Props = {
  children: ReactNode;
  cor?: Cor;
  italic?: boolean;
  className?: string;
};

export function Destaque({
  children,
  cor = "vermelho-chita",
  italic = true,
  className = "",
}: Props) {
  return (
    <span
      className={`${corClass[cor]} ${italic ? "italic" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

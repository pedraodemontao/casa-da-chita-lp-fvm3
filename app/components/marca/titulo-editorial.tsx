import { type ReactNode } from "react";

type Tag = "h1" | "h2" | "h3" | "h4";

/**
 * Título editorial padrão da Casa da Chita — DM Serif Display, kerning fechado.
 * Suporta H1/H2/H3 e diferentes tamanhos.
 *
 * Use junto com <Destaque> pra trecho italic vermelho dentro do título.
 *
 * @example
 * <TituloEditorial as="h1" tamanho="lg">
 *   Em 7 dias, sua primeira bolsa bordada.
 *   <br />
 *   <Destaque>Mesmo que você nunca tenha pegado uma agulha.</Destaque>
 * </TituloEditorial>
 */

type Tamanho = "xl" | "lg" | "md" | "sm";
type Cor = "azul-royal" | "creme" | "tinta";
type Leading = "tight" | "snug" | "normal";

const tamanhoClass: Record<Tamanho, string> = {
  xl: "text-5xl md:text-6xl",   // Hero H1: 48/60 → 60/72
  lg: "text-3xl md:text-5xl",   // H2 padrão: 30/36 → 48/60
  md: "text-3xl md:text-4xl",   // H2 menor: 30/36 → 36/48
  sm: "text-2xl md:text-3xl",   // H3
};

const corClass: Record<Cor, string> = {
  "azul-royal": "text-azul-royal",
  creme: "text-creme",
  tinta: "text-tinta",
};

const leadingClass: Record<Leading, string> = {
  tight: "leading-[1.05]",
  snug: "leading-tight",
  normal: "leading-snug",
};

type Props = {
  children: ReactNode;
  as?: Tag;
  tamanho?: Tamanho;
  cor?: Cor;
  leading?: Leading;
  className?: string;
};

export function TituloEditorial({
  children,
  as: Component = "h2",
  tamanho = "lg",
  cor = "azul-royal",
  leading = "snug",
  className = "",
}: Props) {
  return (
    <Component
      className={`font-serif ${tamanhoClass[tamanho]} ${corClass[cor]} ${leadingClass[leading]} ${className}`}
    >
      {children}
    </Component>
  );
}

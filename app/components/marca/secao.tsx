import { type ReactNode } from "react";

/**
 * Wrapper de seção padrão da Casa da Chita.
 * Padroniza fundo, padding vertical e largura do container.
 *
 * @example
 * <Secao fundo="paper" padding="default" largura="wide">
 *   <Eyebrow>A virada</Eyebrow>
 *   ...
 * </Secao>
 */

type Fundo =
  | "paper"          // bg-paper (creme + grain)
  | "paper-claro"    // bg-paper-claro
  | "papel-amassado" // bg-papel-amassado
  | "creme"          // bg-creme sólido (sem grain)
  | "creme-claro"    // bg-creme-claro sólido
  | "azul-royal"     // azul + texto creme
  | "mostarda"       // mostarda + texto azul
  | "transparente";

type Padding = "compact" | "default" | "generous" | "hero" | "nenhum";
type Largura = "narrow" | "default" | "large" | "wide" | "ultra" | "full";

const fundoClass: Record<Fundo, string> = {
  paper: "bg-paper",
  "paper-claro": "bg-paper-claro",
  "papel-amassado": "bg-papel-amassado",
  creme: "bg-creme",
  "creme-claro": "bg-creme-claro",
  "azul-royal": "bg-azul-royal text-creme",
  mostarda: "bg-mostarda text-azul-royal",
  transparente: "",
};

const paddingClass: Record<Padding, string> = {
  compact: "py-14 md:py-20",
  default: "py-20 md:py-24",
  generous: "py-24 md:py-32",
  hero: "py-14 md:py-24",
  nenhum: "",
};

const larguraClass: Record<Largura, string> = {
  narrow: "max-w-2xl",
  default: "max-w-4xl",
  large: "max-w-5xl",
  wide: "max-w-6xl",
  ultra: "max-w-7xl",
  full: "",
};

type Props = {
  children: ReactNode;
  fundo?: Fundo;
  padding?: Padding;
  largura?: Largura;
  id?: string;
  className?: string;
  /** Classe extra aplicada ao container interno (max-w + mx-auto + px). */
  innerClassName?: string;
  /** Above-the-fold: desliga content-visibility (renderiza imediatamente). */
  priority?: boolean;
};

export function Secao({
  children,
  fundo = "paper",
  padding = "default",
  largura = "wide",
  id,
  className = "",
  innerClassName = "",
  priority = false,
}: Props) {
  return (
    <section
      id={id}
      className={`${fundoClass[fundo]} ${paddingClass[padding]} relative overflow-hidden ${priority ? "" : "cv-auto"} ${className}`}
    >
      <div
        className={`${larguraClass[largura]} mx-auto px-5 md:px-6 relative ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

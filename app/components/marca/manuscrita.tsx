import { type ReactNode } from "react";

/**
 * Texto manuscrito (Allura) usado em bordões afetivos e assinaturas.
 * Use SEMPRE como acento — nunca como corpo de texto.
 *
 * @example
 * <Manuscrita tamanho="md" cor="vermelho-chita">Olá, querida ✿</Manuscrita>
 * <Manuscrita tamanho="lg" cor="mostarda">— Jacira, da Casa da Chita</Manuscrita>
 */

type Tamanho = "sm" | "md" | "lg" | "xl" | "2xl";
type Cor = "azul-royal" | "mostarda" | "vermelho-chita" | "creme";

const tamanhoClass: Record<Tamanho, string> = {
  sm: "text-xl",    // 20px
  md: "text-2xl",   // 24px (padrão)
  lg: "text-3xl",   // 30px
  xl: "text-4xl",   // 36px
  "2xl": "text-5xl", // 48px
};

const corClass: Record<Cor, string> = {
  "azul-royal": "text-azul-royal",
  mostarda: "text-mostarda",
  "vermelho-chita": "text-vermelho-chita",
  creme: "text-creme",
};

type Props = {
  children: ReactNode;
  tamanho?: Tamanho;
  cor?: Cor;
  /** Display: "inline-block" (padrão), "block", ou "inline". */
  display?: "inline-block" | "block" | "inline";
  className?: string;
};

const displayClass: Record<NonNullable<Props["display"]>, string> = {
  "inline-block": "inline-block",
  block: "block",
  inline: "inline",
};

export function Manuscrita({
  children,
  tamanho = "md",
  cor = "azul-royal",
  display = "inline-block",
  className = "",
}: Props) {
  return (
    <span
      className={`manuscrita ${tamanhoClass[tamanho]} ${corClass[cor]} ${displayClass[display]} ${className}`}
    >
      {children}
    </span>
  );
}

import { type ReactNode } from "react";

/**
 * Texto pequeno em uppercase com tracking generoso usado acima de títulos.
 * Estilo: "A virada", "A garantia", "Curso da Casa da Chita".
 *
 * @example
 * <Eyebrow>A virada</Eyebrow>
 * <Eyebrow cor="mostarda" tracking="lg">Bônus especial</Eyebrow>
 */

type Cor =
  | "vermelho-chita"
  | "mostarda"
  | "azul-royal"
  | "creme"
  | "tinta-suave";

type Tracking = "default" | "lg";

const corClass: Record<Cor, string> = {
  "vermelho-chita": "text-vermelho-chita",
  mostarda: "text-mostarda",
  "azul-royal": "text-azul-royal",
  creme: "text-creme",
  "tinta-suave": "text-tinta-suave",
};

type Props = {
  children: ReactNode;
  cor?: Cor;
  tracking?: Tracking;
  className?: string;
};

export function Eyebrow({
  children,
  cor = "vermelho-chita",
  tracking = "default",
  className = "",
}: Props) {
  const trackingStyle =
    tracking === "lg" ? { letterSpacing: "0.35em" } : { letterSpacing: "0.3em" };

  return (
    <span
      className={`text-xs uppercase font-sans ${corClass[cor]} ${className}`}
      style={trackingStyle}
    >
      {children}
    </span>
  );
}

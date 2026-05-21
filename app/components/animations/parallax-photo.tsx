import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Mantido por compatibilidade — ignorado desde a remoção do parallax. */
  range?: number;
  className?: string;
};

/**
 * Antes era parallax via framer-motion (transform ligado ao scroll).
 * Removido pra tirar JS de scroll da thread principal — público em
 * celular fraco era quem mais sofria. Agora é um wrapper estático.
 */
export default function ParallaxPhoto({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>;
}

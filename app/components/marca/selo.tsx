import { type ReactNode } from "react";

/**
 * Selo envelhecido (mostarda) com furos laterais — efeito de etiqueta de papel.
 * Usa a classe `.selo` definida em globals.css.
 *
 * @example
 * <Selo>feito à mão, ensinado com afeto</Selo>
 */

type Props = {
  children: ReactNode;
  className?: string;
};

export function Selo({ children, className = "" }: Props) {
  return (
    <div className={`selo ${className}`.trim()}>{children}</div>
  );
}

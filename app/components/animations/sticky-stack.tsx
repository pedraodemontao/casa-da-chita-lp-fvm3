import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  index: number;
  /** Mantido por compatibilidade com a galeria (não usado mais). */
  total?: number;
  topOffset?: number;
};

/**
 * Card sticky no desktop. Antes tinha scale-on-scroll via framer-motion;
 * removido pra tirar JS de scroll da thread. Agora é position:sticky puro (CSS),
 * que dá o mesmo empilhamento sem nenhuma biblioteca.
 */
export default function StickyStackCard({ children, index, topOffset = 24 }: Props) {
  return (
    <div className="sticky" style={{ top: `${topOffset + index * 24}px` }}>
      {children}
    </div>
  );
}

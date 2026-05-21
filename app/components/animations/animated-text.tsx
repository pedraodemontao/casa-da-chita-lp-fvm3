import FadeInView from "./fade-in-view";

type Props = {
  text: string;
  className?: string;
};

/**
 * Antes revelava palavra por palavra via framer-motion (caro: um transform
 * de scroll por palavra). Agora é um fade simples via CSS (FadeInView) —
 * mantém o charme da entrada, sem JS de scroll na thread.
 */
export default function AnimatedText({ text, className = "" }: Props) {
  return (
    <FadeInView>
      <p className={className}>{text}</p>
    </FadeInView>
  );
}

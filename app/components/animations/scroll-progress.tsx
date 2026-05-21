"use client";

import { useEffect, useRef } from "react";

/**
 * Barra de progresso de scroll no topo.
 * Vanilla (sem framer-motion): lê o scroll uma vez por frame via rAF e
 * escreve só um transform — zero biblioteca, zero reflow forçado.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(90deg, var(--color-azul-royal) 0%, var(--color-mostarda) 50%, var(--color-vermelho-chita) 100%)",
      }}
      aria-hidden
    />
  );
}

"use client";

import { useEffect } from "react";

// Respiro acima da seção alvo (deve casar com scroll-margin-top no globals.css).
const OFFSET = 24;

/**
 * Intercepta cliques em links âncora (`href="#id"`) e faz um scroll robusto.
 *
 * Motivo: as seções usam `content-visibility: auto`, então o navegador estima
 * a altura das seções ainda não renderizadas. Isso faz o destino do scroll cair
 * no lugar errado e "pular". Aqui re-corrigimos a posição até ela estabilizar,
 * conforme as seções entram em viewport e ganham a altura real.
 */
export default function SmoothAnchors() {
  useEffect(() => {
    function alvoTop(el: HTMLElement) {
      return window.scrollY + el.getBoundingClientRect().top - OFFSET;
    }

    function scrollToHash(hash: string) {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      window.scrollTo({ top: alvoTop(el), behavior: "smooth" });

      // Re-corrige enquanto as alturas reais não estabilizam.
      let tries = 0;
      const corrigir = () => {
        const desejado = alvoTop(el);
        if (Math.abs(window.scrollY - desejado) > 4 && tries < 6) {
          tries++;
          window.scrollTo({ top: desejado, behavior: "smooth" });
          window.setTimeout(corrigir, 220);
        }
      };
      window.setTimeout(corrigir, 260);

      history.replaceState(null, "", hash);
    }

    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href") || "";
      if (hash.length < 2 || !document.getElementById(hash.slice(1))) return;
      e.preventDefault();
      scrollToHash(hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

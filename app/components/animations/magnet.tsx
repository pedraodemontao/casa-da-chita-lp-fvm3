"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Distância em px do mouse pro centro pra "ativar". */
  padding?: number;
  /** Quanto o elemento se move (divisor). Maior = movimento menor. */
  strength?: number;
  className?: string;
};

/**
 * Magnet effect — segue o cursor sutilmente quando ele se aproxima.
 * Desabilitado em touch devices e quando prefers-reduced-motion.
 * Vanilla (sem framer-motion).
 */
export default function Magnet({
  children,
  padding = 100,
  strength = 6,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [reduce, setReduce] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < max) {
        setDelta({ x: dx / strength, y: dy / strength });
      } else {
        setDelta({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [padding, strength, reduce, isTouch]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${delta.x}px, ${delta.y}px, 0)`,
        transition:
          delta.x === 0 && delta.y === 0
            ? "transform 0.6s ease-in-out"
            : "transform 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

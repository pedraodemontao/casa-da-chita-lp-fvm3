"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fym3_offer_start";
const DURATION_MS = 24 * 60 * 60 * 1000; // 24h

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function computeTimeLeft(startMs: number): TimeLeft {
  const remaining = startMs + DURATION_MS - Date.now();
  if (remaining <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    hours: Math.floor(remaining / (1000 * 60 * 60)),
    minutes: Math.floor((remaining / (1000 * 60)) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    expired: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown24h({
  onExpire,
}: {
  onExpire?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 24,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    setMounted(true);

    let start = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!start || isNaN(start)) {
      start = Date.now();
      localStorage.setItem(STORAGE_KEY, start.toString());
    }

    const tick = () => {
      const tl = computeTimeLeft(start);
      setTimeLeft(tl);
      if (tl.expired && onExpire) onExpire();
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onExpire]);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-3 text-azul-royal">
        <span className="text-xs tracking-[0.25em] uppercase">Oferta expira em</span>
        <span className="font-serif text-2xl tabular-nums">24:00:00</span>
      </div>
    );
  }

  if (timeLeft.expired) {
    return null;
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <span className="text-xs tracking-[0.25em] uppercase text-vermelho-chita">
        Oferta encerra em
      </span>
      <div className="flex gap-3 md:gap-4 items-baseline font-serif text-azul-royal tabular-nums">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl leading-none">{pad(timeLeft.hours)}</span>
          <span className="text-[10px] tracking-widest uppercase text-tinta-suave mt-1">
            horas
          </span>
        </div>
        <span className="text-2xl md:text-3xl text-mostarda leading-none">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl leading-none">{pad(timeLeft.minutes)}</span>
          <span className="text-[10px] tracking-widest uppercase text-tinta-suave mt-1">
            min
          </span>
        </div>
        <span className="text-2xl md:text-3xl text-mostarda leading-none">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl leading-none">{pad(timeLeft.seconds)}</span>
          <span className="text-[10px] tracking-widest uppercase text-tinta-suave mt-1">
            seg
          </span>
        </div>
      </div>
    </div>
  );
}

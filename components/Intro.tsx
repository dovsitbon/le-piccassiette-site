"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PALETTE, plateShards } from "@/lib/mosaic.js";

const KEY = "piccassiette-intro";
const SHARDS = plateShards({ cx: 66, cy: 66, r: 51.6, seed: 11 });

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) : sur fond crème, les éclats de mosaïque
 * se posent un à un depuis l'extérieur, le bord de l'assiette se dessine, « LE PICCASSIETTE » apparaît, fondu sur le hero.
 * Bouton « Passer » ; ignorée si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  // Ordre de pose : du centre vers le bord, chaque éclat arrive de sa direction
  const step = 0.55 / SHARDS.length;
  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-ink">
      <svg viewBox="0 0 132 132" className="h-40 w-40 overflow-visible md:h-48 md:w-48" aria-hidden="true">
        <circle cx="66" cy="66" r="60" fill="none" stroke={PALETTE.ink} strokeWidth="3.3" pathLength={1} className="intro-rim" />
        {SHARDS.map((s, i) => {
          const dx = (s.cx - 66) * 1.4;
          const dy = (s.cy - 66) * 1.4 - 18;
          const style = { "--d": `${(i * step).toFixed(3)}s`, "--dx": `${dx.toFixed(1)}px`, "--dy": `${dy.toFixed(1)}px`, "--rot": `${(i % 2 ? 1 : -1) * (12 + (i % 5) * 6)}deg` } as CSSProperties;
          return <path key={s.d} d={s.d} fill={s.fill} stroke={PALETTE.cream} strokeWidth="2.7" strokeLinejoin="round" className="intro-shard" style={style} />;
        })}
      </svg>
      <div className="intro-word mt-7" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-word.svg" alt="" width={300} height={66} className="h-auto w-60 md:w-72" />
      </div>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 rounded-full px-4 font-semibold text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}

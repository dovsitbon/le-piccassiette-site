import { looseShards, PALETTE, plateShards } from "@/lib/mosaic.js";

/** L'assiette en mosaïque (même dessin que le logo), en SVG inline. */
export function Plate({ className = "h-32 w-32", seed = 11, grout = PALETTE.cream, rim = PALETTE.ink, plate = PALETTE.cream }: { className?: string; seed?: number; grout?: string; rim?: string; plate?: string }) {
  const shards = plateShards({ cx: 66, cy: 66, r: 51.6, seed });
  return (
    <svg viewBox="0 0 132 132" className={className} aria-hidden="true">
      <circle cx="66" cy="66" r="60" fill={plate} stroke={rim} strokeWidth="3.3" />
      {shards.map((s) => (
        <path key={s.d} d={s.d} fill={s.fill} stroke={grout} strokeWidth="2.7" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Quelques éclats isolés, pour ponctuer un bloc (décor discret). */
export function Shards({ className = "", n = 5, seed = 3 }: { className?: string; n?: number; seed?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {looseShards(n, seed).map((s) => (
        <path key={s.d} d={s.d} fill={s.fill} />
      ))}
    </svg>
  );
}

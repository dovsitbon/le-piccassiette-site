// L'assiette en mosaïque (pique-assiette) : des éclats de faïence colorés, posés en anneaux, avec un joint crème.
// Utilisée par le logo (scripts/logo.mjs), l'ouverture du site et les emplacements de photos.
// En JavaScript simple pour être partagée entre les composants (TypeScript) et les scripts Node.

export const PALETTE = {
  teal: "#1F5F6B",
  mustard: "#E0A82E",
  coral: "#E2674A",
  cream: "#FAF3E7",
  ink: "#22201E",
  sky: "#8FB8B4",
  wood: "#8B5E3C",
};

// Tirage pseudo-aléatoire reproductible : la même assiette à chaque rendu (serveur et navigateur).
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const COLORS = [PALETTE.teal, PALETTE.mustard, PALETTE.coral, PALETTE.sky, PALETTE.teal, PALETTE.coral, PALETTE.mustard, PALETTE.wood];
const r2 = (n) => Math.round(n * 100) / 100;

/**
 * Éclats d'une assiette de rayon `r` centrée en (cx, cy).
 * @returns {{ d: string, fill: string, cx: number, cy: number }[]} tracés fermés + centre de chaque éclat
 */
export function plateShards({ cx = 60, cy = 60, r = 52, seed = 7, rings = [0.3, 0.64, 1], counts = [1, 7, 11] } = {}) {
  const rand = rng(seed);
  const out = [];
  let k = 0;
  const pt = (a, rad) => [r2(cx + Math.cos(a) * rad), r2(cy + Math.sin(a) * rad)];
  rings.forEach((outer, ri) => {
    const inner = ri === 0 ? 0 : rings[ri - 1];
    const n = counts[ri];
    const offset = rand() * Math.PI * 2;
    // Angles de coupe un peu irréguliers, comme des éclats cassés à la main
    const cuts = Array.from({ length: n }, (_, i) => offset + ((i + 0.5 + (rand() - 0.5) * 0.5) / n) * Math.PI * 2);
    for (let i = 0; i < n; i++) {
      let pts;
      if (ri === 0) {
        // Centre : un éclat à cinq ou six côtés
        const m = 6;
        pts = Array.from({ length: m }, (_, j) => pt(offset + (j / m) * Math.PI * 2 + (rand() - 0.5) * 0.4, outer * r * (0.82 + rand() * 0.18)));
      } else {
        const a0 = cuts[i];
        const a1 = i === n - 1 ? cuts[0] + Math.PI * 2 : cuts[i + 1];
        const mid = (a0 + a1) / 2 + (rand() - 0.5) * 0.15;
        const ro = outer * r;
        const rin = inner * r * (0.98 + rand() * 0.05);
        const rm = ((ro + rin) / 2) * (0.96 + rand() * 0.08);
        pts = [pt(a0, rin), pt(a0 + (rand() - 0.5) * 0.06, rm), pt(a0, ro), pt(mid, ro), pt(a1, ro), pt(a1 + (rand() - 0.5) * 0.06, rm), pt(a1, rin), pt(mid, rin)];
      }
      const c = pts.reduce((acc, [x, y]) => [acc[0] + x / pts.length, acc[1] + y / pts.length], [0, 0]);
      out.push({ d: `M${pts.map((p) => p.join(" ")).join("L")}Z`, fill: COLORS[(k + (ri === 0 ? 1 : 0)) % COLORS.length], cx: r2(c[0]), cy: r2(c[1]) });
      k++;
    }
  });
  return out;
}

/** Éclats isolés pour décorer (en marge d'un bloc) : petites formes anguleuses. */
export function looseShards(n = 6, seed = 3, size = 100) {
  const rand = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const x = rand() * size;
    const y = rand() * size;
    const s = 5 + rand() * 7;
    const m = 4 + Math.floor(rand() * 2);
    const pts = Array.from({ length: m }, (_, j) => {
      const a = (j / m) * Math.PI * 2 + rand() * 0.6;
      return [r2(x + Math.cos(a) * s * (0.6 + rand() * 0.5)), r2(y + Math.sin(a) * s * (0.6 + rand() * 0.5))];
    });
    return { d: `M${pts.map((p) => p.join(" ")).join("L")}Z`, fill: COLORS[i % COLORS.length] };
  });
}

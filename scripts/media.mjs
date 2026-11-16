// Photos du site.
//   npm run media
//
// 1. Prépare pour le web toutes les photos de assets/hero, plats, apero, salle et facade
//    dans public/media/<dossier>/ (next/image sert ensuite AVIF/WebP à la bonne taille),
//    et note leurs dimensions dans data/media-sizes.json.
// 2. Fabrique l'image de partage public/og.jpg (1200 × 630) : la photo du hero si elle existe, sinon l'assiette en mosaïque.
//
// Pour ajouter une photo prise sur place : déposez-la sous le nom attendu (voir assets/A-PHOTOGRAPHIER.md),
// par ex. assets/plats/bo-bun.jpg, puis relancez « npm run media » : l'aplat illustré disparaît de lui-même.
// assets/raw/ : photos brutes (non publiées telles quelles), à trier dans les dossiers ci-dessus.
import { mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { plateShards, PALETTE } from "../lib/mosaic.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATS = ["hero", "plats", "apero", "salle", "facade", "galerie"];
const exists = (f) => access(f).then(() => true, () => false);

const sizes = {};
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2400 : 1600;
    const info = await sharp(path.join(dir, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}

// Image de partage : à droite la photo du hero (ou l'assiette en mosaïque sur bleu canard), à gauche le logo et la promesse
const heroFile = path.join(ROOT, "assets/hero/hero.jpg");
let right;
if (await exists(heroFile)) right = await sharp(heroFile).rotate().resize(560, 630, { fit: "cover" }).toBuffer();
else {
  const shards = plateShards({ cx: 280, cy: 300, r: 190, seed: 11 });
  right = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="630"><rect width="560" height="630" fill="${PALETTE.teal}"/><rect y="500" width="560" height="130" fill="${PALETTE.wood}"/><circle cx="280" cy="300" r="222" fill="${PALETTE.cream}"/>${shards.map((s) => `<path d="${s.d}" fill="${s.fill}" stroke="${PALETTE.cream}" stroke-width="9" stroke-linejoin="round"/>`).join("")}</svg>`);
  right = await sharp(right).png().toBuffer();
}
const logo = await sharp(path.join(ROOT, "public/logo-word.svg"), { density: 220 }).resize({ width: 520 }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="630">
  <text x="60" y="330" font-family="Georgia, serif" font-weight="700" font-size="40" fill="${PALETTE.ink}">Midi gourmand, soir à l'apéro.</text>
  <text x="60" y="380" font-family="Arial, sans-serif" font-size="25" fill="${PALETTE.teal}">Bo bun · banh mi · sandwichs · rhums arrangés</text>
  <rect x="60" y="414" width="70" height="7" rx="3" fill="${PALETTE.mustard}"/>
  <text x="60" y="468" font-family="Arial, sans-serif" font-size="22" fill="${PALETTE.ink}">Bistro · 9 rue Duméril · Amiens</text>
  <text x="60" y="502" font-family="Arial, sans-serif" font-size="22" fill="${PALETTE.ink}">4,8/5 sur Google · 03 22 22 00 15</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: PALETTE.cream } })
  .composite([
    { input: right, left: 640, top: 0 },
    { input: logo, left: 56, top: 110 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${Object.keys(sizes).length} photos prêtes, og.jpg écrit`);

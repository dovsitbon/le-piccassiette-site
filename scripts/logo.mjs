// Logo typographique du Piccassiette (en attendant le vrai logo de l'enseigne) :
// « LE PICCASSIETTE » en Fraunces très gras, lettres légèrement dansantes, et une assiette en mosaïque.
//   npm run logo
// → public/logo.svg (encre), public/logo-light.svg (crème, sur fond sombre), public/logo-mark.svg (assiette seule),
//   app/icon.svg (favicon), app/apple-icon.png (180 px), public/icon-512.png.
// Pour mettre le vrai logo : remplacez public/logo.svg et public/logo-light.svg (mêmes noms), le site suit.
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { plateShards, PALETTE } from "../lib/mosaic.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const fontFile = path.join(ROOT, "node_modules/@fontsource/fraunces/files/fraunces-latin-800-normal.woff");
const buf = await readFile(fontFile);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

function mark(cx, cy, r, { rim = PALETTE.ink, plate = PALETTE.cream } = {}) {
  const shards = plateShards({ cx, cy, r: r * 0.86, seed: 11 });
  return [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${plate}" stroke="${rim}" stroke-width="${(r * 0.055).toFixed(2)}"/>`,
    ...shards.map((s) => `<path d="${s.d}" fill="${s.fill}" stroke="${plate}" stroke-width="${(r * 0.045).toFixed(2)}" stroke-linejoin="round"/>`),
  ].join("");
}

/** Mot en lettres « joyeuses » : chaque lettre tourne et saute un peu, toujours de la même façon. */
function word(text, x, y, size, fill, wobble = true) {
  const tilt = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3, 2, -2, 3, -1.5, 2.5];
  const lift = [0, -2, 1, -1, 2, 0, -2, 1, -1, 2, 0, -1];
  let cursor = x;
  const parts = [];
  [...text].forEach((ch, i) => {
    const adv = font.getAdvanceWidth(ch, size);
    if (ch !== " ") {
      const dy = wobble ? lift[i % lift.length] * (size / 66) : 0;
      const p = font.getPath(ch, cursor, y + dy, size).toPathData(2);
      const a = wobble ? tilt[i % tilt.length] : 0;
      parts.push(`<path d="${p}" fill="${fill}"${a ? ` transform="rotate(${a} ${(cursor + adv / 2).toFixed(1)} ${(y - size * 0.35).toFixed(1)})"` : ""}/>`);
    }
    cursor += adv + size * 0.02;
  });
  return { svg: parts.join(""), width: cursor - x };
}

function logo(ink, rim) {
  const big = word("PICCASSIETTE", 150, 112, 70, ink);
  const small = word("LE", 152, 46, 30, ink, false);
  const W = Math.ceil(150 + big.width + 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 132" role="img" aria-label="Le Piccassiette"><title>Le Piccassiette</title>${mark(64, 66, 60, { rim })}${small.svg}${big.svg}</svg>`;
}

await writeFile(path.join(ROOT, "public/logo.svg"), logo(PALETTE.ink, PALETTE.ink));
await writeFile(path.join(ROOT, "public/logo-light.svg"), logo(PALETTE.cream, PALETTE.cream));
// Lettrage seul (ouverture du site, quand l'assiette est déjà dessinée à côté)
{
  const big = word("PICCASSIETTE", 4, 112, 70, PALETTE.ink);
  const small = word("LE", 6, 46, 30, PALETTE.ink, false);
  const W = Math.ceil(big.width + 12);
  await writeFile(path.join(ROOT, "public/logo-word.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 132" role="img" aria-label="Le Piccassiette"><title>Le Piccassiette</title>${small.svg}${big.svg}</svg>`);
  console.log("logo-word", W);
}
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 132" role="img" aria-label="Le Piccassiette"><title>Le Piccassiette</title>${mark(66, 66, 60)}</svg>`;
await writeFile(path.join(ROOT, "public/logo-mark.svg"), markSvg);
await writeFile(path.join(ROOT, "app/icon.svg"), markSvg);
// Icône Apple : l'assiette sur fond bleu canard
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" fill="${PALETTE.teal}"/>${mark(90, 90, 66, { rim: PALETTE.cream })}</svg>`;
await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(path.join(ROOT, "app/apple-icon.png"));
await sharp(Buffer.from(appleSvg), { density: 300 }).resize(512, 512).png().toFile(path.join(ROOT, "public/icon-512.png"));
console.log("logo prêt");

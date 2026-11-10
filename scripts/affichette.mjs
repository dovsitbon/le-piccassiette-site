// Affichette A5 imprimable (PDF) avec QR code vers le site, pour le comptoir ou la vitrine.
//   npm run affichette   →   print/affichette-le-piccassiette-a5.pdf (+ aperçu PNG)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";
import { plateShards, PALETTE } from "../lib/mosaic.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const CREAM = hex(PALETTE.cream);
const INK = hex(PALETTE.ink);
const TEAL = hex(PALETTE.teal);
const MUSTARD = hex(PALETTE.mustard);

const pdf = await PDFDocument.create();
pdf.setTitle("Le Piccassiette : affichette A5");
pdf.setAuthor("Le Piccassiette");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);
const serif = await pdf.embedFont(StandardFonts.TimesRomanBold);
const center = (text, font, size, y, color = INK) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM });

// Bandeau du haut : bleu canard, plateau bois, assiette en mosaïque (rasterisée)
const topH = 200;
const shards = plateShards({ cx: 300, cy: 260, r: 160, seed: 11 });
const topSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1260" height="600"><rect width="1260" height="600" fill="${PALETTE.teal}"/><rect y="470" width="1260" height="130" fill="${PALETTE.wood}"/><g transform="translate(330 0)"><circle cx="300" cy="260" r="188" fill="${PALETTE.cream}"/>${shards.map((s) => `<path d="${s.d}" fill="${s.fill}" stroke="${PALETTE.cream}" stroke-width="8" stroke-linejoin="round"/>`).join("")}</g></svg>`;
const top = await sharp(Buffer.from(topSvg)).jpeg({ quality: 90 }).toBuffer();
page.drawImage(await pdf.embedJpg(top), { x: 0, y: H - topH, width: W, height: topH });

// Logo (lettrage)
const logo = await sharp(path.join(ROOT, "public/logo-word.svg"), { density: 300 }).resize(1200).png().toBuffer();
const logoW = 250;
const logoImg = await pdf.embedPng(logo);
const logoH = (logoW * logoImg.height) / logoImg.width;
let y = H - topH - 22 - logoH;
page.drawImage(logoImg, { x: (W - logoW) / 2, y, width: logoW, height: logoH });

y -= 30;
center("Midi gourmand, soir à l'apéro.", serif, 19, y);
y -= 18;
center("Bo bun · banh mi · sandwichs · planches · rhums arrangés", sans, 10.5, y, TEAL);

// QR code dans une carte blanche, bordure moutarde
const qrS = 108;
y -= 24 + qrS;
page.drawRectangle({ x: (W - qrS) / 2 - 11, y: y - 11, width: qrS + 22, height: qrS + 22, color: rgb(1, 1, 1), borderColor: MUSTARD, borderWidth: 3 });
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: PALETTE.ink, light: "#FFFFFF" }, errorCorrectionLevel: "M" });
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 30;
center("Commandez pour midi, réservez l'apéro", bold, 12, y);
y -= 14;
center(url.replace(/^https?:\/\//, ""), sans, 9.5, y, TEAL);

// Pied : infos pratiques sur bandeau moutarde
page.drawRectangle({ x: 0, y: 0, width: W, height: 58, color: MUSTARD });
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, bold, 9.5, 36);
center("Mar. et jeu. 9 h 30 – 22 h · Mer. 9 h 30 – 14 h 30 · Ven. 9 h 30 – 23 h 30 · Sam. 10 h 30 – 15 h", sans, 8, 20);

await mkdir(path.join(ROOT, "print"), { recursive: true });
const file = path.join(ROOT, "print/affichette-le-piccassiette-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", file, url);

// Trie les photos brutes (assets/raw/) dans assets/<dossier>/ avec leur nom attendu par le site, recadre si besoin,
// note les photos d'illustration (banque d'images) dans data/illustrations.json et écrit PHOTOS-SOURCES.md.
//   npm run photos   (puis npm run media)
// Une vraie photo déposée plus tard dans assets/<dossier>/ sous le même nom remplace celle-ci : relancer seulement « npm run media ».
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "assets/raw");

const TA = "https://www.tripadvisor.com/Restaurant_Review-g196657-d5850231-Reviews-Le_Piccassiette-Amiens_Somme_Hauts_de_France.html";
const FB = "https://www.facebook.com/piccassiette/photos";
const GM = "https://www.google.com/maps/place/Le+Piccassiette/ (onglet Photos de la fiche)";

// [cible, source, recadrage {left, top, width, height} ou "trim", contenu, utilisation, origine]
const REAL = [
  ["hero/hero.jpg", "gm_facade.jpg", null, "Façade bleu canard : « Bar · Sandwicherie · Snack »", "Hero de l'accueil, image de partage, données structurées", `Fiche Google Maps (photo publiée sous le nom du bistro, 4000 × 2252), ${GM}`],
  ["facade/facade.jpg", "ta_3.jpg", { left: 200, top: 30, width: 720, height: 540 }, "L'enseigne éclairée le soir, la terrasse", "Infos pratiques", `TripAdvisor (photo 09/c5/88/2e), ${TA}`],
  ["salle/salle.jpg", "fb_facade.png", "trim", "Soirée en terrasse devant le bistro (noir et blanc)", "Bloc « Privatiser », page apéro", `Page Facebook du bistro, ${FB}`],
  ["plats/bo-bun.jpg", "gm_5.jpg", null, "Bo bun aux nems, herbes et cacahuètes", "Carte (Bo bun), tuile Bo bun, bloc « Le midi », page « Bo bun et banh mi »", `Fiche Google Maps, ${GM}`],
  ["plats/salade.jpg", "gm_9.jpg", null, "Grande salade composée (asperges, poivron, feta, olives)", "Carte (La grande salade)", `Fiche Google Maps, ${GM}`],
  ["plats/plat-du-jour.jpg", "gm_2.jpg", null, "Porc grillé, riz, nems et sauce", "Carte (Le plat du jour)", `Fiche Google Maps, ${GM}`],
  ["plats/tuile-moment.jpg", "fb_ardoise-tartiflette.png", { left: 0, top: 125, width: 1026, height: 689 }, "L'ardoise du jour : tartiflette salade", "Tuile « Plats du moment »", `Page Facebook du bistro, ${FB}`],
  ["apero/verres.jpg", "gm_8.jpg", null, "Une bière, une assiette et ses frites au comptoir", "Carte (Vins, bières et softs), tuile « Apéro & planches »", `Fiche Google Maps, ${GM}`],
  ["apero/tuile-apero.jpg", "gm_8.jpg", null, "Une bière, une assiette et ses frites au comptoir", "Tuile « Apéro & planches »", `Fiche Google Maps, ${GM}`],
  ["galerie/riz-porc-cacahuetes.jpg", "gm_3.jpg", null, "Riz, porc caramélisé, cacahuètes et herbes", "Galerie « En vrai »", `Fiche Google Maps, ${GM}`],
  ["galerie/salade-raviolis.jpg", "gm_4.jpg", null, "Salade, raviolis grillés et sauce pimentée", "Galerie « En vrai »", `Fiche Google Maps, ${GM}`],
  ["galerie/poisson-salade.jpg", "gm_6.jpg", null, "Filet de poisson sur lit de salade", "Galerie « En vrai »", `Fiche Google Maps, ${GM}`],
  ["galerie/carpaccio.jpg", "fb_carpaccio.png", { left: 0, top: 0, width: 1150, height: 730 }, "Carpaccio de bœuf, avocat, parmesan", "Galerie « En vrai »", `Page Facebook du bistro, ${FB}`],
  ["galerie/salade-frites.jpg", "fb_salade-frites.png", { left: 0, top: 0, width: 1150, height: 730 }, "Salade au thon et frites, au bar", "Galerie « En vrai »", `Page Facebook du bistro, ${FB}`],
  ["galerie/ardoise-bo-bun.jpg", "fb_ardoise-bobun.png", { left: 60, top: 160, width: 960, height: 654 }, "L'ardoise : bo bun aux crevettes saté et nems", "Galerie « En vrai »", `Page Facebook du bistro, ${FB}`],
  ["galerie/salade-ecrevisses.jpg", "ta_1.jpg", null, "Salade aux écrevisses", "Galerie « En vrai »", `TripAdvisor (photo 10/aa/3f/0b), ${TA}`],
];

// Photos libres de droits (Unsplash, licence gratuite : usage commercial autorisé, pas Unsplash+)
const STOCK = [
  ["plats/banh-mi.jpg", "unsplash/banhmi1.jpg", "Deux banh mi garnis (illustration)", "Carte (Banh mi), tuile Banh mi", "https://unsplash.com/photos/smv9xho-dnE"],
  ["plats/sandwich.jpg", "unsplash/sand2.jpg", "Sandwich baguette garni (illustration)", "Carte (Sandwich du moment), tuile Sandwichs", "https://unsplash.com/photos/GIUc-l74UT8"],
  ["plats/tartiflette.jpg", "unsplash/tarti1.jpg", "Gratin de pommes de terre au fromage (illustration)", "Carte (Tartiflette)", "https://unsplash.com/photos/lqRfdLcZm_w"],
  ["apero/planche.jpg", "unsplash/planche1.jpg", "Planche charcuterie et fromages (illustration)", "Carte (La planche à partager)", "https://unsplash.com/photos/yypStCHlxAA"],
  ["apero/rhums-arranges.jpg", "unsplash/rhum3.jpg", "Bocal de fruits en macération (illustration)", "Carte (Rhum arrangé), tuile Rhums, bloc « L'apéro », page apéro", "https://unsplash.com/photos/Pdn3tgYGsRw"],
];

async function place(target, src, crop) {
  const out = path.join(ROOT, "assets", target);
  await mkdir(path.dirname(out), { recursive: true });
  let img = sharp(path.join(RAW, src)).rotate();
  if (crop === "trim") img = img.trim({ background: "#ffffff", threshold: 40 });
  else if (crop) img = img.extract(crop);
  await img.jpeg({ quality: 92 }).toFile(out);
}

for (const [t, s, c] of REAL) await place(t, s, c);
for (const [t, s] of STOCK) await place(t, s, null);

await writeFile(path.join(ROOT, "data/illustrations.json"), JSON.stringify({ _doc: "Photos d'illustration (banque d'images) : le site les marque « Photo d'illustration ». Retirez une ligne quand la vraie photo la remplace (même nom de fichier dans assets/).", paths: STOCK.map(([t]) => `/media/${t}`) }, null, 1) + "\n");

const realFiles = new Set(REAL.map((r) => r[1]));
const md = [
  "# Le Piccassiette : sources des photos",
  "",
  "Toutes les images du site, leur source et leur licence. Les originaux sont dans `assets/raw/`, les fichiers rangés dans `assets/<dossier>/` (`npm run photos`), les versions web dans `public/media/` (`npm run media`) ; next/image les sert en AVIF/WebP à la bonne taille, en lazy loading.",
  "",
  `**Bilan : ${realFiles.size} photos réelles du Piccassiette (${REAL.length} emplacements), ${STOCK.length} photos libres de droits (Unsplash).**`,
  "",
  "## Photos réelles du Piccassiette",
  "",
  "Publiées sur la page Facebook du bistro, sur sa fiche Google Maps (photos postées sous le nom du bistro ou par des clients) et sur TripAdvisor. **Droits à confirmer avec le bistro** : idéalement, il confirme qu'elles sont à lui ou envoie ses propres photos. Les visages de clients ne sont jamais mis en avant (photo de groupe de dos ou de loin uniquement).",
  "",
  "| Fichier | Contenu | Utilisation | Source |",
  "|---|---|---|---|",
  ...REAL.map(([t, , , what, use, src]) => `| \`assets/${t}\` | ${what} | ${use} | ${src} |`),
  "",
  "Écartées : une photo Google avec autocollant emoji et texte incrusté, une photo de rue où les visages des clients sont bien visibles, les ardoises en double.",
  "",
  "## Photos libres de droits (Unsplash)",
  "",
  "Licence Unsplash : usage commercial gratuit, sans attribution obligatoire (https://unsplash.com/license). Uniquement des photos gratuites (pas Unsplash+). Sur le site, elles portent la mention « Photo d'illustration » et ne sont jamais présentées comme le bistro. À remplacer par de vraies photos dès que possible (liste dans `assets/A-PHOTOGRAPHIER.md`).",
  "",
  "| Fichier | Contenu | Utilisation | Page Unsplash |",
  "|---|---|---|---|",
  ...STOCK.map(([t, , what, use, url]) => `| \`assets/${t}\` | ${what} | ${use} | ${url} |`),
  "",
  "## Logo",
  "",
  "Logo typographique dessiné pour le site (`npm run logo`). La page Facebook montre un vrai logo vert (rond, « Le Piccassiette ») : à récupérer en vectoriel auprès du bistro.",
  "",
];
await writeFile(path.join(ROOT, "PHOTOS-SOURCES.md"), md.join("\n"));
console.log(`${REAL.length} emplacements réels (${realFiles.size} photos), ${STOCK.length} illustrations`);

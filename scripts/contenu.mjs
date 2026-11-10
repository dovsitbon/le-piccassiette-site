// Génère CONTENU.md : tous les textes du site en français et en anglais, la carte et les prix, pour validation par le bistro.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const fr = await read("locales/fr.json");
const en = await read("locales/en.json");
const carte = await read("data/carte.json");
const site = await read("data/site.json");
const horaires = await read("data/horaires.json");

const euro = (n, from) => (n === null ? "**à remplir**" : `${from ? "à partir de " : ""}${n.toFixed(2).replace(".", ",")} €`);
const SKIP = new Set(["alt", "products", "pages", "meta", "carte", "tags"]);
const out = [];
const p = (s = "") => out.push(s);

p("# Le Piccassiette : contenu du site (à valider)");
p();
p("Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`. Tout ce qui manque est marqué **à remplir**.");
p();
p("## À faire valider en priorité");
p();
p("- **Titre du hero** : retenu « Midi gourmand, soir à l'apéro. » Deux autres options : « Le bistro qui a du caractère. » / « Bo bun, banh mi et rhums arrangés. »");
p("- **Les prix** : aucun n'est connu. Le site affiche « Prix à l'ardoise » tant qu'ils ne sont pas dans `data/carte.json`. « à partir de » s'affiche pour les plats dont le prix varie (banh mi, sandwich, planche, verres, rhum arrangé).");
p("- **La carte** : plats repris des thèmes des avis Google (sandwichs, bo bun, banh mi, tartiflette, apéro, rhums arrangés). Les descriptions sont génériques : garnitures, sauces, contenu des planches à préciser.");
p("- **Les rhums arrangés** : la liste des parfums est vide (`data/carte.json → parfums`), le site dit « la liste est à l'ardoise ».");
p("- **Les horaires** : ceux du brief. Une fiche en ligne indique aussi le lundi 9 h 30 – 22 h : à confirmer.");
p("- **La privatisation** (anniversaires) : présentée comme « on regarde ce qui est possible ». À confirmer.");
p("- **L'accès et le stationnement** : texte général (centre-ville, parkings publics à proximité). Nom du parking le plus proche à ajouter.");
p("- **Les patrons** : une fiche en ligne cite Bastien et Omar. Ni leur nom ni l'histoire du nom ne sont sur le site pour l'instant.");
p(`- **La note Google** : ${String(site.rating.value).replace(".", ",")}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked} (à mettre à jour dans \`data/site.json\`).`);
p("- **Les avis** : aucun avis n'est affiché ni inventé. Avec l'accord du bistro, de vrais avis Google peuvent être ajoutés dans `data/avis.json`.");
p("- **Le paiement** : la FAQ dit « sur place ». Cartes acceptées, espèces, titres-restaurant : à préciser.");
p();

p("## Référencement (balises title / description)");
p();
for (const [lang, d] of [["FR", fr], ["EN", en]]) {
  p(`**${lang}** · ${d.meta.title}`);
  p();
  p(`> ${d.meta.description}`);
  p();
}

p("## Horaires (data/horaires.json)");
p();
const days = fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
p();

p("## La carte et les prix (data/carte.json)");
p();
for (const c of carte.categories) {
  p(`### ${fr.carte.tabs[c.id]} / ${en.carte.tabs[c.id]}`);
  p();
  p("| Plat (FR) | Dish (EN) | Prix | Commande en ligne | Pastilles | Description FR | Description EN |");
  p("|---|---|---|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    p(`| ${fr.products[id].name} | ${en.products[id].name} | ${euro(it.price, it.from)} | ${it.orderable ? "oui" : "non"} | ${it.tags.map((t) => fr.tags[t]).join(", ")} | ${fr.products[id].desc} | ${en.products[id].desc} |`);
  }
  p();
}
p(`Rhums arrangés du moment : ${carte.parfums.items.length ? carte.parfums.items.map((x) => x.fr).join(", ") : "**à remplir**"}`);
p();

const walk = (a, b, prefix) => {
  for (const k of Object.keys(a)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const va = a[k];
    const vb = b?.[k];
    if (typeof va === "string") {
      p(`- \`${key}\``);
      p(`  - FR : ${va.replace(/\n/g, " ↵ ")}`);
      p(`  - EN : ${(vb ?? "").replace(/\n/g, " ↵ ")}`);
    } else if (Array.isArray(va)) {
      va.forEach((x, i) => (typeof x === "string" ? (p(`- \`${key}[${i}]\``), p(`  - FR : ${x}`), p(`  - EN : ${vb?.[i] ?? ""}`)) : walk(x, vb?.[i], `${key}[${i}]`)));
    } else if (va && typeof va === "object") walk(va, vb, key);
  }
};

p("## Textes du site");
p();
for (const section of Object.keys(fr)) {
  if (SKIP.has(section)) continue;
  p(`### ${section}`);
  p();
  walk(fr[section], en[section], section);
  p();
}
p("### carte (textes autour de la carte)");
p();
walk(fr.carte, en.carte, "carte");
p();

p("## Pages");
p();
for (const id of Object.keys(fr.pages)) {
  p(`### ${fr.pages[id].title} / ${en.pages[id].title}`);
  p();
  walk(fr.pages[id], en.pages[id], `pages.${id}`);
  p();
}

p("## Textes alternatifs des photos (accessibilité, Google Images)");
p();
walk(fr.alt, en.alt, "alt");
p();

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");

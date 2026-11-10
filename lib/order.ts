import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay, price } from "@/lib/format";
import { isItem, ITEMS, ORDERABLE, unitPrice, type ItemId } from "@/lib/carte";
import { addDays, aperoTimes, pickupTimes } from "@/lib/hours";

export const PREFS = ["noCoriander", "veggie", "mild"] as const;
export type Pref = (typeof PREFS)[number];

export type OrderLine = { item: ItemId; qty: number };
export type Order = { lines: OrderLine[]; day: string; time: string; prefs: Pref[]; name: string; phone: string; email: string; message: string };
export type Resa = { day: string; time: string; guests: number; occasion: string; name: string; phone: string; email: string };

export const emptyLine = (item: ItemId = ORDERABLE[0]): OrderLine => ({ item, qty: 1 });

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Jours proposés : aujourd'hui et les jours suivants qui ont encore un créneau. */
export function pickupDays(now: Date) {
  const today = isoDay(now);
  return Array.from({ length: site.order.daysAhead + 1 }, (_, i) => addDays(today, i)).filter((day) => pickupTimes(day, now).length > 0);
}

/** Dates possibles pour l'apéro (date max du champ). */
export const aperoMaxDay = (now: Date) => addDays(isoDay(now), site.apero.daysAhead);

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
// Marge de 10 minutes : le client a pu choisir son heure juste avant qu'elle ne sorte de la liste
const grace = (now: Date) => new Date(now.getTime() - 10 * 60_000);

/** Nettoie une commande reçue côté serveur : null si elle est incomplète ou hors des heures du midi. */
export function parseOrder(v: unknown, now = new Date()): Order | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 20).flatMap((l): OrderLine[] => {
    if (!l || typeof l !== "object") return [];
    const x = l as Record<string, unknown>;
    if (!isItem(x.item) || !ITEMS[x.item].orderable) return [];
    const qty = Math.min(Math.max(Math.round(Number(x.qty) || 1), 1), site.order.maxPerLine);
    return [{ item: x.item, qty }];
  });
  const day = ISO.test(str(o.day, 10)) ? str(o.day, 10) : "";
  const time = str(o.time, 5);
  const q: Order = {
    lines,
    day,
    time,
    prefs: (Array.isArray(o.prefs) ? o.prefs : []).filter((p): p is Pref => PREFS.includes(p as Pref)),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1000),
  };
  if (!q.lines.length || !day || !pickupTimes(day, grace(now)).includes(time) || !q.name || !isPhone(q.phone)) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Nettoie une demande de réservation apéro. */
export function parseResa(v: unknown, now = new Date()): Resa | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const day = ISO.test(str(o.day, 10)) ? str(o.day, 10) : "";
  const r: Resa = {
    day,
    time: str(o.time, 5),
    guests: Math.min(Math.max(Math.round(Number(o.guests) || 0), 0), site.apero.maxGuests * 5),
    occasion: str(o.occasion, 1000),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
  };
  if (!day || day > aperoMaxDay(now) || !aperoTimes(day, grace(now)).includes(r.time) || r.guests < 1 || !r.name || !isPhone(r.phone)) return null;
  if (r.email && !isEmail(r.email)) r.email = "";
  return r;
}

/** Total estimé ; « partial » si un des plats n'a pas encore de prix. */
export function orderTotal(lines: OrderLine[]) {
  let sum = 0;
  let partial = false;
  for (const l of lines) {
    const p = unitPrice(l.item);
    if (p === null) partial = true;
    else sum += p * l.qty;
  }
  return { sum, partial };
}

const colon = (lang: Locale) => (lang === "fr" ? " :" : ":");

/** Récapitulatif texte de la commande (e-mail, WhatsApp). */
export function orderText(q: Order, lang: Locale, d: Dict, withContact = true) {
  const m = d.order.mail;
  const c = colon(lang);
  const { sum, partial } = orderTotal(q.lines);
  const total = sum > 0 ? `${price(sum, lang)}${partial ? ` + ${d.carte.priceOnSite.toLowerCase()}` : ""}` : d.carte.priceOnSite;
  const blocks = [
    [`${m.lines}${c}`, ...q.lines.map((l) => `– ${l.qty} × ${d.products[l.item].name}`)].join("\n"),
    `${m.pickup}${c} ${formatDay(q.day, lang, { weekday: "long", day: "numeric", month: "long" })}, ${formatTime(q.time, lang)}`,
    q.prefs.length ? `${m.prefs}${c} ${q.prefs.map((p) => d.order.prefs[p]).join(", ")}` : "",
    `${m.total}${c} ${total}`,
    withContact ? [`${m.name}${c} ${q.name}`, `${m.phone}${c} ${q.phone}`, q.email ? `${m.email}${c} ${q.email}` : ""].filter(Boolean).join("\n") : "",
    q.message ? `${m.message}${c}\n${q.message}` : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}

/** Récapitulatif texte d'une demande apéro. */
export function resaText(r: Resa, lang: Locale, d: Dict, withContact = true) {
  const m = d.resa.mail;
  const c = colon(lang);
  const blocks = [
    [`${m.date}${c} ${formatDay(r.day, lang, { weekday: "long", day: "numeric", month: "long" })}`, `${m.time}${c} ${formatTime(r.time, lang)}`, `${m.guests}${c} ${r.guests}`].join("\n"),
    r.occasion ? `${m.occasion}${c}\n${r.occasion}` : "",
    withContact ? [`${m.name}${c} ${r.name}`, `${m.phone}${c} ${r.phone}`, r.email ? `${m.email}${c} ${r.email}` : ""].filter(Boolean).join("\n") : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}

/** Lien WhatsApp (vide tant que le bistro n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");

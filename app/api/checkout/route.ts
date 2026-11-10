import site from "@/data/site.json";
import { parseOrder } from "@/lib/order";
import { ITEMS } from "@/lib/carte";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

// Paiement en ligne de la commande du midi (Stripe Checkout), PRÉVU MAIS DÉSACTIVÉ.
// Pour l'activer : 1) data/site.json → payment.enabled = true ; 2) renseigner tous les prix de la carte
// (data/carte.json) ; 3) variable Vercel STRIPE_SECRET_KEY (clé « sk_live_… » du compte Stripe du bistro).
// Le client paie après l'envoi de sa commande ; sans ces trois conditions, la route répond 501 et rien ne change.

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!site.payment.enabled || !key) return Response.json({ ok: false, reason: "disabled" }, { status: 501 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseOrder(body.order);
  if (!q || q.lines.some((l) => ITEMS[l.item].price === null)) return Response.json({ ok: false }, { status: 400 });
  const d = getDict(lang);

  const form = new URLSearchParams({
    mode: "payment",
    locale: lang,
    success_url: `${site.url}/${lang}/${d.pages.commander.slug}?paye=1`,
    cancel_url: `${site.url}/${lang}/${d.pages.commander.slug}`,
    "metadata[client]": q.name,
    "metadata[retrait]": `${q.day} ${q.time}`,
    "metadata[telephone]": q.phone,
  });
  if (q.email) form.set("customer_email", q.email);
  q.lines.forEach((l, i) => {
    form.set(`line_items[${i}][quantity]`, String(l.qty));
    form.set(`line_items[${i}][price_data][currency]`, "eur");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round((ITEMS[l.item].price ?? 0) * 100)));
    form.set(`line_items[${i}][price_data][product_data][name]`, d.products[l.item].name);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/x-www-form-urlencoded" }, body: form });
  const json = (await res.json()) as { url?: string };
  if (!res.ok || !json.url) return Response.json({ ok: false }, { status: 502 });
  return Response.json({ ok: true, url: json.url });
}

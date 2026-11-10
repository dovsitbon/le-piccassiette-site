import { Resend } from "resend";
import { orderText, parseOrder, parseResa, resaText } from "@/lib/order";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Commande du midi (kind: "order") et demande « Réserver pour l'apéro » (kind: "resa"), envoyées par e-mail (Resend) :
//  1. notification au bistro (en français, avec la langue du client) ;
//  2. confirmation au client, dans sa langue, s'il a donné son e-mail.
// Variables Vercel : RESEND_API_KEY, ORDER_NOTIFY_EMAIL (adresse du bistro), RESEND_FROM (domaine vérifié dans Resend,
// ex. « Le Piccassiette <commandes@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(title: string, text: string) {
  const body = escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 18px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="background:#FAF3E7;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;border-top:8px solid #1F5F6B;padding:32px 28px;font-family:Helvetica,Arial,sans-serif;color:#22201E;font-size:15px;line-height:1.65">
<p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#A8402A">Le Piccassiette · Bistro</p>
<h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:26px;color:#1F5F6B">${escapeHtml(title)}</h1>${body}</div></div>`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const fr = getDict("fr");
  const d = getDict(lang);

  let notify: { subject: string; title: string; text: string; replyTo: string };
  let confirm: { to: string; subject: string; text: string } | null;
  if (body.kind === "resa") {
    const r = parseResa(body.resa);
    if (!r) return Response.json({ ok: false }, { status: 400 });
    const m = d.resa.mail;
    notify = { subject: `${fr.resa.mail.subject} · ${r.name} · ${r.day} ${r.time} · ${r.guests} pers.`, title: fr.resa.mail.title, text: resaText(r, "fr", fr), replyTo: r.email };
    confirm = r.email ? { to: r.email, subject: m.confirmSubject, text: `${fill(m.confirmIntro, { name: r.name })}\n\n${resaText(r, lang, d, false)}\n\n${m.confirmOutro}` } : null;
  } else {
    const q = parseOrder(body.order);
    if (!q) return Response.json({ ok: false }, { status: 400 });
    const m = d.order.mail;
    notify = { subject: `${fr.order.mail.subject} · ${q.name} · ${q.day} ${q.time}`, title: fr.order.mail.title, text: orderText(q, "fr", fr), replyTo: q.email };
    confirm = q.email ? { to: q.email, subject: m.confirmSubject, text: `${fill(m.confirmIntro, { name: q.name })}\n\n${orderText(q, lang, d, false)}\n\n${m.confirmOutro}` } : null;
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Le Piccassiette <onboarding@resend.dev>";
  const text = lang === "fr" ? notify.text : `${notify.text}\n\n${fr.order.mail.lang} : ${lang.toUpperCase()}`;

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: notify.replyTo || undefined, subject: notify.subject, html: html(notify.title, text), text });
    notified = !r.error;
  } catch {}

  if (confirm && notified) {
    try {
      const r = await resend.emails.send({ from, to: confirm.to, replyTo: to, subject: confirm.subject, html: html(confirm.subject, confirm.text), text: confirm.text });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}

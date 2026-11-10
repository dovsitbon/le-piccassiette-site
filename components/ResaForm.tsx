"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { CheckIcon, MinusIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill } from "@/lib/i18n";
import { formatTime, isoDay } from "@/lib/format";
import { aperoTimes } from "@/lib/hours";
import { aperoMaxDay, isEmail, isPhone, resaText, waLink, type Resa } from "@/lib/order";

type Errors = Partial<Record<"date" | "time" | "guests" | "name" | "phone" | "email" | "send", string>>;
type Sent = { notified: boolean; confirmed: boolean; text: string; email: string };

/** « Réserver pour l'apéro » : date, heure, nombre de personnes, occasion (anniversaire, privatisation…), coordonnées. */
export function ResaForm() {
  const { lang, d } = useLocale();
  const t = d.resa;
  const [now, setNow] = useState<Date | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- heure du navigateur
  useEffect(() => setNow(new Date()), []);
  const times = useMemo(() => (now && date ? aperoTimes(date, now) : []), [now, date]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- heure devenue impossible
    if (time && !times.includes(time)) setTime("");
  }, [times, time]);

  function validate(): Errors {
    const e: Errors = {};
    if (!date) e.date = t.errors.date;
    if (!time) e.time = t.errors.time;
    if (guests < 1) e.guests = t.errors.guests;
    if (!name.trim()) e.name = t.errors.name;
    if (!isPhone(phone)) e.phone = t.errors.phone;
    if (email.trim() && !isEmail(email)) e.email = t.errors.email;
    return e;
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>(`[data-err="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const resa: Resa = { day: date, time, guests, occasion: occasion.trim(), name: name.trim(), phone: phone.trim(), email: email.trim() };
    setSending(true);
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "resa", lang, resa }) });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("send");
      setSent({ notified: !!json.notified, confirmed: !!json.confirmed, text: resaText(resa, lang, d), email: resa.email });
      document.getElementById("apero-form")?.scrollIntoView({ block: "start" });
    } catch {
      setErrors({ send: t.errors.send });
    } finally {
      setSending(false);
    }
  }

  const call = (
    <a href={`tel:${site.phoneIntl}`} className="btn">
      <PhoneIcon className="h-5 w-5" />
      {d.order.callCta} · {site.phone}
    </a>
  );

  if (sent) {
    const wa = waLink(sent.text);
    return (
      <div className="fade-in card bg-paper p-6 text-ink ring-1 ring-line md:p-10" role="status">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${sent.notified ? "bg-teal text-cream" : "bg-mustard text-ink"}`}>{sent.notified ? <CheckIcon className="h-6 w-6" /> : <PhoneIcon className="h-6 w-6" />}</span>
        <h3 className="display mt-5 text-[2rem]">{sent.notified ? t.done.title : t.done.pendingTitle}</h3>
        <p className="lead mt-2">{sent.notified ? t.done.text : t.done.pendingText}</p>
        {sent.confirmed && <p className="mt-2 text-muted">{fill(t.done.mail, { email: sent.email })}</p>}
        <pre className="mt-6 rounded-2xl bg-cream-deep p-5 font-[family-name:var(--font-body)] text-[0.9375rem] leading-relaxed whitespace-pre-wrap">{sent.text}</pre>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {call}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-line">
              <WhatsAppIcon className="h-5 w-5" />
              {d.order.whatsapp}
            </a>
          )}
          <button type="button" className="link-line ms-1 min-h-11 font-semibold text-muted" onClick={() => setSent(null)}>
            {t.done.again}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`resa-err-${k}`} className="mt-2 text-sm font-semibold text-coral-ink">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `resa-err-${k}` : undefined, "data-err": k });

  return (
    <form onSubmit={submit} noValidate className="card space-y-6 bg-paper p-5 text-ink ring-1 ring-line md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">{t.date}</span>
          <input type="date" className="field" value={date} min={now ? isoDay(now) : undefined} max={now ? aperoMaxDay(now) : undefined} onChange={(e) => setDate(e.target.value)} required {...aria("date")} />
          {err("date")}
        </label>
        <label className="block">
          <span className="label">{t.time}</span>
          <select className="field" value={time} onChange={(e) => setTime(e.target.value)} required disabled={!date} {...aria("time")}>
            <option value="">—</option>
            {times.map((x) => (
              <option key={x} value={x}>
                {formatTime(x, lang)}
              </option>
            ))}
          </select>
          {date && now && !times.length && <span className="mt-2 block text-sm text-muted">{t.noTimes}</span>}
          {err("time")}
        </label>
      </div>
      <div>
        <span className="label" id="resa-guests">
          {t.guests}
        </span>
        <div className="flex h-12 w-fit items-center rounded-full border-2 border-line bg-paper" role="group" aria-labelledby="resa-guests">
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label="−1">
            <MinusIcon />
          </button>
          <output className="w-10 text-center font-semibold" aria-live="polite">
            {guests}
          </output>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => setGuests((g) => Math.min(site.apero.maxGuests * 5, g + 1))} aria-label="+1">
            <PlusIcon />
          </button>
        </div>
        {err("guests")}
      </div>
      <label className="block">
        <span className="label">{t.occasion}</span>
        <textarea className="field min-h-20 resize-y" maxLength={1000} placeholder={t.occasionPh} value={occasion} onChange={(e) => setOccasion(e.target.value)} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label">{t.name}</span>
          <input className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required {...aria("name")} />
          {err("name")}
        </label>
        <label className="block">
          <span className="label">{t.phone}</span>
          <input className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required {...aria("phone")} />
          {err("phone")}
        </label>
        <label className="block sm:col-span-2">
          <span className="label">{t.email}</span>
          <input className="field" type="email" spellCheck={false} inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
          <span className="mt-1.5 block text-[0.875rem] text-muted">{t.emailHint}</span>
          {err("email")}
        </label>
      </div>
      <button type="submit" className="btn w-full" disabled={sending}>
        {sending ? t.sending : t.submit}
      </button>
      <p className="text-center text-[0.875rem] text-muted">{t.note}</p>
      {errors.send && (
        <div className="space-y-4" role="alert">
          <p className="font-semibold text-coral-ink">{errors.send}</p>
          {call}
        </div>
      )}
    </form>
  );
}

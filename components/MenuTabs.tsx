"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/providers";
import { OrderLink } from "@/components/OrderLink";
import { Photo, type Tint } from "@/components/Photo";
import { PlatDuJour } from "@/components/PlatDuJour";
import { categories, ITEMS, PARFUMS, type CategoryId, type Illus, type ItemId } from "@/lib/carte";
import { fill } from "@/lib/i18n";
import { price } from "@/lib/format";
import { firstImg } from "@/lib/media";
import { pagePath } from "@/lib/pages";

export const TAB_EVENT = "piccassiette:tab";

const TINT: Record<Illus, Tint> = { baguette: "mustard", bowl: "sky", sandwich: "mustard", salad: "sky", pot: "coral", board: "cream", glass: "cream", jar: "teal" };

/** Ouvre un onglet de la carte depuis une tuile, puis descend jusqu'à la carte (false si la carte n'est pas sur la page). */
export function openTab(id: CategoryId) {
  const el = document.getElementById("carte");
  if (!el) return false;
  window.dispatchEvent(new CustomEvent<CategoryId>(TAB_EVENT, { detail: id }));
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return true;
}

/** Prix en vrai texte : « 9,50 € », « à partir de 6,50 € », ou « Prix à l'ardoise » tant qu'il n'est pas renseigné. */
export function Price({ id }: { id: ItemId }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  if (it.price === null) return <span className="text-[0.9375rem] font-medium text-muted">{d.carte.priceOnSite}</span>;
  return <span>{it.from ? fill(d.carte.from, { price: price(it.price, lang) }) : price(it.price, lang)}</span>;
}

function Dish({ id, wide = false }: { id: ItemId; wide?: boolean }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  const p = d.products[id];
  const hasPhoto = !!firstImg(it.photo);
  return (
    <li className={`card group flex bg-paper ring-1 ring-line ${hasPhoto || wide ? "flex-col" : "gap-4 p-4 md:p-5"} ${wide && hasPhoto ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_1fr]" : ""}`}>
      <Photo
        paths={it.photo}
        alt={hasPhoto ? d.alt[(firstImg(it.photo)?.src.split("/").pop()?.replace(/\.\w+$/, "") ?? "") as keyof typeof d.alt] || p.name : ""}
        illus={it.illus}
        tint={TINT[it.illus]}
        sizes={hasPhoto ? "(min-width: 768px) 46vw, 100vw" : "96px"}
        className={hasPhoto || wide ? "aspect-[4/3]" : "h-20 w-20 shrink-0 rounded-2xl md:h-24 md:w-24"}
        illusClassName={hasPhoto || wide ? "h-24 w-24" : "h-14 w-14 md:h-16 md:w-16"}
      />
      <div className={hasPhoto || wide ? "flex flex-1 flex-col p-5 md:p-6" : "flex min-w-0 flex-1 flex-col"}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-[1.5rem]">{p.name}</h3>
          <p className="shrink-0 text-[1.125rem] font-semibold">
            <Price id={id} />
          </p>
        </div>
        <p className="mt-1.5 leading-relaxed text-muted">{p.desc}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          {it.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {it.tags.map((t) => (
                <li key={t} className={`tag tag-${t}`}>
                  {d.tags[t]}
                </li>
              ))}
            </ul>
          )}
          {it.orderable && (
            <OrderLink href={pagePath("commander", lang)} intent={{ item: id }} label={fill(d.carte.addLabel, { name: p.name })} className="btn-line ms-auto !min-h-10 !px-4 !text-[0.9375rem]">
              {d.carte.add}
            </OrderLink>
          )}
        </div>
      </div>
    </li>
  );
}

/** La carte, en une seule page avec onglets (le midi, plats du moment, apéro, rhums arrangés). */
export function MenuTabs({ initial = "midi" }: { initial?: CategoryId }) {
  const { lang, d } = useLocale();
  const cats = categories();
  const [tab, setTab] = useState<CategoryId>(initial);
  const reduce = useReducedMotion();
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<CategoryId>).detail);
    window.addEventListener(TAB_EVENT, on);
    // Lien direct vers un onglet : /carte#rhums
    const h = location.hash.slice(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'ancre n'est connue que dans le navigateur
    if (cats.some((c) => c.id === h)) setTab(h as CategoryId);
    return () => window.removeEventListener(TAB_EVENT, on);
  }, [cats]);

  const current = cats.find((c) => c.id === tab) ?? cats[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const j = (i + n + cats.length) % cats.length;
    setTab(cats[j].id);
    refs.current[j]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={d.carte.tabsLabel} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {cats.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${c.id}`}
            aria-selected={tab === c.id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === c.id ? 0 : -1}
            onClick={() => setTab(c.id)}
            onKeyDown={(e) => onKey(e, i)}
            className="relative inline-flex min-h-12 shrink-0 items-center rounded-full px-5 text-[1.0625rem] font-semibold whitespace-nowrap transition-colors aria-selected:text-cream"
          >
            {tab === c.id && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 rounded-full bg-teal" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }} />}
            {tab !== c.id && <span className="absolute inset-0 rounded-full ring-2 ring-line ring-inset" aria-hidden="true" />}
            <span className="relative">{d.carte.tabs[c.id]}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} className="mt-8" tabIndex={0}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            {current.id === "moment" && (
              <div className="mb-6">
                <PlatDuJour />
              </div>
            )}
            <ul className="grid gap-4 md:grid-cols-2">
              {current.items.map((id) => (
                <Dish key={id} id={id} wide={current.items.length === 1} />
              ))}
            </ul>
            {current.id === "rhums" && (
              <div className="card mt-4 bg-teal p-6 text-cream md:p-8">
                <h3 className="display text-[1.5rem]">{d.carte.rhumsTitle}</h3>
                {PARFUMS.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {PARFUMS.map((p) => (
                      <li key={p.fr} className="rounded-full bg-cream/12 px-4 py-2 font-medium ring-1 ring-cream/30">
                        {p[lang]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 max-w-xl leading-relaxed text-cream/85">{d.carte.rhumsEmpty}</p>
                )}
              </div>
            )}
            {(current.id === "apero" || current.id === "rhums") && <p className="mt-4 text-[0.9375rem] text-muted">{d.carte.abuse}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 text-[0.9375rem] text-muted">{d.carte.allergens}</p>
    </div>
  );
}

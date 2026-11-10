"use client";

import { useEffect, useState } from "react";
import plat from "@/data/plat-du-jour.json";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { Plate } from "@/components/Mosaic";
import { PhoneIcon } from "@/components/icons";
import { formatDay, isoDay, price } from "@/lib/format";

type Day = { date: string; price: number | null; dish: { fr: string; en: string } };

/** Le plat du moment (data/plat-du-jour.json) : l'entrée datée d'aujourd'hui, choisie côté navigateur. */
export function PlatDuJour() {
  const { lang, d } = useLocale();
  const [today, setToday] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- date du navigateur, connue seulement après hydratation
  useEffect(() => setToday(isoDay(new Date())), []);

  const entry = today ? (plat.days as Day[]).find((x) => x.date === today) : undefined;

  return (
    <div className="card relative flex flex-col gap-5 bg-mustard p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="max-w-2xl">
        <p className="text-[0.875rem] font-semibold tracking-[0.1em] uppercase" suppressHydrationWarning>
          {d.today.title}
          {today ? ` · ${formatDay(today, lang, { weekday: "long", day: "numeric", month: "long" })}` : ""}
        </p>
        {entry ? (
          <>
            <p className="display mt-3 text-[1.75rem] md:text-[2.25rem]">{entry.dish[lang]}</p>
            <p className="mt-2 font-semibold">{entry.price !== null ? price(entry.price, lang) : d.today.priceBoard}</p>
          </>
        ) : (
          <>
            <p className="display mt-3 text-[1.75rem] md:text-[2.25rem]">{d.today.noEntry}</p>
            <p className="mt-2 leading-relaxed">{plat.fallback[lang]}</p>
          </>
        )}
      </div>
      <a href={`tel:${site.phoneIntl}`} className="btn-line shrink-0 self-start md:self-auto">
        <PhoneIcon className="h-5 w-5" />
        {d.today.call}
      </a>
      <Plate className="pointer-events-none absolute -end-6 -top-6 hidden h-24 w-24 rotate-12 opacity-90 lg:block" seed={5} />
    </div>
  );
}

import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { HoursTable } from "@/components/HoursTable";
import { FacebookIcon, PhoneIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const links = [
    { href: pagePath("carte", lang), label: d.footer.menu },
    { href: pagePath("commander", lang), label: d.footer.order },
    { href: pagePath("midi", lang), label: d.pages.midi.title },
    { href: pagePath("apero", lang), label: d.pages.apero.title },
    { href: pagePath("legal", lang), label: d.footer.legal },
  ];
  return (
    <footer className="bg-teal-deep pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1.1fr] md:px-10 md:py-20">
        <div>
          <Logo light className="w-56" />
          <p className="mt-5 max-w-xs leading-relaxed text-cream/80">{d.footer.tagline}</p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="-ms-3 mt-4 flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream/10" aria-label={d.nav.facebook}>
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
        <div className="leading-relaxed">
          <p className="mb-3 text-[0.8125rem] font-semibold tracking-[0.12em] text-mustard uppercase">{d.infos.address}</p>
          <address className="text-lg not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-mustard hover:underline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <ul className="mt-6 space-y-0.5 text-cream/80">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="[&_.text-muted]:text-cream/60 [&_tr]:border-cream/15">
          <p className="mb-3 text-[0.8125rem] font-semibold tracking-[0.12em] text-mustard uppercase">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} compact />
        </div>
      </div>
      <p className="border-t border-cream/15 px-6 py-6 text-center text-sm text-cream/70">
        {fill(d.footer.rights, { year: new Date().getFullYear() })} · {d.carte.abuse}
      </p>
    </footer>
  );
}

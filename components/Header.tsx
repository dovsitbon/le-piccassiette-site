"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { OrderLink } from "@/components/OrderLink";
import { CloseIcon, MenuIcon, PhoneIcon, PinIcon, BagIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { pagePath } from "@/lib/pages";

export function Header() {
  const { lang, d } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const home = `/${lang}`;
  const order = pagePath("commander", lang);
  const links = [
    { href: `${home}#midi`, label: d.nav.midi },
    { href: `${home}#apero`, label: d.nav.apero },
    { href: pagePath("carte", lang), label: d.nav.carte },
    { href: `${home}#infos`, label: d.nav.infos },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2">
          {d.nav.skip}
        </a>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 md:h-[4.75rem] md:px-6 xl:px-8">
          <div className="flex items-center">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full xl:hidden" onClick={() => setMenu(true)} aria-label={d.nav.menu} aria-expanded={menu}>
              <MenuIcon className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-0.5 xl:flex" aria-label={d.nav.menu}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-[1.0625rem] font-medium whitespace-nowrap transition-colors hover:bg-cream-deep">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href={home} aria-label={d.nav.home} className="block py-1">
            <Logo className="w-[10.5rem] md:w-[13rem]" eager />
          </Link>

          <div className="flex items-center justify-end gap-1 lg:gap-3">
            <LangSwitch lang={lang} label={d.nav.lang} className="hidden lg:flex" />
            <a href={`tel:${site.phoneIntl}`} className="hidden min-h-11 items-center gap-2 rounded-full px-3 font-medium whitespace-nowrap transition-colors hover:bg-cream-deep 2xl:inline-flex">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <a href={`tel:${site.phoneIntl}`} className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream-deep 2xl:hidden" aria-label={`${d.nav.call} ${site.phone}`}>
              <PhoneIcon className="h-5 w-5" />
            </a>
            <OrderLink href={order} className="btn-order hidden !min-h-11 !px-5 !text-base whitespace-nowrap md:inline-flex">
              {d.nav.orderCta}
            </OrderLink>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fade-in fixed inset-0 z-[60] flex flex-col overscroll-contain bg-cream text-ink" role="dialog" aria-modal="true" aria-label={d.nav.menu}>
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-3 md:h-[4.75rem] md:px-6">
            <button type="button" className="flex h-11 w-11 items-center justify-center justify-self-start rounded-full" onClick={() => setMenu(false)} aria-label={d.nav.close}>
              <CloseIcon className="h-6 w-6" />
            </button>
            <Logo className="w-[10.5rem]" />
            <span />
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-7" aria-label={d.nav.menu}>
            {links.map((l, i) => (
              <div key={l.href} className="rise" style={{ animationDelay: `${0.04 * i}s` }}>
                <Link href={l.href} onClick={() => setMenu(false)} className="display block py-1.5 text-[2.75rem]">
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
          {/* Raccourcis : commander, appeler, itinéraire */}
          <div className="grid grid-cols-3 gap-2 px-4 pb-4">
            <OrderLink href={order} onNavigate={() => setMenu(false)} className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-mustard font-semibold">
              <BagIcon className="h-6 w-6" />
              {d.nav.orderShort}
            </OrderLink>
            <a href={`tel:${site.phoneIntl}`} className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-teal font-semibold text-cream">
              <PhoneIcon className="h-6 w-6" />
              {d.nav.call}
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-2xl bg-coral font-semibold text-ink">
              <PinIcon className="h-6 w-6" />
              {d.nav.route}
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-line px-5 py-2">
            <LangSwitch lang={lang} label={d.nav.lang} />
            <span className="text-sm text-muted">{site.address.street}, {site.address.city}</span>
          </div>
        </div>
      )}
    </>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Commander pour midi » toujours à portée de pouce, et l'appel. */
export function MobileOrderBar() {
  const { lang, d } = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-cream/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <OrderLink href={pagePath("commander", lang)} className="btn-order flex-1 !px-3 !text-base whitespace-nowrap">
        {d.nav.orderCta}
      </OrderLink>
      <a href={`tel:${site.phoneIntl}`} className="btn-line !px-4 !text-base" aria-label={`${d.nav.call} ${site.phone}`}>
        <PhoneIcon className="h-5 w-5" />
        {d.nav.call}
      </a>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { checked } from "@/lib/carte";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { pageJsonLd } from "@/lib/jsonld";
import { MenuTabs } from "@/components/MenuTabs";
import { OrderLink } from "@/components/OrderLink";
import { OpenStatus } from "@/components/OpenStatus";
import { HoursTable } from "@/components/HoursTable";
import { OrderForm } from "@/components/OrderForm";
import { ResaForm } from "@/components/ResaForm";
import { Rating } from "@/components/Rating";
import { Photo } from "@/components/Photo";
import { Plate } from "@/components/Mosaic";
import { PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const p = d.pages[r.id];
  const description = "metaDescription" in p ? p.metaDescription : d.meta.description;
  return {
    title: p.metaTitle,
    description,
    alternates: {
      canonical: pagePath(r.id, r.lang),
      languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
    },
    openGraph: { title: p.metaTitle, description, url: pagePath(r.id, r.lang), images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    robots: r.id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function Head({ eyebrow, title, lead, lang, d }: { eyebrow: string; title: string; lead: string; lang: Locale; d: Dict }) {
  return (
    <header className="grid gap-8 px-1 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-3 text-[2.9rem] md:text-[4.5rem]">{title}</h1>
        <p className="lead mt-4 max-w-xl">{lead}</p>
      </div>
      <div className="card bg-cream-deep p-5 md:p-6">
        <HoursTable lang={lang} d={d} compact />
        <div className="mt-3 flex flex-col gap-1.5 text-[0.9375rem]">
          <OpenStatus className="font-semibold" />
          <Rating lang={lang} d={d} />
        </div>
      </div>
    </header>
  );
}

function CallBand({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="card mt-12 flex flex-col items-start gap-5 bg-mustard p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="display text-[1.75rem]">{d.order.title}</p>
      <div className="flex flex-wrap gap-3">
        <OrderLink href={pagePath("commander", lang)} className="btn">
          {d.nav.orderCta}
        </OrderLink>
        <a href={`tel:${site.phoneIntl}`} className="btn-line">
          <PhoneIcon className="h-5 w-5" />
          {d.order.callCta}
        </a>
      </div>
    </div>
  );
}

function Carte({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.carte;
  return (
    <div className="px-4 pt-10 pb-24 md:px-8 md:pt-16 md:pb-32">
      <div id="carte" className="mx-auto max-w-7xl">
        <Head eyebrow={p.eyebrow} title={p.title} lead={p.lead} lang={lang} d={d} />
        <div className="mt-10">
          <MenuTabs />
        </div>
        <p className="mt-3 text-sm text-muted">{fill(d.carte.checked, { date: formatDay(checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
        <CallBand lang={lang} d={d} />
      </div>
    </div>
  );
}

function Commander({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.commander;
  return (
    <div className="px-4 pt-10 pb-24 md:px-8 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <Head eyebrow={p.eyebrow} title={p.title} lead={p.lead} lang={lang} d={d} />

        <section id="commander" className="mt-14 grid scroll-mt-24 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="px-1 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{d.order.eyebrow}</p>
            <h2 className="display mt-3 text-[2.5rem] md:text-[3.25rem]">{d.order.title}</h2>
            <p className="lead mt-4">{d.order.intro}</p>
            <div className="card mt-8 bg-cream-deep p-6">
              <p className="display text-[1.5rem]">{d.order.callTitle}</p>
              <p className="mt-1 text-muted">{d.order.callText}</p>
              <a href={`tel:${site.phoneIntl}`} className="btn mt-5">
                <PhoneIcon className="h-5 w-5" />
                {d.order.callCta} · {site.phone}
              </a>
            </div>
          </div>
          <OrderForm />
        </section>

        <section id="apero-form" className="relative mt-20 grid scroll-mt-24 gap-10 overflow-hidden rounded-[28px] bg-teal p-4 py-10 text-cream md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-14">
          <Plate className="pointer-events-none absolute -start-20 -bottom-20 h-80 w-80 opacity-20" seed={8} grout="#1F5F6B" plate="#1F5F6B" rim="#FAF3E7" />
          <div className="relative px-2 md:px-0">
            <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-mustard uppercase">{d.resa.eyebrow}</p>
            <h2 className="display mt-3 text-[2.5rem] md:text-[3.25rem]">{d.resa.title}</h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/85">{d.resa.intro}</p>
          </div>
          <div className="relative">
            <ResaForm />
          </div>
        </section>
      </div>
    </div>
  );
}

/** Pages SEO « Bo bun et banh mi à Amiens » et « Apéro et rhums arrangés à Amiens ». */
function Seo({ id, lang, d }: { id: "midi" | "apero"; lang: Locale; d: Dict }) {
  const p = d.pages[id];
  const photo = id === "midi" ? { paths: ["/media/plats/bo-bun.jpg", "/media/plats/banh-mi.jpg"], illus: "bowl" as const, tint: "mustard" as const } : { paths: ["/media/apero/rhums-arranges.jpg"], illus: "jar" as const, tint: "teal" as const };
  const cta =
    id === "midi" ? (
      <OrderLink href={pagePath("commander", lang)} className="btn-order">
        {p.cta}
      </OrderLink>
    ) : (
      <Link href={`${pagePath("commander", lang)}#apero-form`} className="btn">
        {p.cta}
      </Link>
    );
  return (
    <article className="px-4 pt-10 pb-24 md:px-8 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="px-1">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="display mt-3 text-[2.9rem] md:text-[4.25rem]">{p.title}</h1>
            <p className="lead mt-5">{p.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {cta}
              <Rating lang={lang} d={d} />
            </div>
          </div>
          <Photo paths={photo.paths} alt="" illus={photo.illus} tint={photo.tint} sizes="(min-width: 768px) 46vw, 100vw" className="card aspect-[4/3]" illusClassName="h-2/5 w-2/5" />
        </div>
        <div className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {p.sections.map((s) => (
            <section key={s.h} className="border-t-2 border-ink pt-5">
              <h2 className="display text-[1.75rem]">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-12">
          <Link href={pagePath("carte", lang)} className="link-line font-semibold">
            {d.carte.seeFull}
          </Link>
        </div>
        <CallBand lang={lang} d={d} />
      </div>
    </article>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted">{p.toConfirm}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, `${site.legal.company}, ${site.address.street}, ${site.address.postalCode} ${site.address.city} · ${site.phone} · ${site.email}`],
    [p.siret, site.legal.siret || pending],
    [p.director, site.legal.director || pending],
    [p.host, site.legal.host],
    [p.data, fill(p.dataText, { email: site.email })],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="display text-[2.8rem] md:text-[3.6rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-9">
          <h2 className="eyebrow">{title}</h2>
          <p className="mt-2 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(r.lang, r.id)) }} />
      {r.id === "carte" && <Carte lang={r.lang} d={d} />}
      {r.id === "commander" && <Commander lang={r.lang} d={d} />}
      {(r.id === "midi" || r.id === "apero") && <Seo id={r.id} lang={r.lang} d={d} />}
      {r.id === "legal" && <Legal d={d} />}
    </>
  );
}

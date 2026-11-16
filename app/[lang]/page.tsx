import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { getDict, altOf, fill, isLocale } from "@/lib/i18n";
import { firstImg, imgsIn } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderLink } from "@/components/OrderLink";
import { Tiles } from "@/components/Tiles";
import { MenuTabs } from "@/components/MenuTabs";
import { HoursTable } from "@/components/HoursTable";
import { Photo, type Tint } from "@/components/Photo";
import { Illus, type IllusName } from "@/components/Illus";
import { Plate, Shards } from "@/components/Mosaic";
import { PhoneIcon, PinIcon, PlusIcon } from "@/components/icons";

// Le statut « Ouvert » et le bandeau se recalculent côté navigateur ; la page est régénérée chaque heure.
export const revalidate = 3600;

function SectionHead({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-3 text-[2.5rem] md:text-[3.75rem]">{title}</h2>
      {intro && <p className="lead mt-4">{intro}</p>}
    </Reveal>
  );
}

type Block = { id: string; key: "midi" | "apero" | "privat"; paths: string[]; illus: IllusName; tint: Tint };
const BLOCKS: Block[] = [
  { id: "midi", key: "midi", paths: ["/media/plats/bo-bun.jpg", "/media/plats/banh-mi.jpg"], illus: "bowl", tint: "mustard" },
  { id: "apero", key: "apero", paths: ["/media/salle/salle.jpg", "/media/apero/rhums-arranges.jpg"], illus: "jar", tint: "teal" },
  { id: "privatiser", key: "privat", paths: ["/media/facade/facade.jpg"], illus: "cheers", tint: "coral" },
];

const SERVICES: IllusName[] = ["bag", "cheers", "jar", "phone"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const d = getDict(lang);
  const hero = firstImg(["/media/hero/hero.jpg", "/media/facade/facade.jpg", "/media/salle/salle.jpg"]);
  const order = pagePath("commander", lang);
  const ratingValue = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1 }).format(site.rating.value);
  const reviews = avis.items as { author: string; date: string; source: string; fr: string; en: string }[];

  const ctas: Record<Block["key"], React.ReactNode> = {
    midi: (
      <OrderLink href={order} className="btn-order">
        {d.blocks.midi.cta}
      </OrderLink>
    ),
    apero: (
      <Link href={`${pagePath("carte", lang)}#rhums`} className="btn">
        {d.blocks.apero.cta}
      </Link>
    ),
    privat: (
      <Link href={`${order}#apero-form`} className="btn">
        {d.blocks.privat.cta}
      </Link>
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 1. Hero plein écran : la plus belle photo (emplacement tant qu'elle n'est pas prise), 2 boutons, note Google et statut */}
      <section className="grid md:min-h-[calc(100svh-7.25rem)] md:grid-cols-[1fr_1.05fr]">
        <div className="order-2 flex flex-col justify-center px-5 pt-8 pb-12 md:order-1 md:px-10 lg:px-16">
          <p className="eyebrow rise">{d.hero.eyebrow}</p>
          <h1 className="display rise mt-4 text-[3rem] leading-[0.95] md:text-[4.25rem] xl:text-[5.5rem]" style={{ animationDelay: "0.05s" }}>
            {d.hero.title}
          </h1>
          <p className="lead rise mt-5 max-w-lg" style={{ animationDelay: "0.1s" }}>
            {d.hero.sub}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
            <OrderLink href={order} className="btn-order">
              {d.hero.ctaOrder}
            </OrderLink>
            <Link href={pagePath("carte", lang)} className="btn-line">
              {d.hero.ctaMenu}
            </Link>
          </div>
          <div className="rise mt-6 flex flex-col gap-2 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:gap-x-6" style={{ animationDelay: "0.2s" }}>
            <Rating lang={lang} d={d} />
            <OpenStatus className="font-semibold" />
          </div>
        </div>
        <div className="relative order-1 h-[32svh] overflow-hidden md:order-2 md:m-4 md:ms-0 md:h-auto md:rounded-[28px]">
          {hero ? (
            <Image src={hero.src} alt={altOf(d, hero.src)} width={hero.width} height={hero.height} sizes="(min-width: 768px) 52vw, 100vw" quality={80} priority fetchPriority="high" className="h-full w-full object-cover" />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-teal" data-photo-slot="/media/hero/hero.jpg" role="img" aria-label={d.hero.photoNote}>
              {/* Le plateau en bois et l'assiette en mosaïque, en attendant la vraie photo */}
              <div className="absolute inset-x-0 bottom-0 h-[22%] bg-wood" aria-hidden="true" />
              <Plate className="relative h-[62%] max-h-[26rem] w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)]" plate="#FAF3E7" rim="#FAF3E7" />
              <Shards className="absolute end-[8%] top-[10%] h-24 w-24 rotate-12" n={4} seed={9} />
              <Shards className="absolute start-[6%] bottom-[28%] h-20 w-20" n={3} seed={21} />
            </div>
          )}
        </div>
      </section>

      {/* 2. Tuiles de catégories, en capitales, juste après le hero */}
      <section aria-label={d.tiles.title} className="px-4 pt-4 md:px-8 md:pt-6">
        <h2 className="sr-only">{d.tiles.title}</h2>
        <div className="mx-auto max-w-7xl">
          <Tiles />
        </div>
      </section>

      {/* 3. Bande de services en 4 pictos */}
      <section aria-label={d.services.title} className="px-4 pt-14 md:px-8 md:pt-20">
        <h2 className="sr-only">{d.services.title}</h2>
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
          {d.services.items.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center px-2 text-center">
              <Illus name={SERVICES[i]} className="h-14 w-14 text-teal" strokeWidth={3.4} />
              {i === 3 ? (
                <a href={`tel:${site.phoneIntl}`} className="display mt-3 text-[1.375rem] hover:underline">
                  {s.title}
                </a>
              ) : (
                <p className="display mt-3 text-[1.375rem]">{s.title}</p>
              )}
              <p className="mt-1 text-[0.9375rem] text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. La carte, une seule page à onglets, prix en HTML */}
      <section id="carte" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} intro={d.carte.intro} />
            <Link href={pagePath("carte", lang)} className="link-line shrink-0 self-start font-semibold md:self-auto">
              {d.carte.seeFull}
            </Link>
          </div>
          <MenuTabs />
        </div>
      </section>

      {/* 5. Trois blocs alternés : photo + texte court + un seul bouton */}
      <div className="space-y-20 px-4 pt-24 md:space-y-28 md:px-8 md:pt-32">
        {BLOCKS.map((b, i) => {
          const t = d.blocks[b.key];
          const img = firstImg(b.paths);
          return (
            <section key={b.id} id={b.id} className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-8 md:grid-cols-2 md:gap-16">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <Photo paths={b.paths} alt={img ? altOf(d, img.src) : ""} illus={b.illus} tint={b.tint} sizes="(min-width: 768px) 46vw, 100vw" className="card aspect-[4/3] md:aspect-[5/4]" illusClassName="h-2/5 w-2/5" />
              </Reveal>
              <Reveal delay={0.05} className="px-1 md:max-w-md">
                <p className="eyebrow">{t.eyebrow}</p>
                <h2 className="display mt-3 text-[2.25rem] md:text-[3rem]">{t.title}</h2>
                <p className="lead mt-4">{t.text}</p>
                <div className="mt-7">{ctas[b.key]}</div>
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* 6. En vrai : les vraies photos du bistro (assets/galerie), aucune photo de banque d'images */}
      {imgsIn("galerie").length > 0 && (
        <section id="galerie" className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 px-1">
              <SectionHead eyebrow={d.gallery.eyebrow} title={d.gallery.title} intro={d.gallery.intro} />
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {imgsIn("galerie").map((p, i) => (
                <Reveal as="li" key={p.src} delay={(i % 4) * 0.04}>
                  <div className="zoom card h-full">
                    <Image src={p.src} alt={altOf(d, p.src)} width={p.width} height={p.height} sizes="(min-width: 768px) 25vw, 50vw" quality={75} className="aspect-square h-full w-full object-cover" />
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 px-1 text-[0.9375rem] text-muted">{d.gallery.note}</p>
          </div>
        </section>
      )}

      {/* 7. Avis : la note Google ; les vrais avis s'ajoutent dans data/avis.json (aucun inventé) */}
      <section id="avis" className="px-4 pt-24 md:px-8 md:pt-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-teal px-6 py-14 text-cream md:px-14 md:py-20">
          <div hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec l'accord du bistro -->" }} />
          <Plate className="pointer-events-none absolute -end-16 -bottom-16 h-72 w-72 opacity-25 md:h-96 md:w-96" seed={4} grout="#1F5F6B" plate="#1F5F6B" rim="#FAF3E7" />
          <div className="relative max-w-2xl">
            <p className="text-[0.8125rem] font-semibold tracking-[0.12em] text-mustard uppercase">{d.reviews.eyebrow}</p>
            <h2 className="display mt-3 text-[2.25rem] md:text-[3.25rem]">{fill(d.reviews.title, { value: ratingValue, count: site.rating.count })}</h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-cream/85">{d.reviews.text}</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-light mt-8">
              {d.reviews.cta}
            </a>
          </div>
          {reviews.length > 0 && (
            <ul className="relative mt-12 grid gap-4 md:grid-cols-3">
              {reviews.map((r) => (
                <li key={r.author + r.date} className="rounded-2xl bg-cream p-6 text-ink">
                  <p className="leading-relaxed">« {r[lang]} »</p>
                  <p className="mt-4 text-sm font-semibold text-muted">
                    {r.author} · {r.source}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 7. Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-4 pt-24 md:px-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 px-1">
            <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="card space-y-7 bg-cream-deep p-6 md:p-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">{d.infos.address}</p>
                  <address className="text-lg font-semibold not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </div>
                <div>
                  <p className="eyebrow mb-2">{d.infos.phone}</p>
                  <a href={`tel:${site.phoneIntl}`} className="link-line text-lg font-semibold">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.hours}</p>
                <HoursTable lang={lang} d={d} />
                <div className="mt-3 font-semibold">
                  <OpenStatus />
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.access}</p>
                <p className="leading-relaxed text-muted">{d.infos.accessText}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${site.phoneIntl}`} className="btn">
                  <PhoneIcon className="h-5 w-5" />
                  {d.nav.call}
                </a>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
                  <PinIcon className="h-5 w-5" />
                  {d.infos.route}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="card flex min-h-96 flex-col bg-cream-deep">
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-96 w-full flex-1 border-0" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} />
          </div>
          <Reveal delay={0.05}>
            <div className="divide-y divide-line border-y border-line">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-16 items-center justify-between gap-6 py-4 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold [font-variation-settings:'SOFT'_100]">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mustard-soft">
                      <PlusIcon className="faq-plus h-4 w-4" />
                    </span>
                  </summary>
                  <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

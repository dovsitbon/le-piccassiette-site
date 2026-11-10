import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue (doivent correspondre à locales/*.json → pages.<id>.slug).
export const PAGE_IDS = ["carte", "commander", "midi", "apero", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu" },
  commander: { fr: "commander", en: "order" },
  midi: { fr: "bo-bun-banh-mi-amiens", en: "bo-bun-banh-mi-in-amiens" },
  apero: { fr: "apero-rhum-arrange-amiens", en: "drinks-infused-rum-amiens" },
  legal: { fr: "mentions-legales", en: "legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;

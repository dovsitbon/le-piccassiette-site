"use client";

import { useLocale } from "@/components/providers";
import { openTab } from "@/components/MenuTabs";
import { Photo, type Tint } from "@/components/Photo";
import type { IllusName } from "@/components/Illus";
import type { CategoryId } from "@/lib/carte";
import { pagePath } from "@/lib/pages";
import type { Dict } from "@/lib/i18n";

type Tile = { id: keyof Dict["tiles"]["items"]; tab: CategoryId; paths: string[]; illus: IllusName; tint: Tint };

// Une tuile par catégorie, nom en capitales sur la photo. La photo remplace l'aplat illustré dès qu'elle existe
// (assets/plats/tuile-<nom>.jpg, ou la photo du plat).
const TILES: Tile[] = [
  { id: "sandwichs", tab: "midi", paths: ["/media/plats/tuile-sandwichs.jpg", "/media/plats/sandwich.jpg"], illus: "sandwich", tint: "mustard" },
  { id: "bobun", tab: "midi", paths: ["/media/plats/tuile-bo-bun.jpg", "/media/plats/bo-bun.jpg"], illus: "bowl", tint: "sky" },
  { id: "banhmi", tab: "midi", paths: ["/media/plats/tuile-banh-mi.jpg", "/media/plats/banh-mi.jpg"], illus: "baguette", tint: "coral" },
  { id: "moment", tab: "moment", paths: ["/media/plats/tuile-moment.jpg", "/media/plats/tartiflette.jpg", "/media/plats/plat-du-jour.jpg"], illus: "pot", tint: "cream" },
  { id: "apero", tab: "apero", paths: ["/media/apero/tuile-apero.jpg", "/media/apero/planche.jpg"], illus: "board", tint: "wood" },
  { id: "rhums", tab: "rhums", paths: ["/media/apero/tuile-rhums.jpg", "/media/apero/rhums-arranges.jpg"], illus: "jar", tint: "teal" },
];

export function Tiles() {
  const { lang, d } = useLocale();
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
      {TILES.map((t) => (
        <li key={t.id}>
          <a
            href={`${pagePath("carte", lang)}#${t.tab}`}
            onClick={(e) => {
              if (openTab(t.tab)) e.preventDefault();
            }}
            className="group card relative block aspect-[4/5]"
          >
            <Photo paths={t.paths} alt="" illus={t.illus} tint={t.tint} sizes="(min-width: 1280px) 16vw, (min-width: 768px) 32vw, 50vw" className="absolute inset-0 h-full w-full" illusClassName="h-[42%] w-[42%] -translate-y-5 transition-transform duration-300 group-hover:-translate-y-7 group-hover:rotate-[-5deg]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent px-4 pt-10 pb-4 font-[family-name:var(--font-display)] text-[1.125rem] font-bold tracking-[0.04em] text-cream uppercase [font-variation-settings:'SOFT'_100] md:text-[1.25rem]">
              {d.tiles.items[t.id]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

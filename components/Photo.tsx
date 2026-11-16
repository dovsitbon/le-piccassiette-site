import Image from "next/image";
import { firstImg, isIllustration } from "@/lib/media";
import { Illus, type IllusName } from "@/components/Illus";

const TINTS = {
  teal: "bg-teal text-cream",
  mustard: "bg-mustard text-ink",
  coral: "bg-coral text-ink",
  sky: "bg-teal-soft text-teal-deep",
  cream: "bg-cream-deep text-wood",
  wood: "bg-wood text-cream",
} as const;
export type Tint = keyof typeof TINTS;

/**
 * Photo d'un emplacement (plat, bar, salle, façade…). Tant que la photo n'existe pas dans public/media,
 * un aplat de couleur avec une illustration au trait la remplace (aucune fausse photo) :
 * déposez la photo dans assets/<dossier>/ sous le nom attendu et lancez npm run media.
 */
export function Photo({
  paths,
  alt,
  illus,
  tint = "cream",
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  illusClassName = "h-1/2 w-1/2 max-h-40 max-w-40",
}: {
  paths: readonly string[];
  alt: string;
  illus: IllusName;
  tint?: Tint;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  illusClassName?: string;
}) {
  const p = firstImg(paths);
  if (p)
    return (
      <div className={`zoom bg-cream-deep ${className}`}>
        <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes} quality={75} priority={priority} fetchPriority={priority ? "high" : undefined} className={`h-full w-full object-cover ${imgClassName}`} />
        {isIllustration(p.src) && <span className="illus-badge" />}
      </div>
    );
  return (
    <div className={`flex items-center justify-center ${TINTS[tint]} ${className}`} data-photo-slot={paths[0]} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      <Illus name={illus} className={illusClassName} strokeWidth={2.6} />
    </div>
  );
}

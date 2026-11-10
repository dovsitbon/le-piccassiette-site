// Logo typographique (scripts/logo.mjs) : public/logo.svg (encre) et public/logo-light.svg (crème).
// Pour mettre le vrai logo de l'enseigne, remplacez ces deux fichiers en gardant les noms.

const RATIO = 732 / 132;

export function Logo({ className = "w-48", light = false, eager = false }: { className?: string; light?: boolean; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={light ? "/logo-light.svg" : "/logo.svg"} alt="Le Piccassiette" width={Math.round(40 * RATIO)} height={40} loading={eager ? "eager" : "lazy"} className={`h-auto ${className}`} translate="no" />
  );
}

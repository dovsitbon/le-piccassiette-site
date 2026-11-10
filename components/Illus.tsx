import type { Illus as IllusKind } from "@/lib/carte";

// Petites illustrations au trait, dessinées pour le Piccassiette. Elles tiennent la place des photos
// tant que le bistro n'en a pas fourni (voir assets/A-PHOTOGRAPHIER.md), et servent de pictos.
// viewBox 0 0 120 120, trait = currentColor.

export type IllusName = IllusKind | "bag" | "cheers" | "phone" | "facade" | "room" | "people";

const P: Record<IllusName, string[]> = {
  baguette: [
    "M12 72C12 58 30 50 60 48S108 52 108 62 92 82 60 84 12 86 12 72Z",
    "M32 58 40 68M50 54 58 65M68 53 76 64M86 55 92 64",
    "M22 76C40 80 80 79 100 70",
    "M40 50C38 42 46 38 50 46M62 48C66 40 74 42 70 50",
  ],
  bowl: [
    "M16 58H104C104 82 86 98 60 98S16 82 16 58Z",
    "M44 98 46 106H74L76 98",
    "M28 58C32 48 40 50 44 58 48 48 56 48 60 58 64 48 72 48 76 58 80 48 88 50 92 58",
    "M84 22 108 8M90 28 114 16",
  ],
  sandwich: ["M14 62 60 36 106 62 60 88Z", "M14 62V72L60 98 106 72V62", "M22 66C34 74 46 74 60 82 74 74 86 74 98 66", "M40 54 46 58M60 46 66 50M74 56 80 60"],
  salad: ["M14 56H106C106 82 86 98 60 98S14 82 14 56Z", "M30 56C28 40 44 34 52 44 56 30 74 32 74 46 86 38 98 46 92 56", "M44 70a5 5 0 1 0 .1 0M70 72a5 5 0 1 0 .1 0M58 82a4 4 0 1 0 .1 0"],
  pot: ["M18 54H102V70C102 90 84 100 60 100S18 90 18 70Z", "M10 54H110", "M8 62H18M102 62H112", "M44 40C40 32 48 28 44 20M60 40C56 32 64 28 60 20M76 40C72 32 80 28 76 20"],
  board: ["M10 70H96C100 70 100 84 96 84H10C6 84 6 70 10 70Z", "M96 77H112", "M22 70 30 58H46L52 70", "M58 70C58 62 64 58 70 58S82 62 82 70", "M30 52a3 3 0 1 0 .1 0M70 50a3 3 0 1 0 .1 0"],
  glass: ["M38 18H82C82 46 74 60 60 60S38 46 38 18Z", "M60 60V98", "M42 102H78", "M41 34H79"],
  jar: ["M34 30H86V40C94 46 96 56 96 66V96C96 102 92 106 86 106H34C28 106 24 102 24 96V66C24 56 26 46 34 40Z", "M30 18H90V30H30Z", "M42 70a7 7 0 1 0 .1 0M66 62l10 6-6 10-10-6ZM56 88a6 6 0 1 0 .1 0", "M24 56H96"],
  bag: ["M22 40H98L92 104H28Z", "M44 40V32C44 22 50 16 60 16S76 22 76 32V40", "M40 64H80"],
  cheers: ["M18 24H50L46 58C45 66 39 70 34 70S23 66 22 58Z", "M34 70V100M24 102H44", "M70 24H102L98 58C97 66 91 70 86 70S75 66 74 58Z", "M86 70V100M76 102H96", "M20 40H48M72 40H100", "M58 14 60 6M50 16 46 10M66 16 70 10"],
  phone: ["M38 12H82C86 12 88 14 88 18V102C88 106 86 108 82 108H38C34 108 32 106 32 102V18C32 14 34 12 38 12Z", "M32 24H88M32 92H88", "M56 100H64"],
  facade: ["M14 106V36H106V106", "M8 36H112L104 20H16Z", "M28 106V60H52V106", "M64 60H94V86H64Z", "M34 48H86"],
  room: ["M10 100H110", "M20 100V70H50V100M34 70V58", "M70 100V64C70 56 90 56 90 64V100", "M60 20V34M44 44C44 36 76 36 76 44Z"],
  people: ["M40 46a12 12 0 1 0 .1 0M80 46a12 12 0 1 0 .1 0", "M18 104C18 80 28 64 40 64S62 80 62 104", "M58 104C58 80 68 64 80 64S102 80 102 104"],
};

export function Illus({ name, className = "h-24 w-24", strokeWidth = 3 }: { name: IllusName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export declare const PALETTE: Record<"teal" | "mustard" | "coral" | "cream" | "ink" | "sky" | "wood", string>;
export declare function plateShards(opts?: { cx?: number; cy?: number; r?: number; seed?: number; rings?: number[]; counts?: number[] }): { d: string; fill: string; cx: number; cy: number }[];
export declare function looseShards(n?: number, seed?: number, size?: number): { d: string; fill: string }[];

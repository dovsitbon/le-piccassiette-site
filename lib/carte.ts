import carte from "@/data/carte.json";

export type Tag = "house" | "season" | "share" | "veggie";
export type Illus = "baguette" | "bowl" | "sandwich" | "salad" | "pot" | "board" | "glass" | "jar";
export type Item = {
  price: number | null;
  from: boolean;
  orderable: boolean;
  tags: Tag[];
  photo: string[];
  illus: Illus;
};
export type ItemId = keyof typeof carte.items;
export type CategoryId = "midi" | "moment" | "apero" | "rhums";
export type Parfum = { fr: string; en: string };

export const ITEMS = carte.items as unknown as Record<ItemId, Item>;
export const ITEM_IDS = Object.keys(ITEMS) as ItemId[];
export const ORDERABLE = ITEM_IDS.filter((id) => ITEMS[id].orderable);
export const PARFUMS = carte.parfums.items as Parfum[];
export const isItem = (v: unknown): v is ItemId => typeof v === "string" && v in ITEMS;

/** Onglets de la carte (data/carte.json). */
export const categories = () => carte.categories as { id: CategoryId; items: ItemId[] }[];

/** Prix d'un plat ; null tant qu'il n'est pas renseigné (« prix à l'ardoise »). */
export const unitPrice = (id: ItemId) => ITEMS[id].price;

export const checked = carte.checked;

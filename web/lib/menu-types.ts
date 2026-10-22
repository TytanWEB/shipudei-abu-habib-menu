export type Lang = "he" | "en" | "ar";
export type L10n = Record<Lang, string>;
export type TagKind = "hot" | "veg" | "plain";

export interface Category {
  id: string;
  label: L10n; // short header tab text, e.g. "Grill"
  title: L10n; // category intro heading, e.g. "From the Grill"
  blurb: L10n; // category intro paragraph
  order: number;
}

export interface DishImage {
  thumb: string;
  hero: string;
}

export interface Dish {
  id: string;
  categoryId: string;
  price: number;
  image: DishImage | null;
  tag: L10n;
  tagKind: TagKind;
  name: L10n;
  short: L10n;
  long: L10n;
  facts: Record<Lang, string[]>;
  order: number;
}

export interface MenuData {
  categories: Category[];
  dishes: Dish[];
}

export const LANGS: Lang[] = ["he", "en", "ar"];

export function emptyL10n(): L10n {
  return { he: "", en: "", ar: "" };
}

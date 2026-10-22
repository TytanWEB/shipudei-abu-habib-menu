import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { put } from "@vercel/blob";
import type { DishImage } from "./menu-types";

const THUMB_SIZE = 208;
const HERO_WIDTH = 880;
const HERO_HEIGHT = 550;

/** Resizes an uploaded photo into the thumb/hero pair and uploads both to Blob. */
export async function processDishImage(file: File, dishId: string): Promise<DishImage> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base = sharp(bytes).rotate();
  const unique = randomUUID().slice(0, 8);

  const [thumbBuf, heroBuf] = await Promise.all([
    base.clone().resize(THUMB_SIZE, THUMB_SIZE, { fit: "cover" }).webp({ quality: 78 }).toBuffer(),
    base.clone().resize(HERO_WIDTH, HERO_HEIGHT, { fit: "cover" }).webp({ quality: 78 }).toBuffer(),
  ]);

  const [thumb, hero] = await Promise.all([
    put(`menu/dishes/${dishId}-${unique}-thumb.webp`, thumbBuf, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
    }),
    put(`menu/dishes/${dishId}-${unique}-hero.webp`, heroBuf, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
    }),
  ]);

  return { thumb: thumb.url, hero: hero.url };
}

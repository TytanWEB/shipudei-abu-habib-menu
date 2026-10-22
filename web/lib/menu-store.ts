import { del, list, put } from "@vercel/blob";
import type { MenuData } from "./menu-types";

// Vercel Blob is not read-after-write consistent when overwriting a fixed
// pathname — a get() right after a put() can keep returning stale content
// for well over a minute (its CDN cache honors Cache-Control regardless of
// the read-side `useCache` option). Every write here instead creates a new,
// never-reused pathname, and reads find the latest one via list(), which is
// consistent far sooner. A short retry loop absorbs the remaining brief lag,
// and old versions are pruned after each successful write.
const PREFIX = "menu/data/";
const KEEP_VERSIONS = 3;

const EMPTY_MENU: MenuData = { categories: [], dishes: [] };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function latestBlob() {
  const { blobs } = await list({ prefix: PREFIX });
  if (blobs.length === 0) return null;
  return [...blobs].sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
}

export async function readMenuData(): Promise<MenuData> {
  const latest = await latestBlob().catch((err) => {
    console.error("readMenuData: list() failed", err);
    return null;
  });
  if (!latest) return EMPTY_MENU;

  const res = await fetch(latest.url, { cache: "no-store" }).catch(() => null);
  if (!res || !res.ok) return EMPTY_MENU;

  try {
    const parsed = (await res.json()) as MenuData;
    if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.dishes)) return EMPTY_MENU;
    return parsed;
  } catch (err) {
    console.error("readMenuData: invalid JSON in blob", err);
    return EMPTY_MENU;
  }
}

export async function writeMenuData(data: MenuData): Promise<void> {
  const payload = JSON.stringify(data);
  const pathname = `${PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`;
  await put(pathname, payload, {
    access: "public",
    contentType: "application/json",
  });

  // list() reporting this pathname as latest doesn't guarantee the blob's
  // content is fetchable yet — content propagation can lag behind the list
  // metadata. Verify both before returning to the caller (which redirects
  // straight back to a page that reads this data).
  for (let attempt = 0; attempt < 20; attempt++) {
    const latest = await latestBlob();
    if (latest?.pathname === pathname) {
      const res = await fetch(latest.url, { cache: "no-store" }).catch(() => null);
      const text = res && res.ok ? await res.text() : null;
      if (text === payload) break;
    }
    await sleep(250);
  }

  // Prune older versions so the store doesn't grow without bound.
  const { blobs } = await list({ prefix: PREFIX });
  const sorted = [...blobs].sort((a, b) => b.pathname.localeCompare(a.pathname));
  const stale = sorted.slice(KEEP_VERSIONS).map((b) => b.pathname);
  if (stale.length > 0) await del(stale).catch(() => {});
}

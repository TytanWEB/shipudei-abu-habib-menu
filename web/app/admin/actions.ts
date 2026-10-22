"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readMenuData, writeMenuData } from "@/lib/menu-store";
import { processDishImage } from "@/lib/dish-image";
import {
  createSessionToken,
  requireAdmin,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import type { L10n, TagKind } from "@/lib/menu-types";

function l10n(formData: FormData, prefix: string): L10n {
  return {
    he: String(formData.get(`${prefix}_he`) ?? "").trim(),
    en: String(formData.get(`${prefix}_en`) ?? "").trim(),
    ar: String(formData.get(`${prefix}_ar`) ?? "").trim(),
  };
}

function factsL10n(formData: FormData, prefix: string): Record<"he" | "en" | "ar", string[]> {
  const split = (raw: string) =>
    raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    he: split(String(formData.get(`${prefix}_he`) ?? "")),
    en: split(String(formData.get(`${prefix}_en`) ?? "")),
    ar: split(String(formData.get(`${prefix}_ar`) ?? "")),
  };
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
}

/** Revalidates both the public page and the dashboard, then redirects back
 * to the dashboard — this forces a fresh render instead of relying on the
 * client to notice the revalidation on its own. */
function revalidateAll(): never {
  revalidatePath("/");
  revalidatePath("/admin");
  // Redirecting to the exact current path can be a client-side no-op in some
  // cases; a distinct query string forces a genuine fresh navigation.
  redirect(`/admin?_=${Date.now()}`);
}

// --- Auth ---

export async function login(formData: FormData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string" || password !== expected) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// --- Categories ---

export async function addCategory(formData: FormData) {
  await requireAdmin();
  const data = await readMenuData();

  const label = l10n(formData, "label");
  const title = l10n(formData, "title");
  const blurb = l10n(formData, "blurb");

  let id = slugify(label.en || title.en || "section");
  const existingIds = new Set(data.categories.map((c) => c.id));
  if (existingIds.has(id)) {
    let n = 2;
    while (existingIds.has(`${id}-${n}`)) n++;
    id = `${id}-${n}`;
  }

  const maxOrder = data.categories.reduce((m, c) => Math.max(m, c.order), -1);
  data.categories.push({ id, label, title, blurb, order: maxOrder + 1 });

  await writeMenuData(data);
  revalidateAll();
}

export async function updateCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = await readMenuData();
  const cat = data.categories.find((c) => c.id === id);
  if (!cat) return;

  cat.label = l10n(formData, "label");
  cat.title = l10n(formData, "title");
  cat.blurb = l10n(formData, "blurb");

  await writeMenuData(data);
  revalidateAll();
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = await readMenuData();
  data.categories = data.categories.filter((c) => c.id !== id);
  data.dishes = data.dishes.filter((d) => d.categoryId !== id);
  await writeMenuData(data);
  revalidateAll();
}

export async function moveCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const data = await readMenuData();
  const sorted = [...data.categories].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((c) => c.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= sorted.length) return;

  const tmp = sorted[idx].order;
  sorted[idx].order = sorted[swapIdx].order;
  sorted[swapIdx].order = tmp;

  await writeMenuData(data);
  revalidateAll();
}

// --- Dishes ---

export async function addDish(formData: FormData) {
  await requireAdmin();
  const data = await readMenuData();

  const categoryId = String(formData.get("categoryId") ?? "");
  const id = randomUUID().slice(0, 8);
  const maxOrder = data.dishes
    .filter((d) => d.categoryId === categoryId)
    .reduce((m, d) => Math.max(m, d.order), -1);

  const photo = formData.get("photo");
  const image =
    photo instanceof File && photo.size > 0 ? await processDishImage(photo, id) : null;

  data.dishes.push({
    id,
    categoryId,
    order: maxOrder + 1,
    price: Number(formData.get("price")) || 0,
    image,
    tag: l10n(formData, "tag"),
    tagKind: (String(formData.get("tagKind") ?? "plain") as TagKind),
    name: l10n(formData, "name"),
    short: l10n(formData, "short"),
    long: l10n(formData, "long"),
    facts: factsL10n(formData, "facts"),
  });

  await writeMenuData(data);
  revalidateAll();
}

export async function updateDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = await readMenuData();
  const dish = data.dishes.find((d) => d.id === id);
  if (!dish) return;

  dish.price = Number(formData.get("price")) || 0;
  dish.tag = l10n(formData, "tag");
  dish.tagKind = String(formData.get("tagKind") ?? "plain") as TagKind;
  dish.name = l10n(formData, "name");
  dish.short = l10n(formData, "short");
  dish.long = l10n(formData, "long");
  dish.facts = factsL10n(formData, "facts");

  if (formData.get("removePhoto") === "on") {
    dish.image = null;
  } else {
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size > 0) {
      dish.image = await processDishImage(photo, dish.id);
    }
  }

  await writeMenuData(data);
  revalidateAll();
}

export async function deleteDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = await readMenuData();
  data.dishes = data.dishes.filter((d) => d.id !== id);
  await writeMenuData(data);
  revalidateAll();
}

export async function moveDish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const data = await readMenuData();
  const dish = data.dishes.find((d) => d.id === id);
  if (!dish) return;

  const siblings = data.dishes
    .filter((d) => d.categoryId === dish.categoryId)
    .sort((a, b) => a.order - b.order);
  const idx = siblings.findIndex((d) => d.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= siblings.length) return;

  const tmp = siblings[idx].order;
  siblings[idx].order = siblings[swapIdx].order;
  siblings[swapIdx].order = tmp;

  await writeMenuData(data);
  revalidateAll();
}

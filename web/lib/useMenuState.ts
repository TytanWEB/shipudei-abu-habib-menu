"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, Lang } from "@/data/menu";

const LANG_STORAGE_KEY = "menu:lang";
const VALID_LANGS: readonly string[] = ["he", "en", "ar"];

function isLang(value: string | null): value is Lang {
  return !!value && VALID_LANGS.includes(value);
}

export function useMenuState() {
  const [lang, setLangState] = useState<Lang>("he");
  const [splashOpen, setSplashOpen] = useState(true);
  const [category, setCategory] = useState<Category>("grill");
  const [openDishId, setOpenDishIdState] = useState<string | null>(null);
  const [tableNo, setTableNo] = useState<string | undefined>(undefined);
  const pushedDishRef = useRef(false);

  // One-time init from the URL (?t=, ?lang=, ?dish=) and localStorage.
  // Guarded to the client: this all depends on `window`, unavailable
  // during the static-export prerender pass, so it can't be read during
  // render without a server/client hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const t = params.get("t");
    if (t) setTableNo(t);

    const urlLang = params.get("lang");
    const storedLang = window.localStorage.getItem(LANG_STORAGE_KEY);
    const initialLang = isLang(urlLang) ? urlLang : isLang(storedLang) ? storedLang : null;
    if (initialLang) setLangState(initialLang);

    const dish = params.get("dish");
    if (dish) {
      setOpenDishIdState(dish);
      setSplashOpen(false);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Mirror the prototype's full-layout mirror: dir flips with language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  }, [lang]);

  // Lock body scroll while the dish sheet is open.
  useEffect(() => {
    document.body.style.overflow = openDishId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openDishId]);

  // Browser Back closes the sheet (we push `?dish=` when opening one).
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setOpenDishIdState(params.get("dish"));
      pushedDishRef.current = false;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const closeDish = useCallback(() => {
    setOpenDishIdState(null);
    if (pushedDishRef.current) {
      pushedDishRef.current = false;
      window.history.back();
    } else {
      const params = new URLSearchParams(window.location.search);
      params.delete("dish");
      const qs = params.toString();
      window.history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
    }
  }, []);

  // Escape key closes the sheet.
  useEffect(() => {
    if (!openDishId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDish();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openDishId, closeDish]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    setSplashOpen(false);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Storage can throw in private-browsing contexts — non-fatal.
    }
  }, []);

  const openDish = useCallback((id: string) => {
    setOpenDishIdState(id);
    const params = new URLSearchParams(window.location.search);
    params.set("dish", id);
    window.history.pushState({}, "", `?${params.toString()}`);
    pushedDishRef.current = true;
  }, []);

  return {
    lang,
    setLang,
    splashOpen,
    category,
    setCategory,
    openDishId,
    openDish,
    closeDish,
    tableNo,
  };
}

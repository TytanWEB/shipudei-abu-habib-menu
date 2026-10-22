"use client";

import { useMemo } from "react";
import { useMenuState } from "@/lib/useMenuState";
import type { MenuData } from "@/lib/menu-types";
import { SplashScreen } from "./SplashScreen";
import { Header } from "./Header";
import { CategoryIntro } from "./CategoryIntro";
import { DishList } from "./DishList";
import { DishSheet } from "./DishSheet";
import { Footer } from "./Footer";

const FONT_STACKS: Record<string, string> = {
  he: "var(--font-heebo), var(--font-archivo), system-ui, sans-serif",
  en: "var(--font-heebo), var(--font-archivo), system-ui, sans-serif",
  ar: "var(--font-noto-arabic), var(--font-heebo), var(--font-archivo), system-ui, sans-serif",
};

export function MenuApp({ menuData }: { menuData: MenuData }) {
  const categories = useMemo(
    () => [...menuData.categories].sort((a, b) => a.order - b.order),
    [menuData.categories],
  );

  const {
    lang,
    setLang,
    splashOpen,
    category,
    setCategory,
    openDishId,
    openDish,
    closeDish,
    tableNo,
  } = useMenuState(categories[0]?.id ?? "");

  const dir = lang === "en" ? "ltr" : "rtl";

  const activeCategory = categories.find((c) => c.id === category) ?? categories[0];
  const dishes = useMemo(
    () =>
      menuData.dishes
        .filter((d) => d.categoryId === activeCategory?.id)
        .sort((a, b) => a.order - b.order),
    [menuData.dishes, activeCategory?.id],
  );
  const openDish_ = openDishId ? menuData.dishes.find((d) => d.id === openDishId) : undefined;

  return (
    <div
      className="flex min-h-screen justify-center"
      style={{ background: "var(--color-page)", fontFamily: FONT_STACKS[lang] }}
    >
      <div
        dir={dir}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 440,
          minHeight: "100vh",
          background: "var(--color-bg)",
          boxShadow: "0 0 80px rgba(0,0,0,.6)",
        }}
      >
        {splashOpen && <SplashScreen lang={lang} tableNo={tableNo} onPick={setLang} />}

        <Header
          lang={lang}
          tableNo={tableNo}
          categories={categories}
          category={activeCategory?.id ?? ""}
          onLangChange={setLang}
          onCategoryChange={setCategory}
        />
        {activeCategory && <CategoryIntro lang={lang} category={activeCategory} />}
        <DishList lang={lang} dishes={dishes} onOpenDish={openDish} />

        {openDishId && <DishSheet dish={openDish_} lang={lang} onClose={closeDish} />}

        <Footer lang={lang} />
      </div>
    </div>
  );
}

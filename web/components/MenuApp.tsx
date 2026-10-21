"use client";

import { useMenuState } from "@/lib/useMenuState";
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

export function MenuApp() {
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
  } = useMenuState();

  const dir = lang === "en" ? "ltr" : "rtl";

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
          category={category}
          onLangChange={setLang}
          onCategoryChange={setCategory}
        />
        <CategoryIntro lang={lang} category={category} />
        <DishList lang={lang} category={category} onOpenDish={openDish} />

        {openDishId && <DishSheet dishId={openDishId} lang={lang} onClose={closeDish} />}

        <Footer lang={lang} />
      </div>
    </div>
  );
}

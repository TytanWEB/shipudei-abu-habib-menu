import { T, type Category, type Lang } from "@/data/menu";

export function CategoryIntro({ lang, category }: { lang: Lang; category: Category }) {
  const t = T[lang];

  return (
    <div style={{ padding: "22px 18px 6px" }}>
      <h2 className="font-extrabold" style={{ margin: 0, fontSize: 32, letterSpacing: "-.02em", lineHeight: 1.1 }}>
        {t.titles[category]}
      </h2>
      <p
        className="font-light"
        style={{
          margin: "8px 0 0",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--color-text-3)",
          maxWidth: "36ch",
        }}
      >
        {t.blurbs[category]}
      </p>
    </div>
  );
}

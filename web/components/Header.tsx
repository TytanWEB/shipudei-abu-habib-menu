import Image from "next/image";
import { UI } from "@/lib/ui-strings";
import { LANGS, type Category, type Lang } from "@/lib/menu-types";

export function Header({
  lang,
  tableNo,
  categories,
  category,
  onLangChange,
  onCategoryChange,
}: {
  lang: Lang;
  tableNo?: string;
  categories: Category[];
  category: string;
  onLangChange: (lang: Lang) => void;
  onCategoryChange: (category: string) => void;
}) {
  const t = UI[lang];

  return (
    <div
      className="sticky top-0 z-20"
      style={{
        background: "rgba(20,17,16,.86)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="flex items-center justify-between gap-3" style={{ padding: "14px 18px 10px" }}>
        <div className="flex min-w-0 items-center gap-[11px]">
          <Image
            src="/images/logo.webp"
            alt=""
            width={42}
            height={42}
            style={{
              objectFit: "contain",
              borderRadius: 12,
              background: "#000",
              flex: "none",
              boxShadow: "0 0 0 1px rgba(246,241,236,.15)",
            }}
          />
          <div className="flex min-w-0 flex-col">
            <div className="whitespace-nowrap font-bold" style={{ fontSize: 16, lineHeight: 1.15 }}>
              שיפודי אבו חביב
            </div>
            <div
              className="whitespace-nowrap uppercase"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: 10,
                letterSpacing: ".06em",
                color: "var(--color-meta)",
              }}
            >
              {tableNo ? `Table ${tableNo} · ${t.hours}` : t.hours}
            </div>
          </div>
        </div>

        <div className="flex gap-1 rounded-full" style={{ background: "rgba(246,241,236,.07)", padding: 3 }}>
          {LANGS.map((code) => {
            const active = code === lang;
            return (
              <button
                key={code}
                type="button"
                onClick={() => onLangChange(code)}
                className="cursor-pointer rounded-full border-0 font-semibold"
                style={{
                  fontSize: 12,
                  padding: "7px 11px",
                  minWidth: 38,
                  background: active ? "var(--color-accent)" : "transparent",
                  color: active ? "#fff" : "var(--color-text-3)",
                }}
              >
                {UI[code].short}
              </button>
            );
          })}
        </div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto" style={{ padding: "4px 18px 14px" }}>
        {categories.map((cat) => {
          const active = cat.id === category;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className="category-chip cursor-pointer whitespace-nowrap rounded-full"
              style={{
                fontSize: 15,
                padding: "10px 20px",
                minHeight: 44,
                background: active ? "var(--color-text)" : "transparent",
                color: active ? "var(--color-bg)" : "var(--color-text-3)",
                border: active ? "1px solid var(--color-text)" : "1px solid rgba(246,241,236,.16)",
                fontWeight: active ? 700 : 500,
              }}
            >
              {cat.label[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

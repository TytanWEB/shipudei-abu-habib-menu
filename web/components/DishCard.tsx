import type { CSSProperties } from "react";
import Image from "next/image";
import type { Dish, Lang, TagKind } from "@/data/menu";

const STRIPE_BG: CSSProperties = {
  backgroundColor: "#2a2422",
  backgroundImage: "repeating-linear-gradient(135deg, #332c29 0 6px, #2a2422 6px 12px)",
};

const TAG_STYLES: Record<TagKind, CSSProperties> = {
  hot: { background: "rgba(236,48,19,.18)", color: "#ff8a70", border: "1px solid rgba(236,48,19,.35)" },
  veg: { background: "rgba(150,200,120,.14)", color: "#a8cf8a", border: "1px solid rgba(150,200,120,.28)" },
  plain: { background: "rgba(246,241,236,.07)", color: "var(--color-text-3)", border: "1px solid rgba(246,241,236,.12)" },
};

export function DishCard({ dish, lang, onOpen }: { dish: Dish; lang: Lang; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="dish-card flex items-stretch gap-[14px] rounded-[20px] text-start"
      style={{ padding: 10 }}
    >
      {dish.image ? (
        <Image
          src={dish.image.thumb}
          alt=""
          width={104}
          height={104}
          style={{ flex: "none", borderRadius: 14, objectFit: "cover" }}
        />
      ) : (
        <div style={{ width: 104, height: 104, flex: "none", borderRadius: 14, ...STRIPE_BG }} />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]" style={{ padding: "6px 4px 6px 0" }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold" style={{ fontSize: 18, lineHeight: 1.2 }}>
            {dish.name[lang]}
          </span>
          <span
            className="whitespace-nowrap rounded-full font-medium"
            style={{ fontSize: 11, padding: "3px 9px", ...TAG_STYLES[dish.tagKind] }}
          >
            {dish.tag[lang]}
          </span>
        </div>
        <div className="font-light" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--color-text-3)", flex: 1 }}>
          {dish.short[lang]}
        </div>
        <div className="font-semibold" style={{ fontFamily: "var(--font-archivo)", fontSize: 16, color: "var(--color-price)" }}>
          ₪{dish.price}
        </div>
      </div>
    </button>
  );
}

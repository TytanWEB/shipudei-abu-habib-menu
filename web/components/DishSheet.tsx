import { useRef, type TouchEvent } from "react";
import Image from "next/image";
import { findDish, T, type Lang } from "@/data/menu";

export function DishSheet({
  dishId,
  lang,
  onClose,
}: {
  dishId: string;
  lang: Lang;
  onClose: () => void;
}) {
  const dish = findDish(dishId);
  const t = T[lang];
  const touchStartY = useRef<number | null>(null);

  if (!dish) return null;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartY.current == null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (deltaY > 60) onClose();
  };

  return (
    <div
      onClick={onClose}
      className="animate-fade-fast fixed inset-0 z-30 flex items-end justify-center"
      style={{ background: "rgba(8,6,6,.7)", backdropFilter: "blur(3px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up relative w-full overflow-auto"
        style={{ maxWidth: 440, background: "var(--color-surface)", borderRadius: "28px 28px 0 0", maxHeight: "90vh" }}
      >
        <div className="relative" style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: "28px 28px 0 0", overflow: "hidden" }}>
          {dish.image ? (
            <>
              <Image src={dish.image.hero} alt="" fill style={{ objectFit: "cover" }} priority />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(140% 140% at 50% 38%, transparent 20%, rgba(6,4,3,.62) 100%), rgba(10,7,6,.22)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, var(--color-surface) 2%, transparent 55%)" }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#2a2422",
                backgroundImage: "repeating-linear-gradient(135deg, #332c29 0 6px, #2a2422 6px 12px)",
              }}
            />
          )}
        </div>

        <div className="relative flex flex-col gap-[14px]" style={{ marginTop: -46, padding: "0 22px 26px" }}>
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              width: 44,
              height: 4,
              borderRadius: 999,
              background: "rgba(246,241,236,.5)",
              margin: "-24px auto 14px",
              touchAction: "none",
            }}
          />
          <div className="flex items-start justify-between gap-[14px]">
            <h3 className="font-extrabold" style={{ margin: 0, fontSize: 27, letterSpacing: "-.02em", lineHeight: 1.15 }}>
              {dish.name[lang]}
            </h3>
            <span
              className="whitespace-nowrap font-bold"
              style={{ fontFamily: "var(--font-archivo)", fontSize: 22, color: "var(--color-price)" }}
            >
              ₪{dish.price}
            </span>
          </div>
          <p className="font-light" style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-text-2)" }}>
            {dish.long[lang]}
          </p>
          <div className="flex flex-wrap gap-2">
            {dish.facts[lang].map((fact, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  fontSize: 12,
                  background: "rgba(246,241,236,.07)",
                  border: "1px solid rgba(246,241,236,.12)",
                  padding: "7px 13px",
                  color: "var(--color-text-2)",
                }}
              >
                {fact}
              </span>
            ))}
          </div>
          <div className="font-light" style={{ fontSize: 12, color: "var(--color-text-4)", lineHeight: 1.6 }}>
            {t.allergen}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cta-button cursor-pointer rounded-full border-0 font-semibold text-white"
            style={{ fontSize: 16, padding: 17, minHeight: 56, boxShadow: "0 10px 26px rgba(236,48,19,.3)" }}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

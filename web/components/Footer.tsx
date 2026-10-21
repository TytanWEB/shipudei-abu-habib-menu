import { T, type Lang } from "@/data/menu";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <div
      className="sticky bottom-0 z-[15] flex items-center justify-center"
      style={{
        background: "linear-gradient(to top, var(--color-bg) 60%, transparent)",
        padding: 18,
      }}
    >
      <span className="font-light" style={{ fontSize: 12, color: "var(--color-text-4)" }}>
        {T[lang].footer}
      </span>
    </div>
  );
}

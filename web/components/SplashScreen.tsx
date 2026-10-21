import Image from "next/image";
import { LANGS, T, type Lang } from "@/data/menu";

export function SplashScreen({
  lang,
  tableNo,
  onPick,
}: {
  lang: Lang;
  tableNo?: string;
  onPick: (lang: Lang) => void;
}) {
  const t = T[lang];

  return (
    <div
      className="animate-fade fixed inset-0 z-40 mx-auto flex max-w-[440px] flex-col items-center justify-between"
      style={{ background: "var(--color-page)", padding: "44px 28px 32px" }}
    >
      <div
        className="uppercase"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: 11,
          letterSpacing: ".28em",
          color: "var(--color-meta)",
        }}
      >
        Table {tableNo ?? "—"} · Yefet 114
      </div>

      <div className="animate-rise flex flex-col items-center gap-[22px]">
        <Image
          src="/images/logo.webp"
          alt="שיפודי אבו חביב"
          width={252}
          height={252}
          priority
          style={{
            objectFit: "contain",
            borderRadius: 24,
            background: "#000",
            padding: 6,
            boxShadow: "0 24px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(246,241,236,.12)",
          }}
        />
        <p
          className="text-center font-light"
          style={{
            margin: 0,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--color-text-2)",
            maxWidth: "24ch",
          }}
        >
          {t.splash}
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <div
          className="text-center uppercase"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: 10,
            letterSpacing: ".24em",
            color: "var(--color-meta)",
          }}
        >
          Language · שפה · لغة
        </div>
        <div className="flex gap-[10px]">
          {LANGS.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onPick(code)}
              className="lang-pill flex-1 cursor-pointer rounded-full font-medium"
              style={{
                color: "var(--color-text)",
                padding: "16px 8px",
                fontSize: 15,
                minHeight: 56,
              }}
            >
              {T[code].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

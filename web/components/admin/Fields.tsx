import type { L10n, Lang } from "@/lib/menu-types";
import { fieldsetStyle, inputStyle, LANG_LABELS, legendStyle, textareaStyle } from "./ui";

const LANGS: Lang[] = ["he", "en", "ar"];

export function L10nInputs({
  prefix,
  label,
  defaultValue,
}: {
  prefix: string;
  label: string;
  defaultValue?: L10n;
}) {
  return (
    <fieldset style={fieldsetStyle}>
      <legend style={legendStyle}>{label}</legend>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {LANGS.map((lang) => (
          <input
            key={lang}
            name={`${prefix}_${lang}`}
            placeholder={LANG_LABELS[lang]}
            defaultValue={defaultValue?.[lang]}
            dir={lang === "en" ? "ltr" : "rtl"}
            style={inputStyle}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function L10nTextareas({
  prefix,
  label,
  defaultValue,
}: {
  prefix: string;
  label: string;
  defaultValue?: L10n;
}) {
  return (
    <fieldset style={fieldsetStyle}>
      <legend style={legendStyle}>{label}</legend>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {LANGS.map((lang) => (
          <textarea
            key={lang}
            name={`${prefix}_${lang}`}
            placeholder={LANG_LABELS[lang]}
            defaultValue={defaultValue?.[lang]}
            dir={lang === "en" ? "ltr" : "rtl"}
            rows={2}
            style={textareaStyle}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** One fact per line, per language. */
export function FactsInputs({
  prefix,
  label,
  defaultValue,
}: {
  prefix: string;
  label: string;
  defaultValue?: Record<Lang, string[]>;
}) {
  return (
    <fieldset style={fieldsetStyle}>
      <legend style={legendStyle}>{label} (one per line)</legend>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {LANGS.map((lang) => (
          <textarea
            key={lang}
            name={`${prefix}_${lang}`}
            placeholder={LANG_LABELS[lang]}
            defaultValue={defaultValue?.[lang]?.join("\n")}
            dir={lang === "en" ? "ltr" : "rtl"}
            rows={3}
            style={textareaStyle}
          />
        ))}
      </div>
    </fieldset>
  );
}

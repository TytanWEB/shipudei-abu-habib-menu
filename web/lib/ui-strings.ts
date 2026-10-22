import type { Lang } from "./menu-types";

interface UiStrings {
  dir: "rtl" | "ltr";
  short: string;
  label: string;
  splash: string;
  close: string;
  hours: string;
  allergen: string;
  footer: string;
}

export const UI: Record<Lang, UiStrings> = {
  he: {
    dir: "rtl",
    short: "עב",
    label: "עברית",
    splash: "שבו, תנשמו. הבשר כבר על הפחמים.",
    close: "חזרה לתפריט",
    hours: "12:00–23:30",
    allergen: "ייתכנו אלרגנים. יש רגישות? ספרו למלצר לפני ההזמנה.",
    footer: "המחירים בשקלים · שירות לא כלול",
  },
  en: {
    dir: "ltr",
    short: "EN",
    label: "English",
    splash: "Sit down, breathe. The meat is already on the coals.",
    close: "Back to the menu",
    hours: "12:00–23:30",
    allergen: "May contain allergens. Tell your server about any sensitivities before ordering.",
    footer: "Prices in ILS · Service not included",
  },
  ar: {
    dir: "rtl",
    short: "ع",
    label: "العربية",
    splash: "اجلس واسترح. اللحم على الفحم.",
    close: "العودة للقائمة",
    hours: "12:00–23:30",
    allergen: "قد يحتوي على مسببات حساسية. أخبر النادل قبل الطلب.",
    footer: "الأسعار بالشيكل · الخدمة غير مشمولة",
  },
};

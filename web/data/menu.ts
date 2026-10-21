// Copied verbatim from prototype/Menu.dc.html's DATA/T constants.
// Dishes and prices are placeholders written for the design handoff —
// confirm the real menu with the owner before launch.

export type Lang = "he" | "en" | "ar";
export type L10n = Record<Lang, string>;
export type Category = "starters" | "grill" | "drinks";
export type TagKind = "hot" | "veg" | "plain";

export interface Dish {
  id: string;
  category: Category;
  price: number;
  image?: { thumb: string; hero: string };
  tag: L10n;
  tagKind: TagKind;
  name: L10n;
  short: L10n;
  long: L10n;
  facts: Record<Lang, string[]>;
}

export const LANGS: Lang[] = ["he", "en", "ar"];
export const CATEGORIES: Category[] = ["starters", "grill", "drinks"];

function dishImage(id: string): { thumb: string; hero: string } {
  return {
    thumb: `/images/dishes/${id}-thumb.webp`,
    hero: `/images/dishes/${id}-hero.webp`,
  };
}

export const DISHES: Dish[] = [
  // --- Starters ---
  {
    id: "s1",
    category: "starters",
    price: 32,
    image: dishImage("s1"),
    tag: { he: "צמחוני", en: "Veg", ar: "نباتي" },
    tagKind: "veg",
    name: { he: "חומוס מסבחה", en: "Masabacha Hummus", ar: "حمص مسبحة" },
    short: {
      he: "גרגירים חמים, זעתר, שמן זית",
      en: "Warm chickpeas, zaatar, olive oil",
      ar: "حمص ساخن، زعتر، زيت زيتون",
    },
    long: {
      he: "חומוס טחון גס עם גרגירי חומוס חמים, לימון, שום וכף שמן זית. מוגש עם פיתה מהטאבון.",
      en: "Coarse-ground hummus topped with warm chickpeas, lemon, garlic and a spoon of olive oil. Served with taboon bread.",
      ar: "حمص مطحون خشن مع حبات ساخنة، ليمون، ثوم وزيت زيتون. يقدم مع خبز الطابون.",
    },
    facts: {
      he: ["טבעוני", "מוגש חם", "פיתה כלולה"],
      en: ["Vegan", "Served warm", "Bread included"],
      ar: ["نباتي صرف", "يقدم ساخناً", "خبز مشمول"],
    },
  },
  {
    id: "s2",
    category: "starters",
    price: 28,
    image: dishImage("s2"),
    tag: { he: "לשולחן", en: "To share", ar: "للمشاركة" },
    tagKind: "plain",
    name: { he: "סלטי הבית", en: "House Salads", ar: "سلطات البيت" },
    short: {
      he: "תשעה סלטים, מתחדשים כל יום",
      en: "Nine salads, refreshed daily",
      ar: "تسع سلطات، تتجدد يومياً",
    },
    long: {
      he: "תשעה סלטים קטנים שמשתנים לפי השוק: כרוב לימוני, חצילים בטחינה, מטבוחה, גזר חריף ועוד.",
      en: "Nine small salads that change with the market: lemony cabbage, aubergine in tahini, matbucha, spicy carrot and more.",
      ar: "تسع سلطات صغيرة تتغير حسب السوق: ملفوف بالليمون، باذنجان بالطحينة، مطبوخة، جزر حار وغيرها.",
    },
    facts: {
      he: ["ללא הגבלה", "משתנה יומית"],
      en: ["Unlimited refills", "Changes daily"],
      ar: ["تعبئة مجانية", "تتغير يومياً"],
    },
  },
  {
    id: "s3",
    category: "starters",
    price: 46,
    image: dishImage("s3"),
    tag: { he: "חריף", en: "Spicy", ar: "حار" },
    tagKind: "hot",
    name: { he: "נקניקיות חריפות", en: "Merguez Sausage", ar: "نقانق حارة" },
    short: {
      he: "מרגז כבש על הפחמים, לימון כבוש",
      en: "Lamb merguez on charcoal, preserved lemon",
      ar: "مرقاز الضأن على الفحم، ليمون مخلل",
    },
    long: {
      he: "מרגז כבש ביתי בתיבול הריסה, נצרב על הפחמים עד שהעור מתפצפץ. מוגש עם לימון כבוש וטחינה ירוקה.",
      en: "House lamb merguez seasoned with harissa, charred until the casing snaps. With preserved lemon and green tahini.",
      ar: "مرقاز ضأن بيتي بتتبيلة الهريسة، مشوي على الفحم. يقدم مع ليمون مخلل وطحينة خضراء.",
    },
    facts: {
      he: ["חריפות 2/3", "כבש", "על הפחמים"],
      en: ["Heat 2/3", "Lamb", "Charcoal"],
      ar: ["حرارة ٢/٣", "ضأن", "على الفحم"],
    },
  },
  {
    id: "s4",
    category: "starters",
    price: 34,
    image: dishImage("s4"),
    tag: { he: "קלאסי", en: "Classic", ar: "كلاسيكي" },
    tagKind: "plain",
    name: {
      he: "ממולאים של סבתא",
      en: "Grandma's Stuffed Vine Leaves",
      ar: "محاشي الجدة",
    },
    short: {
      he: "עלי גפן, אורז, בשר, לימון",
      en: "Vine leaves, rice, beef, lemon",
      ar: "ورق عنب، أرز، لحم، ليمون",
    },
    long: {
      he: "עלי גפן ממולאים באורז ובשר בקר, מבושלים לאט ברוטב לימון־שום עד שהם נמסים.",
      en: "Vine leaves rolled with rice and beef, slow-cooked in lemon-garlic broth until meltingly soft.",
      ar: "ورق عنب محشي بالأرز واللحم، مطبوخ ببطء بمرق الليمون والثوم.",
    },
    facts: {
      he: ["6 יחידות", "בישול איטי"],
      en: ["6 pieces", "Slow-cooked"],
      ar: ["٦ قطع", "طبخ بطيء"],
    },
  },
  {
    id: "s5",
    category: "starters",
    price: 42,
    image: dishImage("s5"),
    tag: { he: "לאמיצים", en: "Bold", ar: "للجريئين" },
    tagKind: "plain",
    name: { he: "כבד עוף בבצל", en: "Chicken Liver & Onion", ar: "كبد دجاج بالبصل" },
    short: {
      he: "כבד צרוב, בצל מקורמל",
      en: "Seared liver, caramelised onion",
      ar: "كبد مشوي، بصل مكرمل",
    },
    long: {
      he: "כבדי עוף צרובים במהירות על הפלנצ׳ה עם המון בצל מקורמל וטיפת ערק.",
      en: "Chicken livers flashed on the plancha with a mountain of caramelised onion and a splash of arak.",
      ar: "كبد دجاج مشوي سريعاً مع بصل مكرمل كثير ورشة عرق.",
    },
    facts: {
      he: ["נא־בינוני", "ללא גלוטן"],
      en: ["Medium", "Gluten free"],
      ar: ["وسط", "خالٍ من الغلوتين"],
    },
  },
  {
    id: "s6",
    category: "starters",
    price: 38,
    image: dishImage("s6"),
    tag: { he: "חורף", en: "Winter", ar: "شتاء" },
    tagKind: "plain",
    name: { he: "מרק קובה סלק", en: "Beetroot Kubbeh Soup", ar: "شوربة كبة شمندر" },
    short: { he: "סלק, סולת, בשר", en: "Beet, semolina, beef", ar: "شمندر، سميد، لحم" },
    long: {
      he: "מרק סלק חמוץ־מתוק עם שלוש כופתאות סולת ממולאות בשר בקר וגרעיני חמניות.",
      en: "Sweet-sour beetroot broth with three semolina dumplings filled with beef.",
      ar: "شوربة شمندر حلوة حامضة مع ثلاث كبات محشوة باللحم.",
    },
    facts: {
      he: ["3 קובות", "מוגש רותח"],
      en: ["3 dumplings", "Served boiling"],
      ar: ["٣ كبات", "يقدم ساخناً"],
    },
  },

  // --- Grill ---
  {
    id: "g1",
    category: "grill",
    price: 78,
    image: dishImage("g1"),
    tag: { he: "הכי נמכר", en: "Best seller", ar: "الأكثر طلباً" },
    tagKind: "hot",
    name: { he: "קבב חלבי כבש", en: "Lamb Kebab", ar: "كباب ضأن" },
    short: {
      he: "כבש טחון, פטרוזיליה, צנוברים",
      en: "Minced lamb, parsley, pine nuts",
      ar: "ضأن مفروم، بقدونس، صنوبر",
    },
    long: {
      he: "שתי שיפודי קבב כבש טחון גס עם פטרוזיליה, בצל וצנוברים קלויים. נצלה על פחמי אלון.",
      en: "Two skewers of coarsely minced lamb with parsley, onion and toasted pine nuts, grilled over oak charcoal.",
      ar: "سيخان من الضأن المفروم مع بقدونس وبصل وصنوبر، مشوي على فحم البلوط.",
    },
    facts: {
      he: ["2 שיפודים", "פחמי אלון", "מוגש עם פיתה"],
      en: ["2 skewers", "Oak charcoal", "Pita included"],
      ar: ["سيخان", "فحم بلوط", "مع خبز"],
    },
  },
  {
    id: "g2",
    category: "grill",
    price: 72,
    image: dishImage("g2"),
    tag: { he: "לילדים גם", en: "Kids like it", ar: "يحبه الأطفال" },
    tagKind: "plain",
    name: { he: "פרגית בשום ולימון", en: "Pargit — Garlic & Lemon", ar: "برجية بالثوم والليمون" },
    short: {
      he: "שוקי עוף במרינדה 24 שעות",
      en: "Chicken thigh, 24h marinade",
      ar: "فخذ دجاج، تتبيلة ٢٤ ساعة",
    },
    long: {
      he: "פרגית שהושרתה 24 שעות בשום, לימון וכורכום, נצלית עד שהקצוות פריכים והפנים עסיסי.",
      en: "Chicken thigh marinated 24 hours in garlic, lemon and turmeric, grilled until the edges crisp.",
      ar: "فخذ دجاج متبل ٢٤ ساعة بالثوم والليمون والكركم، مشوي حتى تصبح الأطراف مقرمشة.",
    },
    facts: {
      he: ["ללא גלוטן", "מרינדה 24ש׳"],
      en: ["Gluten free", "24h marinade"],
      ar: ["خالٍ من الغلوتين", "تتبيلة ٢٤ ساعة"],
    },
  },
  {
    id: "g3",
    category: "grill",
    price: 139,
    image: dishImage("g3"),
    tag: { he: "פרימיום", en: "Premium", ar: "ممتاز" },
    tagKind: "plain",
    name: { he: "אנטריקוט מיושן", en: "Aged Entrecôte", ar: "انتريكوت معتق" },
    short: {
      he: "300 גרם, יישון 45 יום",
      en: "300g, aged 45 days",
      ar: "٣٠٠ غرام، معتق ٤٥ يوماً",
    },
    long: {
      he: "אנטריקוט בקר מיושן 45 יום, 300 גרם, מלח גס וחמאת עשבים. מוגש עם צ׳ימיצ׳ורי הבית.",
      en: "45-day dry-aged entrecôte, 300g, coarse salt and herb butter. Served with house chimichurri.",
      ar: "انتريكوت معتق ٤٥ يوماً، ٣٠٠ غرام، ملح خشن وزبدة أعشاب مع الشيميتشوري.",
    },
    facts: {
      he: ["300 גרם", "יישון יבש", "בחר עשייה"],
      en: ["300g", "Dry aged", "Choose doneness"],
      ar: ["٣٠٠ غرام", "تعتيق جاف", "اختر النضج"],
    },
  },
  {
    id: "g4",
    category: "grill",
    price: 96,
    image: dishImage("g4"),
    tag: { he: "לשניים", en: "For two", ar: "لشخصين" },
    tagKind: "plain",
    name: { he: "מעורב ירושלמי", en: "Jerusalem Mixed Grill", ar: "مشاوي مشكلة" },
    short: {
      he: "לבבות, טחול, פרגית, בצל",
      en: "Hearts, spleen, thigh, onion",
      ar: "قلوب، طحال، برجية، بصل",
    },
    long: {
      he: "מעורב על הפלנצ׳ה בתיבול כמון־כורכום־הל, עם המון בצל ופיתה טרייה לניגוב.",
      en: "Plancha-fried mixed offal with cumin, turmeric and cardamom, heaps of onion, fresh pita to mop up.",
      ar: "مشاوي مشكلة على الصاج مع الكمون والكركم والهال، بصل كثير وخبز طازج.",
    },
    facts: {
      he: ["מנה לשניים", "חריפות 1/3"],
      en: ["Serves two", "Heat 1/3"],
      ar: ["لشخصين", "حرارة ١/٣"],
    },
  },
  {
    id: "g5",
    category: "grill",
    price: 154,
    image: dishImage("g5"),
    tag: { he: "על האש", en: "Charcoal", ar: "على الفحم" },
    tagKind: "plain",
    name: { he: "צלעות טלה", en: "Lamb Chops", ar: "ريش غنم" },
    short: {
      he: "ארבע צלעות, זעתר טרי",
      en: "Four chops, fresh zaatar",
      ar: "أربع ريشات، زعتر طازج",
    },
    long: {
      he: "ארבע צלעות טלה על העצם, מלח, פלפל וזעתר טרי בלבד. נצלות מהר על אש גבוהה.",
      en: "Four bone-in lamb chops — salt, pepper and fresh zaatar only, seared fast over high flame.",
      ar: "أربع ريشات غنم بالعظم مع الملح والفلفل والزعتر الطازج.",
    },
    facts: {
      he: ["4 יחידות", "על העצם"],
      en: ["4 pieces", "Bone in"],
      ar: ["٤ قطع", "بالعظم"],
    },
  },
  {
    id: "g6",
    category: "grill",
    price: 84,
    image: dishImage("g6"),
    tag: { he: "קלאסי", en: "Classic", ar: "كلاسيكي" },
    tagKind: "plain",
    name: { he: "שישליק בקר", en: "Beef Shishlik", ar: "شيشليك لحم" },
    short: {
      he: "נתחי בקר, פלפל, בצל",
      en: "Beef cubes, pepper, onion",
      ar: "مكعبات لحم، فلفل، بصل",
    },
    long: {
      he: "נתחי סינטה על שיפוד עם פלפל אדום ובצל, מוגש בינוני עם רוטב עגבניות חריף.",
      en: "Sirloin cubes skewered with red pepper and onion, served medium with spicy tomato sauce.",
      ar: "مكعبات سيرلوين مع الفلفل الأحمر والبصل، تقدم وسط مع صلصة طماطم حارة.",
    },
    facts: {
      he: ["2 שיפודים", "בינוני"],
      en: ["2 skewers", "Medium"],
      ar: ["سيخان", "وسط"],
    },
  },

  // --- Drinks (no photos — striped placeholder) ---
  {
    id: "d1",
    category: "drinks",
    price: 18,
    tag: { he: "הבית", en: "House", ar: "البيت" },
    tagKind: "veg",
    name: { he: "לימונענע", en: "Lemon–Mint", ar: "ليمون بالنعناع" },
    short: {
      he: "נענע טרייה, קרח כתוש",
      en: "Fresh mint, crushed ice",
      ar: "نعناع طازج، ثلج مجروش",
    },
    long: {
      he: "לימון סחוט טרי עם צרור נענע וקרח כתוש. חצי מתוק, מגיע בכד לשולחן.",
      en: "Fresh-squeezed lemon with a fistful of mint over crushed ice. Half-sweet; also by the jug.",
      ar: "ليمون طازج مع النعناع والثلج المجروش. متوفر بالإبريق.",
    },
    facts: {
      he: ["גם בכד — 44₪", "ללא סוכר בבקשה"],
      en: ["Jug ₪44", "Sugar-free option"],
      ar: ["إبريق ٤٤₪", "بدون سكر"],
    },
  },
  {
    id: "d2",
    category: "drinks",
    price: 14,
    tag: { he: "קר", en: "Cold", ar: "بارد" },
    tagKind: "plain",
    name: { he: "סודה בטעמים", en: "Flavoured Soda", ar: "صودا بنكهات" },
    short: {
      he: "ענבים, גזוז ורדים, לימון",
      en: "Grape, rose gazoz, lemon",
      ar: "عنب، غازوز ورد، ليمون",
    },
    long: {
      he: "סירופים ביתיים על סודה: ענבים, ורדים או לימון־מלוח. מוגש בבקבוק זכוכית.",
      en: "House syrups over soda — grape, rose or salted lemon. Served in a glass bottle.",
      ar: "شراب بيتي مع الصودا: عنب، ورد أو ليمون مملح.",
    },
    facts: {
      he: ["סירופ ביתי", "זכוכית"],
      en: ["House syrup", "Glass bottle"],
      ar: ["شراب بيتي", "زجاجة"],
    },
  },
  {
    id: "d3",
    category: "drinks",
    price: 16,
    tag: { he: "ללא סוכר", en: "No sugar", ar: "بدون سكر" },
    tagKind: "veg",
    name: { he: "תה קר מרווה", en: "Iced Sage Tea", ar: "شاي مريمية بارد" },
    short: { he: "מרווה, לימון, קרח", en: "Sage, lemon, ice", ar: "مريمية، ليمون، ثلج" },
    long: {
      he: "חליטת מרווה קרה עם פלחי לימון, ללא סוכר מוסף. מתמלא חינם.",
      en: "Cold sage infusion with lemon wedges, no added sugar. Free refills.",
      ar: "منقوع مريمية بارد مع الليمون، بدون سكر. تعبئة مجانية.",
    },
    facts: {
      he: ["מילוי חוזר חינם"],
      en: ["Free refills"],
      ar: ["تعبئة مجانية"],
    },
  },
  {
    id: "d4",
    category: "drinks",
    price: 13,
    tag: { he: "פחית", en: "Can", ar: "علبة" },
    tagKind: "plain",
    name: { he: "משקאות קלים", en: "Soft Drinks", ar: "مشروبات غازية" },
    short: {
      he: "קולה, זירו, ספרייט, פאנטה",
      en: "Cola, Zero, Sprite, Fanta",
      ar: "كولا، زيرو، سبرايت، فانتا",
    },
    long: {
      he: "פחית 330 מ״ל, מוגש מקורר עם קרח ופלח לימון.",
      en: "330ml can, served chilled with ice and a lemon wedge.",
      ar: "علبة ٣٣٠ مل، تقدم باردة مع ثلج وليمون.",
    },
    facts: {
      he: ["330 מ״ל"],
      en: ["330ml"],
      ar: ["٣٣٠ مل"],
    },
  },
  {
    id: "d5",
    category: "drinks",
    price: 12,
    tag: { he: "מים", en: "Water", ar: "مياه" },
    tagKind: "plain",
    name: { he: "מים מינרלים", en: "Mineral Water", ar: "مياه معدنية" },
    short: {
      he: "רגילים או מוגזים, 500 מ״ל",
      en: "Still or sparkling, 500ml",
      ar: "عادية أو فوارة، ٥٠٠ مل",
    },
    long: {
      he: "בקבוק 500 מ״ל, רגילים או מוגזים. מי ברז קרים תמיד על חשבון הבית.",
      en: "500ml bottle, still or sparkling. Cold tap water is always on the house.",
      ar: "زجاجة ٥٠٠ مل. مياه الصنبور الباردة مجاناً دائماً.",
    },
    facts: {
      he: ["ברז — חינם"],
      en: ["Tap — free"],
      ar: ["صنبور — مجاناً"],
    },
  },
  {
    id: "d6",
    category: "drinks",
    price: 15,
    tag: { he: "חם", en: "Hot", ar: "ساخن" },
    tagKind: "veg",
    name: { he: "תה נענע בכוס", en: "Mint Tea", ar: "شاي نعناع" },
    short: {
      he: "כוס זכוכית, סוכר בצד",
      en: "Glass cup, sugar aside",
      ar: "كأس زجاج، سكر جانباً",
    },
    long: {
      he: "תה שחור עם ענף נענע בכוס זכוכית קטנה, סוכר בצד. אחרי בשר זה חובה.",
      en: "Black tea with a mint sprig in a small glass, sugar on the side. Mandatory after meat.",
      ar: "شاي أسود مع النعناع في كأس صغير، السكر جانباً.",
    },
    facts: {
      he: ["מוגש רותח"],
      en: ["Served boiling"],
      ar: ["يقدم ساخناً"],
    },
  },
];

interface Translation {
  dir: "rtl" | "ltr";
  short: string;
  label: string;
  cats: Record<Category, string>;
  titles: Record<Category, string>;
  blurbs: Record<Category, string>;
  splash: string;
  close: string;
  hours: string;
  allergen: string;
  footer: string;
}

export const T: Record<Lang, Translation> = {
  he: {
    dir: "rtl",
    short: "עב",
    label: "עברית",
    cats: { starters: "ראשונות", grill: "על האש", drinks: "שתייה" },
    titles: { starters: "מנות ראשונות", grill: "על האש", drinks: "שתייה קלה" },
    blurbs: {
      starters: "סלטים, מרקים ודברים קטנים שמגיעים לשולחן ראשונים — עם פיתה מהטאבון.",
      grill: "הכול נצלה על פחמי אלון, לפי הזמנה. זמן המתנה 12–18 דקות.",
      drinks: "סחיטות טריות, סודה ביתית ותה מרווה. מילוי חוזר על חשבון הבית.",
    },
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
    cats: { starters: "Starters", grill: "Grill", drinks: "Drinks" },
    titles: { starters: "Starters", grill: "From the Grill", drinks: "Cold & Hot Drinks" },
    blurbs: {
      starters: "Salads, soups and small things that hit the table first — with taboon bread.",
      grill: "Everything is fired over oak charcoal to order. Expect 12–18 minutes.",
      drinks: "Fresh-squeezed juice, house soda and sage tea. Refills on the house.",
    },
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
    cats: { starters: "مقبلات", grill: "على الفحم", drinks: "مشروبات" },
    titles: { starters: "المقبلات", grill: "على الفحم", drinks: "مشروبات باردة وساخنة" },
    blurbs: {
      starters: "سلطات وشوربات وأطباق صغيرة تصل أولاً — مع خبز الطابون.",
      grill: "كل شيء يشوى على فحم البلوط عند الطلب. الانتظار ١٢–١٨ دقيقة.",
      drinks: "عصائر طازجة وصودا بيتية وشاي مريمية. التعبئة على حساب البيت.",
    },
    splash: "اجلس واسترح. اللحم على الفحم.",
    close: "العودة للقائمة",
    hours: "12:00–23:30",
    allergen: "قد يحتوي على مسببات حساسية. أخبر النادل قبل الطلب.",
    footer: "الأسعار بالشيكل · الخدمة غير مشمولة",
  },
};

export function dishesByCategory(category: Category): Dish[] {
  return DISHES.filter((d) => d.category === category);
}

export function findDish(id: string): Dish | undefined {
  return DISHES.find((d) => d.id === id);
}

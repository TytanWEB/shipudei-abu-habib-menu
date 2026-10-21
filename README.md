# Handoff: Shipudei Abu Habib — QR Digital Menu

## Overview
A mobile web menu for **שיפודי אבו חביב** (meat/grill restaurant, Yefet 114). Guests scan a QR code on the table, land on a branded splash, pick a language (Hebrew / English / Arabic), then browse the menu by category and tap a dish to see a full description. **View only — no ordering, no cart, no payment.**

## About the Design Files
`prototype/Menu.dc.html` is a **design reference built in HTML** — it shows the intended look and behavior. It is not production code. Recreate it in a real stack. No codebase exists yet, so recommended:

- **Next.js (App Router) + TypeScript + Tailwind CSS**, statically exported (`output: 'export'`) — the menu is pure static content, so it can be hosted free/cheap on Vercel / Netlify / Cloudflare Pages.
- Menu content in a single typed data file (`data/menu.ts` or `menu.json`) so the owner's dishes/prices can be edited without touching UI code.
- `next/image` for photos (they are large camera JPEGs — must be resized/compressed to WebP, ~800px wide max).

To view the prototype: open `prototype/Menu.dc.html` via a local server (e.g. `npx serve prototype`), not `file://`.

## Fidelity
**High-fidelity.** Colors, type, radii, spacing and interactions are final. Recreate pixel-close.

## Screens / Views

### 1. Splash (language picker)
- **Purpose:** brand moment + choose language. Shown on every fresh load.
- **Layout:** full viewport, `position: fixed`, max-width 440px centered, bg `#0d0b0a`. Column, `justify-content: space-between`, padding `44px 28px 32px`.
  - **Top:** caption "Table {n} · Yefet 114" — Archivo 11px, letter-spacing .28em, uppercase, `#8a7f78`.
  - **Middle (centered column, gap 22px, rise-in animation):**
    - Logo: 252×252, `object-fit: contain`, bg `#000`, padding 6px, radius 24px, shadow `0 24px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(246,241,236,.12)`.
    - Tagline (per language, see Copy), Heebo 300 17px/1.6, `#cdc3bb`, centered, max-width 24ch.
  - **Bottom:** label "Language · שפה · لغة" (Archivo 10px, .24em, uppercase, `#8a7f78`, centered), then a row of 3 equal pill buttons (gap 10px): "עברית", "English", "العربية".
    - Pill: radius 999px, border `1px solid rgba(246,241,236,.18)`, bg `rgba(246,241,236,.05)`, text `#f6f1ec` Heebo 500 15px, padding 16px 8px, min-height 56px.
    - Hover: bg `rgba(236,48,19,.18)`, border `rgba(236,48,19,.5)`. Active: bg `rgba(236,48,19,.3)`.
- **Tap a language →** sets language, hides splash (fade).

### 2. Menu (main screen)
Container: max-width 440px centered, bg `#141110`, page bg `#0d0b0a`, shadow `0 0 80px rgba(0,0,0,.6)`. `dir` = `rtl` for he/ar, `ltr` for en — the entire layout mirrors.

**Sticky header** — bg `rgba(20,17,16,.86)` + `backdrop-filter: blur(16px)`, bottom border `1px solid rgba(246,241,236,.09)`.
- Row 1 (padding `14px 18px 10px`, space-between):
  - Logo 42×42, contain, bg `#000`, radius 12px, ring `0 0 0 1px rgba(246,241,236,.15)`.
  - Name "שיפודי אבו חביב" Heebo 700 16px; under it "Table {n} · 12:00–23:30" Archivo 10px, .06em, uppercase, `#8a7f78`. No wrapping.
  - Language switcher: pill track bg `rgba(246,241,236,.07)`, radius 999px, padding 3px, gap 4px; chips "עב" / "EN" / "ع" — Heebo 600 12px, padding 7px 11px, min-width 38px, radius 999px. Active: bg `#ec3013`, text `#fff`. Inactive: transparent, `#a2968e`.
- Row 2 — category chips, horizontal scroll, padding `4px 18px 14px`, gap 8px: Starters / Grill / Drinks.
  - Chip: radius 999px, Heebo 15px, padding 10px 20px, min-height 44px.
  - Active: bg + border `#f6f1ec`, text `#141110`, weight 700. Inactive: transparent, border `1px solid rgba(246,241,236,.16)`, text `#a2968e`, weight 500. Transition bg .15s.
  - **Default category on load: Grill.**

**Category intro** (padding `22px 18px 6px`): title Heebo 800 32px/1.1, letter-spacing −.02em; blurb Heebo 300 14px/1.6 `#a2968e`, max-width 36ch.

**Dish list** — column, gap 14px, padding `14px 18px 130px`. Each dish is a full-width button card:
- bg `#1c1817`, border `1px solid rgba(246,241,236,.09)`, radius 20px, padding 10px, shadow `0 6px 20px rgba(0,0,0,.35)`, flex row gap 14px.
- Hover: border `rgba(236,48,19,.45)`, bg `#221d1b`. Active: `scale(.99)`.
- Thumbnail 104×104, radius 14px, `object-fit: cover`. Missing photo → diagonal stripe placeholder (`#2a2422` / `#332c29`, 135°, 6px bands).
- Text column: name Heebo 700 18px/1.2 + tag pill inline (wraps); short description Heebo 300 13px/1.5 `#a2968e`; price Archivo 600 16px `#ff7a5e`, format `₪78`.
- Tag pill: 11px, weight 500, radius 999px, padding 3px 9px. Variants:
  - `hot` — bg `rgba(236,48,19,.18)`, text `#ff8a70`, border `rgba(236,48,19,.35)`
  - `veg` — bg `rgba(150,200,120,.14)`, text `#a8cf8a`, border `rgba(150,200,120,.28)`
  - `plain` — bg `rgba(246,241,236,.07)`, text `#a2968e`, border `rgba(246,241,236,.12)`

**Sticky footer** — bottom: 0, gradient `linear-gradient(to top, #141110 60%, transparent)`, padding 18px, centered text Heebo 300 12px `#b3a79e`: "Prices in ILS · Service not included" (localized).

### 3. Dish detail (bottom sheet)
- Backdrop: `position: fixed; inset: 0`, bg `rgba(8,6,6,.7)` + blur(3px), flex end/center. **Tap backdrop → close.**
- Sheet: max-width 440px, bg `#1c1817`, radius `28px 28px 0 0`, max-height 90vh, scrolls internally. Slide-up animation.
- Hero image: full width, aspect 16/10, top radius 28px, overlaid with `linear-gradient(to top, #1c1817 2%, transparent 55%)` so it fades into the sheet.
- Content overlaps the image by 46px, padding `0 22px 26px`, gap 14px:
  - Grab handle 44×4, radius 999px, `rgba(246,241,236,.5)`, centered.
  - Row: name Heebo 800 27px/1.15 (−.02em) + price Archivo 700 22px `#ff7a5e`.
  - Long description Heebo 300 15px/1.7 `#cdc3bb`.
  - Fact chips (wrap, gap 8px): 12px, radius 999px, bg `rgba(246,241,236,.07)`, border `rgba(246,241,236,.12)`, padding 7px 13px, `#cdc3bb`.
  - Allergen note Heebo 300 12px/1.6 `#b3a79e`.
  - Close button: full width, bg `#ec3013`, text `#fff`, Heebo 600 16px, padding 17px, min-height 56px, radius 999px, shadow `0 10px 26px rgba(236,48,19,.3)`. Hover `#ff4a2b`, active `#c72a10`. Label "Back to the menu" (localized).

## Interactions & Behavior
- Splash → language tap → menu (fade .3s).
- Header language chips switch language instantly (all copy + `dir`), splash does not reappear.
- Category chip → swaps list; scroll the page back to the list top.
- Dish card → opens sheet. Close via button, backdrop tap. Add: Escape key, swipe-down on handle, and browser Back (push a `?dish=g1` query/hash so Back closes the sheet — important on phones).
- Lock body scroll while sheet is open.
- Animations: `fade` (opacity 0→1, .2–.3s), `sheetUp` (translateY 24px + opacity → 0, .3s `cubic-bezier(.2,.8,.3,1)`), `rise` (translateY 10px + opacity, .5s). Respect `prefers-reduced-motion`.
- Focus ring: `outline: 2px solid #ff6a4d; outline-offset: 3px` on `:focus-visible`. Scrollbars hidden on the chip row.
- Mobile-first; on desktop the 440px column centers on the dark page.

## State Management
- `lang: 'he' | 'en' | 'ar'` — persist in `localStorage`; also accept `?lang=`. If persisted, you may skip the splash (owner's choice — prototype always shows it).
- `category: 'starters' | 'grill' | 'drinks'` (default `grill`).
- `openDishId: string | null`.
- `tableNumber` — from the QR URL, e.g. `https://menu.example.com/?t=12`. Each table's QR encodes its number. Fallback: hide "Table n".
- No backend/data fetching. Static data file.

## Data model
```ts
type Lang = 'he' | 'en' | 'ar';
type L10n = Record<Lang, string>;
interface Dish {
  id: string;            // s1..s6, g1..g6, d1..d6
  category: 'starters' | 'grill' | 'drinks';
  price: number;         // ILS
  image?: string;
  tag: L10n;
  tagKind: 'hot' | 'veg' | 'plain';
  name: L10n;
  short: L10n;
  long: L10n;
  facts: Record<Lang, string[]>;
}
```
**All dish copy in all 3 languages is in `prototype/Menu.dc.html` → the `DATA` and `T` constants in the script block. Copy them verbatim into the data file.** Dishes and prices are placeholders written for the design — confirm the real menu with the owner.

## Design Tokens
| Token | Value | Use |
|---|---|---|
| page | `#0d0b0a` | outside the column, splash |
| bg | `#141110` | menu column |
| surface | `#1c1817` | cards, sheet |
| surface-hover | `#221d1b` | card hover |
| text | `#f6f1ec` | primary text |
| text-2 | `#cdc3bb` | long copy |
| text-3 | `#a2968e` | short copy, inactive chips |
| text-4 | `#b3a79e` | footnotes (≥4.5:1 on bg) |
| meta | `#8a7f78` | small caps labels |
| accent | `#ec3013` | active lang, CTA |
| accent-hover / pressed | `#ff4a2b` / `#c72a10` | |
| price | `#ff7a5e` | prices |
| line | `rgba(246,241,236,.09–.18)` | borders |

- **Fonts (Google Fonts):** Heebo 300/400/500/700/800 (UI + Hebrew), Archivo 400–800 (prices, latin small caps). Arabic falls back to system — consider adding **Noto Sans Arabic** for Arabic.
- **Radii:** 999 (pills), 28 (sheet), 24 (splash logo), 20 (cards), 14 (thumbs), 12 (header logo).
- **Spacing:** 18px page gutter; gaps 4 / 8 / 10 / 14 / 22.
- **Shadows:** card `0 6px 20px rgba(0,0,0,.35)`; CTA `0 10px 26px rgba(236,48,19,.3)`; logo `0 24px 60px rgba(0,0,0,.7)`.

> Note: an earlier variant (`Menu.dc.html` in the design project) follows a flat "Modernist" style (square corners, 2px rules, grayscale). The client chose this dark rounded version — implement this one.

## Assets (`prototype/assets/`)
- `logo.jpeg` — real logo (black background). Ask the owner for a transparent PNG/SVG.
- Dish photos — **placeholder/stand-in photography**, the owner will replace them:
  `hummus.jpg` (s1), `house-salads.jpeg` (s2), `merguez.jpg` (s3), `vine-leaves.jpeg` (s4), `chicken-liver.jpg` (s5), `kubbeh-soup.jpeg` (s6), `lamb-kebab.jpg` (g1), `pargit.jpg` (g2), `entrecote.jpg` (g3), `mixed-grill.jpg` (g4), `lamb-chops.jpg` (g5), `beef-shishlik.jpg` (g6). Drinks (d1–d6) have no photos → striped placeholder.
- Photos are multi-MB camera files: convert to WebP ~800px (thumbs 208px @2x).

## Files
- `prototype/Menu.dc.html` — the full design (markup + data + logic). Needs `support.js` beside it.
- `prototype/support.js` — runtime for the prototype only; not needed in production.
- `prototype/assets/` — logo + photos.

## Suggested first prompt for Claude Code
> Read `design_handoff_digital_menu/README.md` and the prototype. Scaffold a Next.js + TypeScript + Tailwind static-export app that recreates this menu pixel-close, with all dish data in `data/menu.ts` (copied from the prototype's DATA/T constants), RTL support, table number from `?t=`, and optimized images.

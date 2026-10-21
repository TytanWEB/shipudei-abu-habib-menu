// One-off conversion of the prototype's placeholder camera photos into
// web-sized WebP. Re-run after the owner supplies real dish photography
// (drop replacements into ../../prototype/assets with the same filenames).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "..", "..", "prototype", "assets");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "dishes");
const LOGO_OUT = path.join(__dirname, "..", "public", "images", "logo.webp");
const ICON_OUT = path.join(__dirname, "..", "app", "icon.png");

// id -> source filename (from prototype/Menu.dc.html's IMG map)
const DISH_IMAGES = {
  s1: "hummus.jpg",
  s2: "house-salads.jpeg",
  s3: "merguez.jpg",
  s4: "vine-leaves.jpeg",
  s5: "chicken-liver.jpg",
  s6: "kubbeh-soup.jpeg",
  g1: "lamb-kebab.jpg",
  g2: "pargit.jpg",
  g3: "entrecote.jpg",
  g4: "mixed-grill.jpg",
  g5: "lamb-chops.jpg",
  g6: "beef-shishlik.jpg",
};

// Card thumbnail is 104x104 CSS px; ship @2x for retina.
const THUMB_SIZE = 208;
// Detail-sheet hero is full-width, aspect 16/10; 440px column max, ship @2x.
const HERO_WIDTH = 880;
const HERO_HEIGHT = 550;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const [id, filename] of Object.entries(DISH_IMAGES)) {
    const src = path.join(SRC_DIR, filename);

    const grade = sharp(src).rotate();

    await grade
      .clone()
      .resize(THUMB_SIZE, THUMB_SIZE, { fit: "cover" })
      .webp({ quality: 78 })
      .toFile(path.join(OUT_DIR, `${id}-thumb.webp`));

    await grade
      .clone()
      .resize(HERO_WIDTH, HERO_HEIGHT, { fit: "cover" })
      .webp({ quality: 78 })
      .toFile(path.join(OUT_DIR, `${id}-hero.webp`));

    console.log(`✓ ${id} <- ${filename}`);
  }

  await sharp(path.join(SRC_DIR, "logo.jpeg"))
    .rotate()
    .resize(480, 480, { fit: "contain", background: "#000000" })
    .webp({ quality: 85 })
    .toFile(LOGO_OUT);
  console.log("✓ logo");

  // Browser-tab favicon (Next.js app/icon.png convention).
  await sharp(path.join(SRC_DIR, "logo.jpeg"))
    .rotate()
    .resize(256, 256, { fit: "contain", background: "#000000" })
    .png()
    .toFile(ICON_OUT);
  console.log("✓ icon");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

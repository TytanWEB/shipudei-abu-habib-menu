// One-off: uploads the initial menu content (data/seed-menu.ts) to Blob
// storage. Safe to re-run — pass --force to overwrite existing data,
// otherwise it refuses if a menu document already exists.
// Run with: npx tsx scripts/seed-menu.ts [--force]
import { readMenuData, writeMenuData } from "../lib/menu-store";
import { SEED_MENU } from "../data/seed-menu";

const force = process.argv.includes("--force");

async function main() {
  const existing = await readMenuData();
  if (existing.categories.length > 0 && !force) {
    console.log("Menu data already exists — pass --force to overwrite. Skipping.");
    return;
  }

  await writeMenuData(SEED_MENU);

  console.log(`✓ Seeded ${SEED_MENU.categories.length} categories, ${SEED_MENU.dishes.length} dishes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

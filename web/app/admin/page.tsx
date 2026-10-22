import { readMenuData } from "@/lib/menu-store";
import { L10nInputs, L10nTextareas } from "@/components/admin/Fields";
import { DishForm } from "@/components/admin/DishForm";
import { DishRow } from "@/components/admin/DishRow";
import {
  card,
  dangerButtonSmall,
  formCol,
  ghostButton,
  headerBar,
  iconButton,
  page,
  primaryButton,
  sectionTitle,
  summaryStyle,
} from "@/components/admin/ui";
import { addCategory, addDish, deleteCategory, logout, moveCategory, updateCategory } from "./actions";

export default async function AdminPage() {
  const data = await readMenuData();
  const categories = [...data.categories].sort((a, b) => a.order - b.order);

  return (
    <div style={page}>
      <div style={headerBar}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Menu admin</h1>
        <form action={logout}>
          <button type="submit" style={ghostButton}>
            Log out
          </button>
        </form>
      </div>

      <section style={card}>
        <h2 style={sectionTitle}>Add a section</h2>
        <form action={addCategory} style={formCol}>
          <L10nInputs prefix="label" label="Tab label (e.g. Fish / דגים / أسماك)" />
          <L10nInputs prefix="title" label="Section heading" />
          <L10nTextareas prefix="blurb" label="Section description" />
          <button type="submit" style={primaryButton}>
            Add section
          </button>
        </form>
      </section>

      {categories.map((cat) => {
        const dishes = data.dishes
          .filter((d) => d.categoryId === cat.id)
          .sort((a, b) => a.order - b.order);

        return (
          <section key={cat.id} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={sectionTitle}>
                {cat.label.en || cat.label.he}{" "}
                <span style={{ opacity: 0.5, fontWeight: 400, fontSize: 14 }}>({dishes.length})</span>
              </h2>
              <div style={{ display: "flex", gap: 6 }}>
                <form action={moveCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button style={iconButton} type="submit" aria-label="Move section up">
                    ↑
                  </button>
                </form>
                <form action={moveCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button style={iconButton} type="submit" aria-label="Move section down">
                    ↓
                  </button>
                </form>
              </div>
            </div>

            <details style={{ marginTop: 10 }}>
              <summary style={summaryStyle}>Edit section text</summary>
              <form action={updateCategory} style={formCol}>
                <input type="hidden" name="id" value={cat.id} />
                <L10nInputs prefix="label" label="Tab label" defaultValue={cat.label} />
                <L10nInputs prefix="title" label="Section heading" defaultValue={cat.title} />
                <L10nTextareas prefix="blurb" label="Section description" defaultValue={cat.blurb} />
                <button type="submit" style={primaryButton}>
                  Save section
                </button>
              </form>
            </details>

            <form action={deleteCategory} style={{ marginTop: 10 }}>
              <input type="hidden" name="id" value={cat.id} />
              <button type="submit" style={dangerButtonSmall}>
                Delete section (and its {dishes.length} dishes)
              </button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {dishes.map((dish) => (
                <DishRow key={dish.id} dish={dish} />
              ))}
            </div>

            <details style={{ marginTop: 14 }}>
              <summary style={summaryStyle}>+ Add a dish to {cat.label.en || cat.label.he}</summary>
              <DishForm action={addDish} categoryId={cat.id} />
            </details>
          </section>
        );
      })}

      {categories.length === 0 && (
        <p style={{ color: "#a2968e", fontSize: 14 }}>No sections yet — add one above to get started.</p>
      )}
    </div>
  );
}

import type { Dish } from "@/lib/menu-types";
import { FactsInputs, L10nInputs, L10nTextareas } from "./Fields";
import { fieldsetStyle, formCol, inputStyle, legendStyle, primaryButton } from "./ui";

export function DishForm({
  action,
  categoryId,
  dish,
}: {
  action: (formData: FormData) => void;
  categoryId?: string;
  dish?: Dish;
}) {
  return (
    <form action={action} style={formCol}>
      {dish && <input type="hidden" name="id" value={dish.id} />}
      {categoryId && <input type="hidden" name="categoryId" value={categoryId} />}

      <L10nInputs prefix="name" label="Dish name" defaultValue={dish?.name} />
      <L10nInputs prefix="short" label="Short description (shown on the card)" defaultValue={dish?.short} />
      <L10nTextareas prefix="long" label="Long description (shown on the detail page)" defaultValue={dish?.long} />
      <L10nInputs prefix="tag" label="Tag pill text (e.g. Spicy / חריף)" defaultValue={dish?.tag} />
      <FactsInputs prefix="facts" label="Fact chips (shown on the detail page)" defaultValue={dish?.facts} />

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Tag color</legend>
        <select name="tagKind" defaultValue={dish?.tagKind ?? "plain"} style={inputStyle}>
          <option value="plain">Plain (neutral)</option>
          <option value="hot">Hot (red)</option>
          <option value="veg">Veg (green)</option>
        </select>
      </fieldset>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Price (₪)</legend>
        <input
          type="number"
          name="price"
          min="0"
          step="1"
          defaultValue={dish?.price}
          required
          style={inputStyle}
        />
      </fieldset>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Photo</legend>
        {dish?.image && (
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 8 }}>
            <input type="checkbox" name="removePhoto" /> Remove current photo (show placeholder)
          </label>
        )}
        <input type="file" name="photo" accept="image/*" style={inputStyle} />
      </fieldset>

      <button type="submit" style={primaryButton}>
        {dish ? "Save dish" : "Add dish"}
      </button>
    </form>
  );
}

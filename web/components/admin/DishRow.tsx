import Image from "next/image";
import type { Dish } from "@/lib/menu-types";
import { deleteDish, moveDish, updateDish } from "@/app/admin/actions";
import { DishForm } from "./DishForm";
import { dangerButtonSmall, iconButton, summaryStyle } from "./ui";

export function DishRow({ dish }: { dish: Dish }) {
  return (
    <div
      style={{
        background: "#141110",
        border: "1px solid rgba(246,241,236,.09)",
        borderRadius: 12,
        padding: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {dish.image ? (
          <Image
            src={dish.image.thumb}
            alt=""
            width={44}
            height={44}
            style={{ borderRadius: 8, objectFit: "cover", flex: "none" }}
          />
        ) : (
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#2a2422", flex: "none" }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{dish.name.en || dish.name.he}</div>
          <div style={{ fontSize: 12, color: "#a2968e" }}>₪{dish.price}</div>
        </div>
        <form action={moveDish}>
          <input type="hidden" name="id" value={dish.id} />
          <input type="hidden" name="direction" value="up" />
          <button style={iconButton} type="submit" aria-label="Move up">
            ↑
          </button>
        </form>
        <form action={moveDish}>
          <input type="hidden" name="id" value={dish.id} />
          <input type="hidden" name="direction" value="down" />
          <button style={iconButton} type="submit" aria-label="Move down">
            ↓
          </button>
        </form>
      </div>

      <details style={{ marginTop: 8 }}>
        <summary style={summaryStyle}>Edit dish</summary>
        <DishForm action={updateDish} dish={dish} />
      </details>

      <form action={deleteDish} style={{ marginTop: 8 }}>
        <input type="hidden" name="id" value={dish.id} />
        <button type="submit" style={dangerButtonSmall}>
          Delete dish
        </button>
      </form>
    </div>
  );
}

import { DishCard } from "./DishCard";
import type { Dish, Lang } from "@/lib/menu-types";

export function DishList({
  lang,
  dishes,
  onOpenDish,
}: {
  lang: Lang;
  dishes: Dish[];
  onOpenDish: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[14px]" style={{ padding: "14px 18px 130px" }}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} lang={lang} onOpen={() => onOpenDish(dish.id)} />
      ))}
    </div>
  );
}

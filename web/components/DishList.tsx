import { DishCard } from "./DishCard";
import { dishesByCategory, type Category, type Lang } from "@/data/menu";

export function DishList({
  lang,
  category,
  onOpenDish,
}: {
  lang: Lang;
  category: Category;
  onOpenDish: (id: string) => void;
}) {
  const dishes = dishesByCategory(category);

  return (
    <div className="flex flex-col gap-[14px]" style={{ padding: "14px 18px 130px" }}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} lang={lang} onOpen={() => onOpenDish(dish.id)} />
      ))}
    </div>
  );
}

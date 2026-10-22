import { MenuApp } from "@/components/MenuApp";
import { readMenuData } from "@/lib/menu-store";

export const revalidate = 60;

export default async function Home() {
  const menuData = await readMenuData();
  return <MenuApp menuData={menuData} />;
}

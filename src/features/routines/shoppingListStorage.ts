import { saveCloudShoppingList } from "./shoppingListCloud";

const SHOPPING_LIST_KEY = "klero_shopping_list";

export type ShoppingItem = {
  id: string;
  label: string;
  checked: boolean;
};

export function loadShoppingList(): ShoppingItem[] {
  const data = localStorage.getItem(SHOPPING_LIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveShoppingList(items: ShoppingItem[]) {
  localStorage.setItem(
    SHOPPING_LIST_KEY,
    JSON.stringify(items)
  );

  saveCloudShoppingList(items);
}
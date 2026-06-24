import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import type { ShoppingItem } from "./shoppingListStorage";


export async function loadCloudShoppingList() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return [];
  }

  const snapshot = await getDoc(
    doc(
      db,
      "users",
      user.uid,
      "shoppingList",
      "main"
    )
  );

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.data().items ?? [];
}

export async function saveCloudShoppingList(items: ShoppingItem[]) {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  await setDoc(doc(db, "users", user.uid, "shoppingList", "main"), {
    items,
    updatedAt: new Date().toISOString(),
  });
}
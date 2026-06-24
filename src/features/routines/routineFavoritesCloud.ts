import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";

export async function saveCloudRoutineFavorites(favorites: string[]) {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  await setDoc(doc(db, "users", user.uid, "routineFavorites", "main"), {
    favorites,
    updatedAt: new Date().toISOString(),
  });
}
export async function loadCloudRoutineFavorites() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return [];
  }

  const snapshot = await getDoc(
    doc(
      db,
      "users",
      user.uid,
      "routineFavorites",
      "main"
    )
  );

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.data().favorites ?? [];
}
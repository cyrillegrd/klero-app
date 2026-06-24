import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
export type CommunicationFavorite = {
  icon: string;
  text: string;
};

export async function loadCloudCommunicationFavorites(): Promise<
  CommunicationFavorite[]
> {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return [];
  }

  const snapshot = await getDoc(
    doc(
      db,
      "users",
      user.uid,
      "communication",
      "favorites"
    )
  );

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.data().favorites ?? [];
}

export async function saveCloudCommunicationFavorites(
  favorites: { icon: string; text: string }[]
) {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  await setDoc(doc(db, "users", user.uid, "communication", "favorites"), {
    favorites,
    updatedAt: new Date().toISOString(),
  });
}
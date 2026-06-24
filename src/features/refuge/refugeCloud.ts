import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import { getRefugeStats } from "./refugeStats";

export async function saveCloudRefuge() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  const stats = getRefugeStats();

  await setDoc(
    doc(db, "users", user.uid, "refuge", "main"),
    {
      ...stats,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function loadCloudRefuge() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return null;

  const snapshot = await getDoc(
    doc(db, "users", user.uid, "refuge", "main")
  );

  return snapshot.exists() ? snapshot.data() : null;
}

export async function syncCloudRefuge() {
  try {
    await saveCloudRefuge();
  } catch (error) {
    console.error("Erreur sync refuge", error);
  }
}
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import type {
  SobrietyCheckIn,
  SobrietyProfile,
  SobrietyWorkbook,
} from "./storage";

export async function saveCloudSobriety(data: {
  startDate: string | null;
  profile: SobrietyProfile;
  checkIns: SobrietyCheckIn[];
  workbook: SobrietyWorkbook;
}) {
  const user = auth.currentUser;
  if (!user || !user.emailVerified) return;

  await setDoc(doc(db, "users", user.uid, "sobriety", "main"), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function loadCloudSobriety() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return null;
  }

  const snapshot = await getDoc(
    doc(
      db,
      "users",
      user.uid,
      "sobriety",
      "main"
    )
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}
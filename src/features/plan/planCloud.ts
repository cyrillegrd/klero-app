import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import type { PlanItem } from "./planTypes";

function getPlanCollection() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return null;
  }

  return collection(db, "users", user.uid, "plan");
}

export async function loadCloudPlanItems(): Promise<PlanItem[]> {
  const planCollection = getPlanCollection();

  if (!planCollection) return [];

  const snapshot = await getDocs(planCollection);

  return snapshot.docs.map(
    (docSnap) => docSnap.data() as PlanItem
  );
}

export async function saveCloudPlanItem(item: PlanItem) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  const cleanItem = Object.fromEntries(
    Object.entries(item).filter(
      ([, value]) => value !== undefined
    )
  ) as PlanItem;

  await setDoc(
    doc(db, "users", user.uid, "plan", item.id),
    cleanItem
  );
}

export async function deleteCloudPlanItem(itemId: string) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  await deleteDoc(
    doc(db, "users", user.uid, "plan", itemId)
  );
}
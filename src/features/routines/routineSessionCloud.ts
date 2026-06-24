import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import type { RoutineSession } from "./sessionStorage";

function getRoutineSessionsCollection() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return null;
  }

  return collection(
    db,
    "users",
    user.uid,
    "routineSessions"
  );
}

export async function loadCloudRoutineSessions(): Promise<
  RoutineSession[]
> {
  const sessionsCollection =
    getRoutineSessionsCollection();

  if (!sessionsCollection) return [];

  const snapshot = await getDocs(sessionsCollection);

  return snapshot.docs
    .map((docSnap) => docSnap.data() as RoutineSession)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );
}

export async function saveCloudRoutineSession(
  session: RoutineSession
) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  const cleanSession = Object.fromEntries(
    Object.entries(session).filter(
      ([, value]) => value !== undefined
    )
  ) as RoutineSession;

  await setDoc(
    doc(
      db,
      "users",
      user.uid,
      "routineSessions",
      session.id
    ),
    cleanSession
  );
}

export async function deleteCloudRoutineSession(
  sessionId: string
) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  await deleteDoc(
    doc(
      db,
      "users",
      user.uid,
      "routineSessions",
      sessionId
    )
  );
}
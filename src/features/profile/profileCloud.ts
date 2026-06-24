import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/db";
import { auth } from "../../lib/auth";

export type KleroProfile = {
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  goals?: string[];
  hasTnd?: string;
  onboardingDone?: boolean;
};

export async function saveCloudProfile(profile: KleroProfile = {}) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  const firstName =
    profile.firstName ??
    localStorage.getItem("klero_name") ??
    "";
  const lastName =
    profile.lastName ??
    localStorage.getItem("klero_last_name") ??
    "";

  await setDoc(
    doc(db, "users", user.uid, "profile", "main"),
    {
      uid: user.uid,
      email: user.email,
      name: [firstName, lastName].filter(Boolean).join(" ") || user.displayName || "",
      firstName,
      lastName,
      age:
        profile.age ??
        localStorage.getItem("klero_age") ??
        "",
      gender:
        profile.gender ??
        localStorage.getItem("klero_gender") ??
        "",
      goals:
        profile.goals ??
        JSON.parse(localStorage.getItem("klero_goals") ?? "[]"),
      hasTnd:
        profile.hasTnd ??
        localStorage.getItem("klero_has_tnd") ??
        "",
      onboardingDone:
        profile.onboardingDone ??
        localStorage.getItem("klero_onboarding_done") === "true",
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function loadCloudProfile() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return null;

  const snapshot = await getDoc(
    doc(db, "users", user.uid, "profile", "main")
  );

  return snapshot.exists() ? snapshot.data() : null;
}

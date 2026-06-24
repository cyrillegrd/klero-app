import { loadCloudNotes } from "../features/notes/notesCloud";
import { loadCloudPlanItems } from "../features/plan/planCloud";
import { loadCloudRoutineFavorites } from "../features/routines/routineFavoritesCloud";
import { loadCloudRoutineSessions } from "../features/routines/routineSessionCloud";
import { loadCloudShoppingList } from "../features/routines/shoppingListCloud";
import { loadCloudCommunicationFavorites } from "../features/communication/communicationCloud";
import { loadCloudSobriety } from "../features/sobriety/sobrietyCloud";
import { loadCloudProfile } from "../features/profile/profileCloud";

import { auth } from "./auth";

export async function bootstrapUserData() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return;
  }

  const [
    notes,
    planItems,
    routineSessions,
    shoppingList,
    routineFavorites,
    communicationFavorites,
    sobrietyData,
    profile,
  ] = await Promise.all([
    loadCloudNotes(),
    loadCloudPlanItems(),
    loadCloudRoutineSessions(),
    loadCloudShoppingList(),
    loadCloudRoutineFavorites(),
    loadCloudCommunicationFavorites(),
    loadCloudSobriety(),
    loadCloudProfile(),
  ]);

  if (profile) {
    if (profile.firstName || profile.name) {
      localStorage.setItem("klero_name", profile.firstName ?? profile.name);
    }

    if (profile.lastName) {
      localStorage.setItem("klero_last_name", profile.lastName);
    }

    if (profile.age) {
      localStorage.setItem("klero_age", profile.age);
    }

    if (profile.gender) {
      localStorage.setItem("klero_gender", profile.gender);
    }

    if (profile.goals) {
      localStorage.setItem("klero_goals", JSON.stringify(profile.goals));
    }

    if (profile.hasTnd) {
      localStorage.setItem("klero_has_tnd", profile.hasTnd);
    }

    if (profile.onboardingDone) {
      localStorage.setItem("klero_onboarding_done", "true");
    }
  }

  if (notes.length > 0) {
    localStorage.setItem("klero_notes", JSON.stringify(notes));
  }

  if (planItems.length > 0) {
    localStorage.setItem("klero_plan_items", JSON.stringify(planItems));
  }

  if (routineSessions.length > 0) {
    localStorage.setItem(
      "klero_routine_sessions",
      JSON.stringify(routineSessions)
    );
  }

  if (shoppingList.length > 0) {
    localStorage.setItem(
      "klero_shopping_list",
      JSON.stringify(shoppingList)
    );
  }

  if (routineFavorites.length > 0) {
    localStorage.setItem(
      "klero_routine_favorites",
      JSON.stringify(routineFavorites)
    );
  }
  if (communicationFavorites.length > 0) {
  localStorage.setItem(
    "klero-communication-favorites",
    JSON.stringify(communicationFavorites)
  );
}
if (sobrietyData) {
  if (sobrietyData.startDate) {
    localStorage.setItem(
      "klero_sobriety_start_date",
      sobrietyData.startDate
    );
  }

  localStorage.setItem(
    "klero_sobriety_profile",
    JSON.stringify(
      sobrietyData.profile ?? {}
    )
  );

  localStorage.setItem(
    "klero_sobriety_checkins",
    JSON.stringify(
      sobrietyData.checkIns ?? []
    )
  );

  localStorage.setItem(
    "klero_sobriety_workbook",
    JSON.stringify(
      sobrietyData.workbook ?? {}
    )
  );
}
}

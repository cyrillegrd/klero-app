import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { HomePage } from "../features/home/HomePage";
import { PlanPage } from "../features/plan/PlanPage";
import { ChronoPage } from "../features/chrono/ChronoPage";
import { RoutinesPage } from "../features/routines/RoutinesPage";
import { RefugePage } from "../features/refuge/RefugePage";
import { SuiviPage } from "../features/suivi/SuiviPage";
import { SuiviCategoryPage } from "../features/suivi/SuiviCategoryPage";
import { SuiviSettingsPage } from "../features/suivi/SuiviSettingsPage";
import { SuiviHistoryPage } from "../features/suivi/SuiviHistoryPage";
import { SuiviEntryPage } from "../features/suivi/SuiviEntryPage";
import { SuiviStatsPage } from "../features/suivi/SuiviStatsPage";
import { ForestPage } from "../features/refuge/ForestPage";
import { SwampPage } from "../features/refuge/SwampPage";
import { MountainPage } from "../features/refuge/MountainPage";
import { BeachPage } from "../features/refuge/BeachPage";
import { OceanPage } from "../features/refuge/OceanPage";
import { CategoryChartPage } from "../features/suivi/CategoryChartPage";
import { HistoryPage } from "../features/routines/HistoryPage";
import { ShoppingListPage } from "../features/routines/ShoppingListPage";
import { CommunicationPage } from "../features/communication/CommunicationPage";
import { NotesPage } from "../features/notes/NotesPage";
import { ProfilePage } from "../features/profile/ProfilePage";
import { SobrietyPage } from "../features/sobriety/SobrietyPage";
import { GrimoirePage } from "../features/refuge/GrimoirePage";
import { OnboardingPage } from "../features/onboarding/OnboardingPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { VerifyEmailPage } from "../features/auth/VerifyEmailPage";
import { LoginPage } from "../features/auth/LoginPage";
import { RequireAuth } from "../features/auth/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },

      {
        path: "onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },

      {
        path: "plan",
        element: (
          <RequireAuth>
            <PlanPage />
          </RequireAuth>
        ),
      },
      {
        path: "routines",
        element: (
          <RequireAuth>
            <RoutinesPage />
          </RequireAuth>
        ),
      },
      {
        path: "routines/history",
        element: (
          <RequireAuth>
            <HistoryPage />
          </RequireAuth>
        ),
      },
      {
        path: "shopping-list",
        element: (
          <RequireAuth>
            <ShoppingListPage />
          </RequireAuth>
        ),
      },
      {
        path: "chrono",
        element: (
          <RequireAuth>
            <ChronoPage />
          </RequireAuth>
        ),
      },
      {
        path: "communication",
        element: (
          <RequireAuth>
            <CommunicationPage />
          </RequireAuth>
        ),
      },
      {
        path: "notes",
        element: (
          <RequireAuth>
            <NotesPage />
          </RequireAuth>
        ),
      },
      {
        path: "profil",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "sobriete",
        element: (
          <RequireAuth>
            <SobrietyPage />
          </RequireAuth>
        ),
      },

      {
        path: "suivi",
        element: (
          <RequireAuth>
            <SuiviPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/historique",
        element: (
          <RequireAuth>
            <SuiviHistoryPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/parametres",
        element: (
          <RequireAuth>
            <SuiviSettingsPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/statistiques",
        element: (
          <RequireAuth>
            <SuiviStatsPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/entry/:entryId",
        element: (
          <RequireAuth>
            <SuiviEntryPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/:categoryId/evolution",
        element: (
          <RequireAuth>
            <CategoryChartPage />
          </RequireAuth>
        ),
      },
      {
        path: "suivi/:categoryId",
        element: (
          <RequireAuth>
            <SuiviCategoryPage />
          </RequireAuth>
        ),
      },

      {
        path: "refuge",
        element: (
          <RequireAuth>
            <RefugePage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/forest",
        element: (
          <RequireAuth>
            <ForestPage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/swamp",
        element: (
          <RequireAuth>
            <SwampPage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/mountain",
        element: (
          <RequireAuth>
            <MountainPage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/beach",
        element: (
          <RequireAuth>
            <BeachPage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/ocean",
        element: (
          <RequireAuth>
            <OceanPage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/grimoire",
        element: (
          <RequireAuth>
            <GrimoirePage />
          </RequireAuth>
        ),
      },
      {
        path: "refuge/grimoire/:worldId",
        element: (
          <RequireAuth>
            <GrimoirePage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
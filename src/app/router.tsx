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
import { CategoryChartPage } from "../features/suivi/CategoryChartPage";
import { HistoryPage } from "../features/routines/HistoryPage";
import { ShoppingListPage } from "../features/routines/ShoppingListPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "plan", element: <PlanPage /> },
      { path: "routines", element: <RoutinesPage /> },
      { path: "refuge", element: <RefugePage /> },
      { path: "suivi", element: <SuiviPage /> },
      { path: "suivi/historique", element: <SuiviHistoryPage /> },
      { path: "suivi/parametres", element: <SuiviSettingsPage /> },
      { path: "suivi/:categoryId", element: <SuiviCategoryPage /> },
      { path: "suivi/entry/:entryId", element: <SuiviEntryPage />, },
{
  path: "suivi/statistiques",
  element: <SuiviStatsPage />,
},

{
  path: "/refuge/forest",
  element: <ForestPage />,
},
{ path: "suivi/:categoryId/evolution", element: <CategoryChartPage /> },
{
  path: "routines/history",
  element: <HistoryPage />,
},
{
  path: "shopping-list",
  element: <ShoppingListPage />,
},
{
  path: "chrono",
  element: <ChronoPage />,
}
    ],
  },
]);
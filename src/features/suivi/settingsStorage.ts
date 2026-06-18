import type { SuiviCategory } from "./suiviTypes";

const SETTINGS_KEY = "klero_suivi_settings";

export function loadSuiviSettings(): SuiviCategory[] | null {
  const data = localStorage.getItem(SETTINGS_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export function saveSuiviSettings(categories: SuiviCategory[]) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(categories)
  );
}
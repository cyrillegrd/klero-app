export const SOBRIETY_KEY = "klero_sobriety_start_date";
export const SOBRIETY_PROFILE_KEY = "klero_sobriety_profile";
export const SOBRIETY_CHECKINS_KEY = "klero_sobriety_checkins";
export const SOBRIETY_WORKBOOK_KEY = "klero_sobriety_workbook";

export type SobrietyProfile = {
  addiction: string;
  commitment: string;
};

export type SobrietyCheckIn = {
  date: string;
  difficulty: number;
  relapsed: boolean;
  mood: number;
  triggers: string;
  note: string;
};

export type SobrietyWorkbook = {
  intentions: string;
  gratitude: string;
  honesty: string;
  supportTeam: string;
  stressPlan: string;
};

export const defaultSobrietyProfile: SobrietyProfile = {
  addiction: "",
  commitment: "",
};

export const defaultSobrietyWorkbook: SobrietyWorkbook = {
  intentions: "",
  gratitude: "",
  honesty: "",
  supportTeam: "",
  stressPlan: "",
};

export function readJson<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadSobrietyCheckIns() {
  return readJson<SobrietyCheckIn[]>(SOBRIETY_CHECKINS_KEY, []);
}

export function saveSobrietyCheckIns(checkIns: SobrietyCheckIn[]) {
  localStorage.setItem(SOBRIETY_CHECKINS_KEY, JSON.stringify(checkIns));
}

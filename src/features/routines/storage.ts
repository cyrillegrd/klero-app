import { syncCloudRefuge } from "../refuge/refugeCloud";

const ROUTINE_STORAGE_KEY = "klero_routine_entries";

export type RoutineEntry = {
  id: string;
  date: string;
  routineId: string;
};

export function loadRoutineEntries(): RoutineEntry[] {
  const data = localStorage.getItem(ROUTINE_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRoutineEntry(entry: RoutineEntry) {
  const entries = loadRoutineEntries();

  localStorage.setItem(
    ROUTINE_STORAGE_KEY,
    JSON.stringify([entry, ...entries])
  );

  syncCloudRefuge();
}
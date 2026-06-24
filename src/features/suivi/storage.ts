import type { DailyEntry } from "./types";

import { syncCloudRefuge } from "../refuge/refugeCloud";

const STORAGE_KEY = "klero_daily_entries";

export function loadEntries(): DailyEntry[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveEntry(
  entry: DailyEntry
) {
  const entries = loadEntries();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      entry,
      ...entries,
    ])
  );
  syncCloudRefuge();
}

export function deleteEntry(id: string) {
  const entries = loadEntries();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      entries.filter(
        (entry) => entry.id !== id
      )
    )
  );
  syncCloudRefuge();
}
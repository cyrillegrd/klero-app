const CHRONO_STORAGE_KEY = "klero_chrono_entries";

export type ChronoEntry = {
  id: string;
  date: string;
  durationMinutes: number;
};

export function loadChronoEntries(): ChronoEntry[] {
  const data = localStorage.getItem(CHRONO_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveChronoEntry(entry: ChronoEntry) {
  const entries = loadChronoEntries();

  localStorage.setItem(
    CHRONO_STORAGE_KEY,
    JSON.stringify([entry, ...entries])
  );
}
const CATEGORY_STORAGE_KEY = "klero_category_entries";

export type CategoryEntry = {
  id: string;
  date: string;
  categoryId: string;
  values: Record<string, string | number | boolean>;
};

export function loadCategoryEntries(): CategoryEntry[] {
  const data = localStorage.getItem(CATEGORY_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCategoryEntry(entry: CategoryEntry) {
  const entries = loadCategoryEntries();

  localStorage.setItem(
    CATEGORY_STORAGE_KEY,
    JSON.stringify([entry, ...entries])
  );
}

export function getLatestCategoryEntry(categoryId: string) {
  const entries = loadCategoryEntries();

  return entries.find(
    (entry) => entry.categoryId === categoryId
  );
}

export function upsertCategoryEntry(
  categoryId: string,
  values: Record<string, string | number | boolean>
) {
  const entries = loadCategoryEntries();

  const today = new Date().toDateString();

  const existingIndex = entries.findIndex(
    (entry) =>
      entry.categoryId === categoryId &&
      new Date(entry.date).toDateString() === today
  );

  if (existingIndex >= 0) {
    entries[existingIndex] = {
      ...entries[existingIndex],
      values,
      date: new Date().toISOString(),
    };
  } else {
    entries.unshift({
      id: crypto.randomUUID(),
      categoryId,
      values,
      date: new Date().toISOString(),
    });
  }

  localStorage.setItem(
  CATEGORY_STORAGE_KEY,
  JSON.stringify(entries)
);
}
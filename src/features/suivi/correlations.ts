import { loadEntries } from "./storage";

export function getSleepCorrelation() {
  const entries = loadEntries();

  const bonnesJournees = entries.filter(
    (entry) => entry.energie >= 7
  );

  if (bonnesJournees.length === 0) {
    return null;
  }

  const humeur =
    bonnesJournees.reduce(
      (sum, entry) => sum + entry.humeur,
      0
    ) / bonnesJournees.length;

  const energie =
    bonnesJournees.reduce(
      (sum, entry) => sum + entry.energie,
      0
    ) / bonnesJournees.length;

  const concentration =
    bonnesJournees.reduce(
      (sum, entry) => sum + entry.concentration,
      0
    ) / bonnesJournees.length;

  return {
    humeur: humeur.toFixed(1),
    energie: energie.toFixed(1),
    concentration: concentration.toFixed(1),
    jours: bonnesJournees.length,
  };
}
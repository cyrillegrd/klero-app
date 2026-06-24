import { loadEntries } from "../suivi/storage";
import { loadCategoryEntries } from "../suivi/categoryStorage";
import { loadRoutineEntries } from "../routines/storage";
import { loadChronoEntries } from "../chrono/storage";


export function getRefugeStats() {
  const entries = loadEntries();
  const categoryEntries = loadCategoryEntries();
  const routineEntries = loadRoutineEntries();
  const chronoEntries = loadChronoEntries();
  
  const completedRoutines =
  routineEntries.length;

  const totalFiches = entries.length;

  const uniqueDates = [
    ...new Set(
      entries.map((entry) =>
        new Date(entry.date).toDateString()
      )
    ),
  ].sort(
    (a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
  );

  let serie = 0;
  const currentDate = new Date();

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(currentDate.getDate() - i);

    if (uniqueDates[i] === expectedDate.toDateString()) {
      serie++;
    } else {
      break;
    }
  }

  const suiviPoints = totalFiches + categoryEntries.length;
  const routinePoints = routineEntries.length * 3;
  const chronoPoints = chronoEntries.length;

  let refugePoints =
    suiviPoints + routinePoints + chronoPoints;

  if (serie >= 3) refugePoints += 3;
  if (serie >= 7) refugePoints += 10;
  if (serie >= 30) refugePoints += 30;

  let niveau = 1;

  if (refugePoints >= 100) niveau = 5;
  else if (refugePoints >= 50) niveau = 4;
  else if (refugePoints >= 25) niveau = 3;
  else if (refugePoints >= 10) niveau = 2;

  let stade = "Œuf";

  if (niveau === 2) stade = "Bébé Bronto";
  if (niveau === 3) stade = "Jeune Bronto";
  if (niveau === 4) stade = "Bronto";
  if (niveau === 5) stade = "Grand Bronto";

  const species =
    refugePoints >= 900
      ? "Gardien des Océans"
      : refugePoints >= 600
      ? "Voyageur des Plages"
      : refugePoints >= 450
      ? "Dino des Montagnes"
      : refugePoints >= 300
      ? "Dino des Marais"
      : refugePoints >= 150
      ? "Bronto"
      : "Œuf mystérieux";

  return {
    totalFiches,
    suiviPoints,
    routinePoints,
    chronoPoints,
    refugePoints,
    niveau,
    stade,
    serie,
    species,
    completedRoutines,
  };
}
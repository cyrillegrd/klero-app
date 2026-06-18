import { loadEntries } from "../suivi/storage";
import { getRefugeStats } from "./refugeStats";

export function getBadges() {
  const entries = loadEntries();

  const stats = getRefugeStats();

  return [
    {
      id: "first-entry",
      label: "Première fiche",
      icon: "🌱",
      unlocked: entries.length >= 1,
    },
    {
      id: "five-entries",
      label: "5 fiches",
      icon: "📈",
      unlocked: entries.length >= 5,
    },
    {
  id: "ten-entries",
  label: "10 fiches",
  icon: "🧠",
  unlocked: entries.length >= 10,
},

{
  id: "forest-discovered",
  label: "Forêt découverte",
  icon: "🌲",
  unlocked: entries.length >= 25,
},

{
  id: "mystery-egg",
  label: "Œuf mystérieux",
  icon: "🥚",
  unlocked: entries.length >= 35,
},

{
  id: "thirty-entries",
  label: "30 fiches",
  icon: "🏆",
  unlocked: entries.length >= 45,
},

{
  id: "swamp-discovered",
  label: "Marécage découvert",
  icon: "🐸",
  unlocked: entries.length >= 55,
},

{
  id: "mystery-egg",
  label: "Œuf mystérieux",
  icon: "🥚",
  unlocked: entries.length >= 65,
},

{
  id: "mountain-discovered",
  label: "Montagne découverte",
  icon: "⛰",
  unlocked: entries.length >= 75,
},

{
  id: "mystery-egg",
  label: "Œuf mystérieux",
  icon: "🥚",
  unlocked: entries.length >= 85,
},

{
  id: "beach-discovered",
  label: "Plage découverte",
  icon: "🏖",
  unlocked: entries.length >= 95,
},

{
  id: "mystery-egg",
  label: "Œuf mystérieux",
  icon: "🥚",
  unlocked: entries.length >= 105,
},

{
  id: "hundred-entries",
  label: "100 fiches",
  icon: "⭐",
  unlocked: entries.length >= 115,
},

{
  id: "ocean-discovered",
  label: "Océan découvert",
  icon: "🌊",
  unlocked: entries.length >= 120,
},

{
  id: "mystery-egg",
  label: "Œuf mystérieux",
  icon: "🥚",
  unlocked: entries.length >= 125,
},

{
  id: "first-routine",
  label: "Première routine terminée",
  icon: "🌱",
  unlocked: stats.completedRoutines >= 1,
},
{
  id: "five-routines",
  label: "5 routines terminées",
  icon: "⭐",
  unlocked: stats.completedRoutines >= 5,
},
{
  id: "twenty-five-routines",
  label: "25 routines terminées",
  icon: "🏆",
  unlocked: stats.completedRoutines >= 25,
},
  ];
}
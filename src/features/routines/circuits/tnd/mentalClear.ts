import type { Circuit } from "../../types";

export const mentalClear = {
  id: "mental-clear",
  category: "tnd",
  title: "Vider sa tête",
  description: "Décharger ce qui prend trop de place.",
  energy: "low",
  duration: 6,
  steps: [
    {
      type: "text-list",
      title: "Tout écrire",
      description: "Tâches, pensées, inquiétudes, idées.",
    },
    {
      type: "single-choice",
      title: "Que faire de cette liste ?",
      options: ["Garder pour plus tard", "Choisir 1 priorité", "Demander de l’aide", "Me reposer"],
    },
    {
      type: "todo-list",
      title: "Garder seulement 3 priorités",
      items: ["Priorité 1", "Priorité 2", "Priorité 3"],
    },
    { type: "timer", title: "Respirer avant de repartir", duration: 60 },
  ],
} satisfies Circuit;
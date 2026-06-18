import type { Circuit } from "../../types";

export const ruminationExit = {
  id: "rumination-exit",
  category: "tnd",
  title: "Rumination mentale",
  description: "Sortir une pensée de la boucle.",
  energy: "low",
  duration: 5,
  steps: [
    {
      type: "text-list",
      title: "Écrire ce qui tourne",
      description: "Pose les pensées sans les résoudre.",
    },
    {
      type: "single-choice",
      title: "Est-ce un problème actuel ?",
      options: ["Oui", "Non", "Je ne sais pas"],
    },
    {
      type: "single-choice",
      title: "Est-ce contrôlable maintenant ?",
      options: ["Oui", "Non", "Pas aujourd’hui"],
    },
    { type: "timer", title: "Reporter la pensée", duration: 120 },
    { type: "checkbox", title: "Revenir à une action simple" },
  ],
} satisfies Circuit;
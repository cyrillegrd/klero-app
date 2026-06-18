import type { Circuit } from "../../types";

export const hardTransition = {
  id: "hard-transition",
  category: "tnd",
  title: "Transition difficile",
  description: "Changer d’activité sans se brusquer.",
  energy: "low",
  duration: 5,
  steps: [
    { type: "checkbox", title: "Nommer l’activité actuelle" },
    { type: "timer", title: "Pause tampon", duration: 60 },
    {
      type: "single-choice",
      title: "Quelle transition ?",
      options: ["Sortir", "Travailler", "Manger", "Dormir", "Changer de pièce"],
    },
    { type: "checkbox", title: "Faire un seul premier geste" },
  ],
} satisfies Circuit;
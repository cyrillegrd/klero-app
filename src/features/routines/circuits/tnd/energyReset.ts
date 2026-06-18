import type { Circuit } from "../../types";

export const energyReset = {
  id: "energy-reset",
  category: "tnd",
  title: "Baisser la fatigue",
  description: "Réduire la charge pour récupérer un peu.",
  energy: "low",
  duration: 5,
  steps: [
    {
      type: "single-choice",
      title: "Quelle fatigue domine ?",
      options: ["Sensorielle", "Mentale", "Physique", "Émotionnelle"],
    },
    { type: "checkbox", title: "Réduire une stimulation" },
    { type: "timer", title: "Pause sans demande", duration: 180 },
    {
      type: "single-choice",
      title: "Besoin maintenant ?",
      options: ["Repos", "Eau", "Silence", "Mouvement doux"],
    },
  ],
} satisfies Circuit;
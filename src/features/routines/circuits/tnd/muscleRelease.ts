import type { Circuit } from "../../types";

export const muscleRelease = {
  id: "muscle-release",
  category: "tnd",
  title: "💪 Relâchement musculaire",
  description: "Contracter puis relâcher pour faire redescendre la tension.",
  energy: "low",
  duration: 2,
  steps: [
    {
      type: "checkbox",
      title: "Contracte tout ton corps",
      description:
        "Mains, bras, épaules, ventre, jambes, orteils et visage.",
    },
    {
      type: "timer",
      title: "Maintiens 5 secondes",
      duration: 5,
    },
    {
      type: "checkbox",
      title: "Relâche complètement",
      description: "Laisse tout retomber d’un coup.",
    },
    {
      type: "checkbox",
      title: "Répète encore 2 fois",
    },
  ],
} satisfies Circuit;
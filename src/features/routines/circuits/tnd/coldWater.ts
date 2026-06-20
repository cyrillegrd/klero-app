import type { Circuit } from "../../types";

export const coldWater = {
  id: "cold-water",
  category: "tnd",
  title: "🌊 Eau froide",
  description: "Utiliser l’eau froide pour se recentrer.",
  energy: "low",
  duration: 2,
  steps: [
    {
      type: "checkbox",
      title: "Passe tes mains sous l’eau froide",
    },
    {
      type: "checkbox",
      title: "Ou rafraîchis ton visage",
    },
    {
      type: "timer",
      title: "Observe les sensations",
      duration: 60,
    },
  ],
} satisfies Circuit;
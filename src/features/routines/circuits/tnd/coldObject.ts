import type { Circuit } from "../../types";

export const coldObject = {
  id: "cold-object",
  category: "tnd",
  title: "🧊 Glaçon ou froid",
  description: "Utiliser le froid pour revenir au corps.",
  energy: "low",
  duration: 3,
  steps: [
    {
      type: "checkbox",
      title: "Prends un glaçon ou une poche froide",
    },
    {
      type: "timer",
      title: "Tiens le froid dans ta main",
      description: "Observe les sensations sans jugement.",
      duration: 180,
    },
  ],
} satisfies Circuit;
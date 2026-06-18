import type { Circuit } from "../../types";

export const cleanRoom = {
  id: "clean-room",
  category: "daily",
  title: "Nettoyer une pièce",
  description: "Une seule pièce, étape par étape.",
  energy: "medium",
  duration: 12,
  steps: [
    {
      type: "single-choice",
      title: "Quelle pièce ?",
      options: ["Cuisine", "Salle de bain", "Salon", "Chambre", "Bureau"],
    },
    { type: "checkbox", title: "Ramasser ce qui traîne" },
    { type: "checkbox", title: "Essuyer une surface" },
    { type: "timer", title: "Nettoyage court", duration: 300 },
    { type: "checkbox", title: "Stop : la pièce est mieux qu'avant" },
  ],
} satisfies Circuit;
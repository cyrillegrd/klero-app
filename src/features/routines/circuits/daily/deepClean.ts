import type { Circuit } from "../../types";

export const deepClean = {
  id: "deep-clean",
  category: "daily",
  title: "Grand ménage",
  description: "Nettoyage plus complet, avec étapes claires.",
  energy: "high",
  duration: 30,
  steps: [
    {
      type: "single-choice",
      title: "Quelle zone ?",
      options: ["Cuisine", "Salle de bain", "Salon", "Chambre"],
    },
    { type: "checkbox", title: "Ramasser ce qui traîne" },
    { type: "checkbox", title: "Nettoyer les surfaces" },
    { type: "checkbox", title: "Sol ou aspirateur" },
    { type: "checkbox", title: "Stop : c’est suffisant" },
  ],
} satisfies Circuit;
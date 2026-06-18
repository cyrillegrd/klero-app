import type { Circuit } from "../../types";

export const motivationBoost = {
  id: "motivation-boost",
  category: "tnd",
  title: "Trouver l’élan",
  description: "Créer une petite impulsion sans pression.",
  energy: "low",
  duration: 4,
  steps: [
    {
      type: "single-choice",
      title: "Qu’est-ce qui bloque ?",
      options: ["Trop grand", "Trop flou", "Fatigue", "Peur de mal faire"],
    },
    { type: "checkbox", title: "Réduire à une action minuscule" },
    { type: "timer", title: "Essai de 2 minutes", duration: 120 },
    { type: "checkbox", title: "Valider l’essai, même incomplet" },
  ],
} satisfies Circuit;
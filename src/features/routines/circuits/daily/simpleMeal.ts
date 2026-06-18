import type { Circuit } from "../../types";

export const simpleMeal = {
  id: "simple-meal",
  category: "daily",
  title: "Préparer un repas simple",
  description: "Un repas facile vaut mieux que rien.",
  energy: "medium",
  duration: 10,
  steps: [
    {
      type: "single-choice",
      title: "Choisir une option simple",
      options: ["Pâtes", "Sandwich", "Soupe", "Omelette", "Plat préparé"],
    },
    { type: "checkbox", title: "Sortir les ingrédients" },
    { type: "timer", title: "Préparation", duration: 300 },
    { type: "checkbox", title: "Manger quelque chose" },
  ],
} satisfies Circuit;
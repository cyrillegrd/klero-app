import type { Circuit } from "../../types";

export const anxietyGrounding = {
  id: "anxiety-grounding",
  category: "tnd",
  title: "Crise d’angoisse",
  description: "Revenir au présent étape par étape.",
  energy: "low",
  duration: 6,
  steps: [
    {
      type: "single-choice",
      title: "Où sens-tu l’angoisse ?",
      options: ["Poitrine", "Ventre", "Gorge", "Tête", "Partout"],
    },
    { type: "timer", title: "Respiration douce", duration: 60 },
    {
      type: "todo-list",
      title: "Exercice 5-4-3-2-1",
      items: [
        "5 choses que je vois",
        "4 choses que je sens",
        "3 choses que j’entends",
        "2 choses que je touche",
        "1 chose que je goûte",
      ],
    },
    { type: "checkbox", title: "Boire un peu d’eau" },
    {
      type: "single-choice",
      title: "Action douce maintenant",
      options: ["M’asseoir", "Aller au calme", "Appeler quelqu’un", "Me couvrir"],
    },
  ],
} satisfies Circuit;
import type { Circuit } from "../../types";

export const tidyFiveObjects = {
  id: "tidy-five-objects",
  category: "daily",
  title: "Ranger 5 objets",
  description: "Pas toute la pièce. Juste 5 objets.",
  energy: "low",
  duration: 3,
  steps: [
    {
      type: "single-choice",
      title: "Choisis une zone",
      options: ["Bureau", "Cuisine", "Salon", "Chambre", "Entrée"],
    },
    { type: "checkbox", title: "Ranger 1 objet" },
    { type: "checkbox", title: "Ranger 2 objets" },
    { type: "checkbox", title: "Ranger encore 2 objets" },
    {
      type: "checkbox",
      title: "Stop",
      description: "Tu peux t’arrêter. L’objectif est atteint.",
    },
  ],
} satisfies Circuit;
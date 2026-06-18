import type { Circuit } from "../../types";

export const shower = {
  id: "shower",
  category: "daily",
  title: "Prendre une douche",
  description: "Une douche simple, sans objectif parfait.",
  energy: "medium",
  duration: 10,
  steps: [
    { type: "checkbox", title: "Préparer une serviette" },
    { type: "checkbox", title: "Allumer l’eau" },
    { type: "timer", title: "Douche", duration: 300 },
    { type: "checkbox", title: "S’habiller confortablement" },
  ],
} satisfies Circuit;
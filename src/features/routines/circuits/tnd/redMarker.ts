import type { Circuit } from "../../types";

export const redMarker = {
  id: "red-marker",
  category: "tnd",
  title: "🎨 Feutre rouge sur la peau",
  description: "Exprimer l’intensité sans se blesser.",
  energy: "low",
  duration: 5,
  steps: [
    {
      type: "checkbox",
      title: "Prends un feutre rouge lavable",
    },
    {
      type: "timer",
      title: "Dessine sur ta peau",
      description: "Trace des lignes, formes ou symboles.",
      duration: 300,
    },
    {
      type: "checkbox",
      title: "Observe si l’intensité a baissé",
    },
  ],
} satisfies Circuit;
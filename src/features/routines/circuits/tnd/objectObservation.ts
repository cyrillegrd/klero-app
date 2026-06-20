import type { Circuit } from "../../types";

export const objectObservation = {
  id: "object-observation",
  category: "tnd",
  title: "🔍 Observation détaillée d’un objet",
  description: "Ramener l’attention vers le présent.",
  energy: "low",
  duration: 5,
  steps: [
    { type: "checkbox", title: "Choisis un objet proche" },
    {
      type: "checkbox",
      title: "Décris sa forme et sa taille",
      description: "Compare-le à des objets familiers.",
    },
    {
      type: "checkbox",
      title: "Décris ses couleurs",
      description: "Teintes, variations, motifs.",
    },
    {
      type: "checkbox",
      title: "Décris sa texture",
      description: "Lisse, rugueux, doux, froid, chaud…",
    },
    {
      type: "checkbox",
      title: "Repère ses détails uniques",
    },
    {
      type: "checkbox",
      title: "Imagine son son, son odeur ou son goût",
    },
  ],
} satisfies Circuit;
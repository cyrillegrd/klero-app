import type { Circuit } from "../types";

export const ocdLoop: Circuit = {
  id: "ocd-loop",
  title: "Boucle TOC",
  description: "Identifier la compulsion sans la nourrir.",
  duration: 5,
  energy: "low",
  category: "tnd",
  steps: [
    {
      type: "single-choice",
      title: "Quelle envie compulsive est présente ?",
      options: ["Vérifier", "Répéter", "Chercher à être sûr", "Éviter", "Demander reassurance"],
    },
    {
      type: "checkbox",
      title: "Nommer le mécanisme",
      description: "C’est une envie de certitude, pas une preuve de danger.",
    },
    {
      type: "timer",
      title: "Retarder la compulsion",
      description: "Attends 1 minute avant toute action.",
      duration: 60,
    },
    {
      type: "single-choice",
      title: "Choisir une réponse douce",
      options: ["Laisser l’incertitude", "Revenir au corps", "Changer de pièce", "Faire une micro-action"],
    },
  ],
};
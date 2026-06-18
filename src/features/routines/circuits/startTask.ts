import type { Circuit } from "../types";

export const startTask: Circuit = {
  id: "start-task",
  title: "Démarrer une activité",
  description: "Réduire le blocage et commencer petit.",
  category: "daily",
  duration: 5,
  energy: "low",
  steps: [
    {
      type: "single-choice",
      title: "Quelle activité veux-tu démarrer ?",
      options: ["Travail", "Ménage", "Administratif", "Soin de soi"],
    },
    {
      type: "checkbox",
      title: "Choisir la toute première micro-action",
      description: "Une action de moins de 2 minutes.",
    },
    {
      type: "timer",
      title: "Démarrage doux",
      description: "Commence seulement 2 minutes, sans obligation de finir.",
      duration: 120,
    },
    {
      type: "checkbox",
      title: "Valider le démarrage",
      description: "Même si c'est petit, c'est commencé.",
    },
  ],
};
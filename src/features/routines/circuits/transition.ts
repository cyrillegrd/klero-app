import type { Circuit } from "../types";

export const transition: Circuit = {
  id: "transition",
  title: "Changer d’activité",
  description: "Aider le cerveau à quitter une tâche.",
  category: "daily",
  duration: 4,
  energy: "low",
  steps: [
    {
      type: "checkbox",
      title: "Nommer l’activité actuelle",
      description: "Je suis en train de...",
    },
    {
      type: "timer",
      title: "Pause tampon",
      description: "30 secondes sans commencer autre chose.",
      duration: 30,
    },
    {
      type: "single-choice",
      title: "Quelle est la prochaine direction ?",
      options: ["Me reposer", "Changer de pièce", "Commencer une tâche", "Manger / boire"],
    },
    {
      type: "checkbox",
      title: "Faire seulement le premier geste",
    },
  ],
};
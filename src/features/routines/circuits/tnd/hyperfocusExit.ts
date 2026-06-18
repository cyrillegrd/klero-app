import type { Circuit } from "../../types";

export const hyperfocusExit = {
  id: "hyperfocus-exit",
  category: "tnd",
  title: "Sortir d’un hyperfocus",
  description: "Revenir doucement au corps.",
  energy: "low",
  duration: 5,
  steps: [
    { type: "checkbox", title: "Regarder l’heure" },
    { type: "checkbox", title: "Boire un verre d’eau" },
    { type: "timer", title: "Se lever doucement", duration: 30 },
    {
      type: "single-choice",
      title: "Quel besoin est présent ?",
      options: ["Boire", "Manger", "Toilettes", "Repos", "Continuer"],
    },
    { type: "checkbox", title: "Choisir une seule suite" },
  ],
} satisfies Circuit;
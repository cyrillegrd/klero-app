import type { Circuit } from "../../types";

export const wakeUp = {
  id: "wake-up",
  category: "daily",
  title: "🌅 Sortir du lit",
  description:
    "Une routine douce pour commencer la journée, même quand c'est difficile.",
  energy: "low",
  duration: 8,
  steps: [
    {
      type: "checkbox",
      title: "Ouvre les yeux",
      description:
        "Tu n'as rien d'autre à faire pour l'instant. Juste ouvrir les yeux.",
    },
    {
      type: "timer",
      title: "Respire doucement",
      description:
        "Reste allongé.e et respire calmement pendant quelques secondes.",
      duration: 30,
    },
    {
      type: "checkbox",
      title: "Bouge un peu",
      description:
        "Bouge les doigts, les pieds, les épaules ou la tête.",
    },
    {
      type: "checkbox",
      title: "Assieds-toi",
      description:
        "Passe de couché.e à assis.e. Tu peux prendre ton temps.",
    },
    {
      type: "checkbox",
      title: "Bois un peu d'eau",
      description:
        "Quelques gorgées suffisent.",
    },
    {
      type: "checkbox",
      title: "Va aux toilettes",
      description:
        "Une étape simple pour lancer la journée.",
    },
    {
      type: "checkbox",
      title: "Mets un vêtement confortable",
      description:
        "Pas besoin que ce soit parfait. Juste un vêtement.",
    },
    {
      type: "checkbox",
      title: "Choisis la première petite action",
      description:
        "Une seule action simple : boire, manger, ouvrir le planning ou prendre l'air.",
    },
  ],
} satisfies Circuit;
import type { Circuit } from "../../types";

export const delayChecking = {
  id: "delay-checking",
  category: "tnd",
  title: "⏳ Retarder une vérification",
  description:
    "Décaler doucement une compulsion de vérification.",
  energy: "low",
  duration: 2,

  steps: [
    {
      type: "checkbox",
      title: "Je remarque l’envie de vérifier",
      description:
        "Je n’ai pas besoin de la combattre. Je remarque juste qu’elle est là.",
    },
    {
      type: "timer",
      title: "J’attends 2 minutes",
      description:
        "Pendant ce temps, je laisse l’inconfort monter puis redescendre.",
      duration: 120,
    },
    {
      type: "checkbox",
      title: "Je choisis l’étape suivante",
      description:
        "Soit je continue sans vérifier, soit je reporte encore un peu.",
    },
  ],
} satisfies Circuit;
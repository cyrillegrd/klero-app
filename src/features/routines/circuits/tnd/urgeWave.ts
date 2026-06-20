import type { Circuit } from "../../types";

export const urgeWave = {
  id: "urge-wave",
  category: "tnd",
  title: "🌊 Traverser la vague",
  description:
    "Laisser une envie intense monter puis redescendre.",
  energy: "low",
  duration: 3,

  steps: [
    {
      type: "checkbox",
      title: "Je remarque l’envie",
      description:
        "Je n’ai pas besoin d’agir tout de suite. Je remarque juste l’envie.",
    },
    {
      type: "timer",
      title: "Je laisse passer 90 secondes",
      description:
        "Une envie est comme une vague : elle monte, atteint un pic, puis redescend.",
      duration: 90,
    },
    {
      type: "checkbox",
      title: "Je nomme ce que je ressens",
      description:
        "Par exemple : tension, peur, colère, panique, fatigue.",
    },
    {
      type: "checkbox",
      title: "Je choisis une action douce",
      description:
        "Boire de l’eau, changer de pièce, respirer, tenir un objet froid, écrire une phrase.",
    },
  ],
} satisfies Circuit;
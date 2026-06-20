import type { Circuit } from "../../types";

export const tolerateUncertainty = {
  id: "tolerate-uncertainty",
  category: "tnd",
  title: "🧠 Tolérer le doute",
  description:
    "Apprendre à rester avec une petite part d'incertitude.",
  energy: "low",
  duration: 3,

  steps: [
    {
      type: "checkbox",
      title: "Je remarque le doute",
      description:
        "Je remarque que mon cerveau cherche une certitude absolue.",
    },
    {
      type: "checkbox",
      title: "Je me rappelle une phrase",
      description:
        "Peut-être que c'est vrai. Peut-être que non. Je peux avancer avec cette incertitude.",
    },
    {
      type: "timer",
      title: "Je reste avec le doute",
      description:
        "Je laisse l'inconfort être présent pendant 2 minutes.",
      duration: 120,
    },
    {
      type: "checkbox",
      title: "Je reprends mon activité",
      description:
        "Je choisis une petite action utile malgré l'incertitude.",
    },
  ],
} satisfies Circuit;
import type { Circuit } from "../types";

export const returnToCalm: Circuit = {
  id: "return-to-calm",

  title: "Retour au calme",

  description:
    "Réduire une stimulation puis choisir une seule suite.",

    category: "tnd",

  duration: 4,

  energy: "low",

  steps: [
    {
      type: "single-choice",

      title: "Qu'est-ce qui est trop fort ?",

      options: [
        "Bruit",
        "Lumière",
        "Notifications",
        "Trop de monde",
      ],
    },

    {
      type: "checkbox",

      title: "Réduire une stimulation",

      description:
        "Baisse, éloigne ou ferme un élément.",
    },

    {
      type: "timer",

      title: "Respirer une fois",

      description:
        "Une inspiration puis une expiration lente.",

      duration: 30,
    },

    {
      type: "checkbox",

      title: "Choisir une seule suite",

      description:
        "Pas tout le plan. Juste la suite.",
    },
  ],
};
import type { Circuit } from "../../types";

export const laundryStart = {
  id: "laundry-start",

  category: "daily",

  energy: "low",

  title: "Lancer une machine",

  description:
    "Une étape à la fois.",

  duration: 5,

  steps: [
    {
      type: "checkbox",
      title: "Rassembler le linge",
      description:
        "Prends juste le linge à laver."
    },

    {
      type: "single-choice",
      title: "Quel linge ?",
      options: [
        "Couleurs",
        "Blanc",
        "Serviettes",
        "Draps"
      ]
    },

    {
      type: "checkbox",
      title: "Mettre le linge dans la machine"
    },

    {
      type: "checkbox",
      title: "Ajouter la lessive"
    },

    {
      type: "checkbox",
      title: "Lancer le programme"
    }
  ]
} satisfies Circuit;
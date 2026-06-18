import type { Circuit } from "../../types";

export const drinkWater = {
  id: "drink-water",

  category: "daily",

  title: "Hydratation",

  description:
    "Une petite victoire rapide.",

  energy: "low",

  duration: 1,

  steps: [
    {
      type: "checkbox",

      title: "Remplir un verre",
    },

    {
      type: "checkbox",

      title: "Boire",
    },
  ],
} satisfies Circuit;
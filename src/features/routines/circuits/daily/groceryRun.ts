import type { Circuit } from "../../types";

export const groceryRun = {
  id: "grocery-run",

  category: "daily",

  title: "Faire les courses",

  description:
    "Suivre sa liste sans se disperser.",

  energy: "high",

  duration: 20,

  steps: [
    {
      type: "checkbox",
      title: "Prendre un panier ou un chariot",
      description:
        "Commence tranquillement.",
    },

    {
  type: "shopping-list",
  mode: "check",
  title: "Liste de courses",
  description:
    "Coche les produits au fur et à mesure des courses.",
},

    {
      type: "checkbox",
      title: "Vérifier qu'il ne manque rien",
      description:
        "Relis la liste une dernière fois.",
    },

    {
      type: "checkbox",
      title: "Passer en caisse",
    },

    {
      type: "checkbox",
      title: "Courses terminées",
    },
  ],
} satisfies Circuit;
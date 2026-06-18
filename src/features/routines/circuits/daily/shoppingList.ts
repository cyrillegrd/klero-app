import type { Circuit } from "../../types";

export const shoppingList = {
  id: "shopping-list",
  category: "daily",

  title: "Préparer les courses",

  description:
    "Construire une liste simple à partir de repas faciles.",

  energy: "low",

  duration: 5,

steps: [
  {
    type: "text-list",
    title: "Quels repas veux-tu faire ?",
    description:
      "Note des repas simples, rapides et réconfortants.",
  },
  {
    type: "shopping-list",
    mode: "create",
    title: "De quoi as-tu besoin ?",
    description:
      "Écris les ingrédients dont tu as besoin.",
  },
  {
    type: "shopping-list",
    mode: "check",
    title: "Vérifier ce qu’il y a déjà chez toi",
    description:
      "Placards, garde-manger, cuisine et congélateur.",
  },
  {
    type: "checkbox",
    title: "Liste prête",
    description:
      "Ce qui n’est pas coché sera disponible sur l’accueil.",
  },
],
} satisfies Circuit;
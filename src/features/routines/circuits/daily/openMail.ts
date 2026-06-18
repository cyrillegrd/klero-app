import type { Circuit } from "../../types";

export const openMail = {
  id: "open-mail",
  category: "daily",
  title: "Ouvrir le courrier",
  description: "Juste regarder, sans tout traiter.",
  energy: "low",
  duration: 4,
  steps: [
    { type: "checkbox", title: "Rassembler le courrier" },
    {
      type: "single-choice",
      title: "Quel type de courrier ?",
      options: ["Administratif", "Facture", "Santé", "Publicité", "Autre"],
    },
    {
      type: "checkbox",
      title: "Jeter ce qui est inutile",
    },
    {
      type: "checkbox",
      title: "Garder ce qui doit être traité",
    },
  ],
} satisfies Circuit;
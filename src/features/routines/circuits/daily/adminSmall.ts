import type { Circuit } from "../../types";

export const adminSmall = {
  id: "admin-small",
  category: "daily",
  title: "Administratif simple",
  description: "Traiter une seule démarche.",
  energy: "high",
  duration: 20,
  steps: [
    {
      type: "single-choice",
      title: "Quelle démarche ?",
      options: ["Facture", "Impôts", "Santé", "Banque", "Logement"],
    },
    { type: "checkbox", title: "Ouvrir le document ou le site" },
    { type: "timer", title: "Avancer 15 minutes", duration: 900 },
    { type: "checkbox", title: "Noter la prochaine étape" },
  ],
} satisfies Circuit;
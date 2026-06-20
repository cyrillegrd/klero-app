import type { Circuit } from "../../types";

export const stopRumination = {
  id: "stop-rumination",
  category: "tnd",
  title: "🛑 Sortir de la rumination",
  description:
    "Quand ton cerveau tourne en boucle sans avancer.",
  energy: "low",
  duration: 3,

  steps: [
    {
      type: "checkbox",
      title: "Je remarque que je rumine",
      description:
        "Je tourne autour du même problème depuis un moment.",
    },
    {
      type: "checkbox",
      title: "Je me pose une question",
      description:
        "Est-ce que cette réflexion m'aide vraiment maintenant ?",
    },
    {
      type: "checkbox",
      title: "Je choisis une action",
      description:
        "Boire un verre d'eau, marcher 2 minutes, ranger un objet ou envoyer un message.",
    },
    {
      type: "timer",
      title: "Je fais l'action choisie",
      duration: 120,
    },
    {
      type: "checkbox",
      title: "Je reviens au présent",
      description:
        "Mon objectif n'est pas de résoudre le problème maintenant.",
    },
  ],
} satisfies Circuit;
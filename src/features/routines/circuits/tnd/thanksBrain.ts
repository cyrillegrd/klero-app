import type { Circuit } from "../../types";

export const thanksBrain = {
  id: "thanks-brain",
  category: "tnd",
  title: "🧠 Merci cerveau",
  description:
    "Prendre de la distance avec une pensée intrusive.",
  energy: "low",
  duration: 2,

  steps: [
    {
      type: "checkbox",
      title: "Je remarque la pensée",
      description:
        "Je remarque qu'une pensée difficile est présente.",
    },
    {
      type: "checkbox",
      title: "Je remercie mon cerveau",
      description:
        "Merci cerveau de vouloir me protéger.",
    },
    {
      type: "checkbox",
      title: "Je n'essaie pas de résoudre la pensée",
      description:
        "Je peux la laisser être là sans y répondre.",
    },
    {
      type: "checkbox",
      title: "Je reviens à ce que je faisais",
      description:
        "Je choisis une petite action utile maintenant.",
    },
  ],
} satisfies Circuit;
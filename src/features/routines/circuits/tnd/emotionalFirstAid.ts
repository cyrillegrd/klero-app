import type { Circuit } from "../../types";

export const emotionalFirstAid = {
  id: "emotional-first-aid",
  category: "tnd",
  title: "🛡️ Premiers secours émotionnels",
  description:
    "Des outils rapides pour traverser une émotion intense.",
  energy: "low",
  duration: 5,

  steps: [
    {
      type: "single-choice",
      title: "Choisis une protection maintenant",
      description:
        "Prends celle qui te semble la plus accessible. Une seule suffit.",
      options: [
        "💪 Relâchement musculaire",
        "🎨 Feutre rouge sur la peau",
        "🔍 Observation détaillée d’un objet",
        "🧊 Glaçon ou froid",
        "🌊 Eau froide",
      ],
    },
    {
      type: "checkbox",
      title: "💪 Option : relâchement musculaire",
      description:
        "Contracte mains, bras, épaules, ventre, jambes, orteils et visage pendant 5 secondes, puis relâche. À refaire 3 fois.",
    },
    {
      type: "checkbox",
      title: "🎨 Option : feutre rouge",
      description:
        "Avec un feutre rouge lavable, dessine sur ta peau pendant 5 minutes. Tu peux recommencer si besoin.",
    },
    {
      type: "checkbox",
      title: "🔍 Option : observation d’un objet",
      description:
        "Choisis un objet. Décris sa forme, sa taille, ses couleurs, motifs, texture, marques uniques, fonction, puis imagine son son, son odeur ou son goût.",
    },
    {
      type: "checkbox",
      title: "🧊 Option : froid",
      description:
        "Tiens un glaçon ou une poche froide dans la main et observe les sensations.",
    },
    {
      type: "checkbox",
      title: "🌊 Option : eau froide",
      description:
        "Passe tes mains sous l’eau froide ou rafraîchis ton visage.",
    },
    {
      type: "timer",
      title: "Je prends 5 minutes",
      description:
        "Reste avec l’option choisie. L’objectif est de traverser la vague, pas de tout régler maintenant.",
      duration: 300,
    },
    {
      type: "checkbox",
      title: "Je reviens doucement au présent",
      description:
        "Regarde autour de toi. Nomme une chose que tu vois, une chose que tu entends, et une chose que tu ressens physiquement.",
    },
  ],
} satisfies Circuit;
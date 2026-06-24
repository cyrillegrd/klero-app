import type { Circuit } from "../../types";

export const beforeSleep = {
  id: "before-sleep",
  category: "daily",
  title: "🌙 Avant de dormir",
  description:
    "Une routine courte pour préparer le corps et le cerveau au sommeil.",
  energy: "low",
  duration: 10,
  steps: [
    {
      type: "checkbox",
      title: "Baisse l'intensité",
      description:
        "Diminue la lumière, le son ou les stimulations autour de toi.",
    },
    {
      type: "checkbox",
      title: "Prépare demain",
      description:
        "Pose un vêtement, un objet utile ou une note pour demain.",
    },
    {
      type: "checkbox",
      title: "Range une seule chose",
      description:
        "Une seule chose suffit : un verre, un vêtement, un papier.",
    },
    {
      type: "timer",
      title: "Respiration calme",
      description:
        "Respire lentement pendant une minute.",
      duration: 60,
    },
    {
      type: "checkbox",
      title: "Éloigne les écrans",
      description:
        "Pose le téléphone ou baisse fortement la luminosité.",
    },
    {
      type: "checkbox",
      title: "Installe-toi",
      description:
        "Mets-toi dans une position confortable.",
    },
    {
      type: "checkbox",
      title: "Dernière pensée douce",
      description:
        "Tu n'as pas besoin de régler toute ta vie ce soir. Tu peux reprendre demain.",
    },
  ],
} satisfies Circuit;
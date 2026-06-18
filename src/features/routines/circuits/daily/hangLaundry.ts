import type { Circuit } from "../../types";

export const hangLaundry = {
  id: "hang-laundry",
  category: "daily",
  title: "Étendre le linge",
  description: "Sortir et étendre le linge sans tout compliquer.",
  energy: "medium",
  duration: 8,
  steps: [
    { type: "checkbox", title: "Ouvrir la machine" },
    { type: "checkbox", title: "Sortir le linge" },
    { type: "timer", title: "Étendre quelques vêtements", duration: 300 },
    { type: "checkbox", title: "Stop : le linge est étendu" },
  ],
} satisfies Circuit;
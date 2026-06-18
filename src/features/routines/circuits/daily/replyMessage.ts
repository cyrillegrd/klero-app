import type { Circuit } from "../../types";

export const replyMessage = {
  id: "reply-message",

  category: "daily",

  title: "Répondre à un message",

  description:
    "Un seul message suffit.",

  energy: "low",

  duration: 3,

  steps: [
    {
      type: "checkbox",

      title: "Choisir un message",
    },

    {
      type: "checkbox",

      title: "Ecrire un message",
    },

    {
      type: "checkbox",

      title: "Envoyer la réponse",
    },
  ],
} satisfies Circuit;
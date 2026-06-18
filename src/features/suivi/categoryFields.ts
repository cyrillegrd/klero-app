export type CategoryFieldType =
  | "scale"
  | "mood"
  | "time"
  | "number"
  | "text"
  | "boolean";

export type CategoryField = {
  label: string;
  type: CategoryFieldType;
};

export const categoryFields: Record<string, CategoryField[]> = {
  cognitif: [
    { label: "Concentration", type: "scale" },
    { label: "Impulsivité", type: "scale" },
    { label: "Difficulté à démarrer", type: "scale" },
    { label: "Difficulté à changer de tâche", type: "scale" },
    { label: "Gestion du temps", type: "scale" },
    { label: "Hyperactivité mentale", type: "scale" },
    { label: "Paralysie exécutive", type: "scale" },
    { label: "Oublis", type: "scale" },
  ],

  emotions: [
    { label: "Humeur générale", type: "mood" },
    { label: "Stress", type: "scale" },
    { label: "Anxiété", type: "scale" },
    { label: "Irritabilité", type: "scale" },
    { label: "Tristesse", type: "scale" },
    { label: "Colère", type: "scale" },
    { label: "Joie", type: "scale" },
    { label: "Sentiment d'accomplissement", type: "scale" },
  ],

  sommeil: [
    { label: "Heure coucher", type: "time" },
    { label: "Heure réveil", type: "time" },
    { label: "Réveils nocturnes", type: "number" },
    { label: "Temps de sommeil", type: "number" },
  ],

  autisme: [
    { label: "Sensibilité sensorielle", type: "scale" },
    { label: "Surcharge sensorielle", type: "scale" },
    { label: "Besoin d'isolement", type: "scale" },
    { label: "Fatigue sociale", type: "scale" },
    { label: "Masquage social", type: "scale" },
    { label: "Difficultés de communication", type: "scale" },
    { label: "Rigidité cognitive", type: "scale" },
  ],

  physique: [
    { label: "Énergie", type: "scale" },
    { label: "Fatigue", type: "scale" },
    { label: "Douleurs", type: "scale" },
    { label: "Tension musculaire", type: "scale" },
    { label: "Qualité du sommeil", type: "scale" },
    { label: "Somnolence", type: "scale" },
  ],
} satisfies Record<string, CategoryField[]>;
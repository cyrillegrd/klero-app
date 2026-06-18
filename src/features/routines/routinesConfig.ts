export type RoutineEnergy =
  | "low"
  | "medium"
  | "high";

export type Routine = {
  id: string;
  title: string;
  icon: string;
  energy: RoutineEnergy;
};

export const dailyRoutines: Routine[] = [
  {
    id: "shopping-list",
    title: "Faire la liste des courses",
    icon: "📝",
    energy: "low",
  },

  {
    id: "laundry",
    title: "Lancer une machine",
    icon: "🧺",
    energy: "low",
  },

  {
    id: "tidy",
    title: "Ranger 5 objets",
    icon: "🧹",
    energy: "low",
  },

  {
    id: "drive",
    title: "Commander les courses",
    icon: "🛒",
    energy: "medium",
  },

  {
    id: "clean-room",
    title: "Nettoyer une pièce",
    icon: "✨",
    energy: "medium",
  },

  {
    id: "groceries",
    title: "Faire les courses",
    icon: "🛍️",
    energy: "high",
  },

  {
    id: "deep-clean",
    title: "Grand ménage",
    icon: "🧽",
    energy: "high",
  },

  {
    id: "admin",
    title: "Administratif",
    icon: "📄",
    energy: "high",
  },
];
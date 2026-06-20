export type PlanItemType = "task"| "routine" | "appointment";

export interface PlanItem {
  id: string;
  title: string;
  type: "task" | "routine" | "appointment";

  date: string;
  time: string;

  completed: boolean;
  postponedCount: number;

  priorityRank?: number;

  recurrence?:
    | "none"
    | "daily"
    | "weekly"
    | "biweekly"
    | "monthly";

  location?: string;

  travelTimeMinutes?: number;

  travelMode?:
    | "walk"
    | "car"
    | "public_transport";
}
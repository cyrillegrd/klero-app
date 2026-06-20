export type PlanItemType = "task"| "routine" | "appointment";

export type PlanItem = {
    id: string, 
    title: string, 
    type: PlanItemType,
    date: string;
    time: string;
    completed: boolean;
    postponedCount: number;
    priorityRank?: number;
    location?: string;
travelTimeMinutes?: number;
travelMode?: "walk" | "car" | "public_transport";
recurrence?: "none" | "daily" | "weekly" | "biweekly" | "monthly";
};
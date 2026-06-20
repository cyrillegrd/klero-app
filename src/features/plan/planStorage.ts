import type { PlanItem } from "./planTypes";

const PLAN_KEY = "klero_plan_items";

export function loadPlanItems(): PlanItem[] {
  const data = localStorage.getItem(PLAN_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePlanItems(items: PlanItem[]) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(items));
}
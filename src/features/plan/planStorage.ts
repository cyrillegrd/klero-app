import type { PlanItem } from "./planTypes";
import {
  saveCloudPlanItem,
  deleteCloudPlanItem,
} from "./planCloud";

const PLAN_KEY = "klero_plan_items";

export function loadPlanItems(): PlanItem[] {
  const data = localStorage.getItem(PLAN_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePlanItems(items: PlanItem[]) {
  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(items)
  );

  items.forEach((item) => {
    saveCloudPlanItem(item);
  });
}

export function deletePlanItemEverywhere(itemId: string) {
  const items = loadPlanItems().filter(
    (item) => item.id !== itemId
  );

  savePlanItems(items);
  deleteCloudPlanItem(itemId);
}
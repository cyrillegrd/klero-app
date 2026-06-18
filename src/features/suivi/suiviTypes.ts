export type SuiviCategoryStatus = "active" | "inactive";

export type SuiviCategory = {
  id: string;
  label: string;
  description: string;
  status: SuiviCategoryStatus;
  enabled: boolean;
};
export type CircuitStep =
  | {
      type: "checkbox";
      title: string;
      description?: string;
    }
  | {
      type: "timer";
      title: string;
      description?: string;
      duration: number;
    }
  | {
      type: "single-choice";
      title: string;
      description?: string;
      options: string[];
    }
  | {
      type: "todo-list";
      title: string;
      description?: string;
      items: string[];
    }
| {
    type: "text-list";
    title: string;
    description?: string;
  }
| {
    type: "shopping-list";
    title: string;
    description?: string;
    mode: "create" | "check";
  }

export type Circuit = {
  id: string;

  category: CircuitCategory;

  title: string;
  description: string;

  energy: "low" | "medium" | "high";

  duration: number;

  steps: CircuitStep[];
};

export type CircuitCategory =
  | "tnd"
  | "daily";
import { useSyncExternalStore } from "react";

export type InterventionStatus = "planned" | "active" | "completed";

export type Intervention = {
  id: string;
  title: string;
  description: string;
  goal: string;
  status: InterventionStatus;
  created: string;
};

let interventions: Intervention[] = [
  {
    id: "seed-workshop",
    title: "Exam Preparation Workshop",
    description: "Help students learn study planning and stress-management strategies.",
    goal: "Reduce exam-related stress.",
    status: "planned",
    created: "Today",
  },
];

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addIntervention(input: { title: string; description: string; goal?: string }) {
  if (interventions.some((i) => i.title === input.title)) return false;
  interventions = [
    {
      id: `${Date.now()}-${input.title}`,
      title: input.title,
      description: input.description,
      goal: input.goal ?? `Reduce stress related to ${input.title.toLowerCase()}.`,
      status: "planned",
      created: "Today",
    },
    ...interventions,
  ];
  emit();
  return true;
}

export function setInterventionStatus(id: string, status: InterventionStatus) {
  interventions = interventions.map((i) => (i.id === id ? { ...i, status } : i));
  emit();
}

export function useInterventions() {
  return useSyncExternalStore(
    subscribe,
    () => interventions,
    () => interventions,
  );
}

export const STATUS_META: Record<InterventionStatus, { label: string; dot: string; chip: string }> =
  {
    planned: {
      label: "🟡 Planned",
      dot: "bg-warning",
      chip: "bg-warning-soft text-warning-foreground",
    },
    active: { label: "🟢 Active", dot: "bg-success", chip: "bg-success-soft text-foreground" },
    completed: { label: "✅ Completed", dot: "bg-primary", chip: "bg-primary-soft text-primary" },
  };

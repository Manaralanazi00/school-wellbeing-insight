import { useSyncExternalStore } from "react";

export type LocalCheckIn = {
  id: string;
  level: number;
  stressors: string[];
  timing: string | null;
  at: number;
};

const KEY = "school-pulse-checkins";

let checkIns: LocalCheckIn[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) checkIns = JSON.parse(raw) as LocalCheckIn[];
  } catch {
    checkIns = [];
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(checkIns));
  } catch {
    /* ignore */
  }
}

export function addCheckIn(input: { level: number; stressors: string[]; timing: string | null }) {
  load();
  checkIns = [
    ...checkIns,
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, at: Date.now(), ...input },
  ];
  persist();
  emit();
}

export function clearCheckIns() {
  checkIns = [];
  loaded = true;
  persist();
  emit();
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => listeners.delete(l);
}

const EMPTY: LocalCheckIn[] = [];

export function useLocalCheckIns() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return checkIns;
    },
    () => EMPTY,
  );
}

import { useSyncExternalStore } from "react";

export const DEMO_EMAIL = "demo@schoolpulse.com";
export const DEMO_PASSWORD = "demo123";

let signedIn = false;
const listeners = new Set<() => void>();

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function signIn() {
  signedIn = true;
  listeners.forEach((l) => l());
}

export function signOut() {
  signedIn = false;
  listeners.forEach((l) => l());
}

export function useDemoAuth() {
  return useSyncExternalStore(
    subscribe,
    () => signedIn,
    () => false,
  );
}

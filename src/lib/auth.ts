import { useSyncExternalStore } from "react";

/**
 * Prototype-only authentication.
 * No backend: a session is kept locally so the demo survives a page reload.
 * Passwords are never stored — only the signed-in email is remembered.
 */

const KEY = "school-pulse-session";

export type Session = { email: string } | null;

let session: Session = null;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY) ?? window.sessionStorage.getItem(KEY);
    if (raw) session = JSON.parse(raw) as Session;
  } catch {
    session = null;
  }
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Resolves to an error message, or null when the sign-in succeeds. */
export async function signIn(email: string, password: string, remember: boolean) {
  await new Promise((r) => setTimeout(r, 700));
  if (!isValidEmail(email) || password.length < 6) {
    return "We couldn't sign you in. Please check your email and password and try again.";
  }
  load();
  session = { email: email.trim().toLowerCase() };
  loaded = true;
  try {
    const store = remember ? window.localStorage : window.sessionStorage;
    const other = remember ? window.sessionStorage : window.localStorage;
    other.removeItem(KEY);
    store.setItem(KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
  emit();
  return null;
}

export function signOut() {
  session = null;
  loaded = true;
  try {
    window.localStorage.removeItem(KEY);
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useSession() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return session;
    },
    () => null,
  );
}

export function useDemoAuth() {
  return useSession() !== null;
}

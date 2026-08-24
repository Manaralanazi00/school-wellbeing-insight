import type { StressorKey } from "./school-pulse-data";

export const STRESS_LEVELS = [
  { value: 12, emoji: "😌", label: "Very Low" },
  { value: 32, emoji: "🙂", label: "Low" },
  { value: 52, emoji: "😐", label: "Moderate" },
  { value: 72, emoji: "😟", label: "High" },
  { value: 90, emoji: "😣", label: "Very High" },
];

export const STRESSOR_OPTIONS: { key: StressorKey | "personal" | "else"; emoji: string; label: string }[] = [
  { key: "exams", emoji: "📚", label: "Exams" },
  { key: "workload", emoji: "📖", label: "Academic workload" },
  { key: "relationships", emoji: "🤝", label: "Relationships" },
  { key: "bullying", emoji: "🚫", label: "Bullying" },
  { key: "future", emoji: "🎯", label: "Future / Career" },
  { key: "personal", emoji: "🏠", label: "Personal life" },
  { key: "else", emoji: "💬", label: "Something else" },
];

export const TIMING_OPTIONS = [
  "Before exams",
  "During exams",
  "When assignments pile up",
  "When dealing with classmates",
  "When thinking about the future",
  "Most of the time",
  "I'm not sure",
];

export type SupportCard = { title: string; body: string };

const SUPPORT: Record<string, SupportCard> = {
  exams: {
    title: "Preparing for exams",
    body: "Break large study tasks into smaller steps and take regular short breaks.",
  },
  workload: {
    title: "Managing your workload",
    body: "List what is due, pick the next single task, and finish that one before looking at the rest.",
  },
  relationships: {
    title: "Connections take energy",
    body: "Talking things through with someone you trust can make a difficult situation feel lighter.",
  },
  bullying: {
    title: "You deserve to feel safe",
    body: "Consider talking to a trusted adult, teacher, counselor, or someone you feel comfortable with.",
  },
  future: {
    title: "One step at a time",
    body: "You don't need to figure out your entire future today. Focus on the next step you can control.",
  },
  personal: {
    title: "Life outside school matters too",
    body: "Small routines — sleep, food, moving, a short walk — help more than they seem to.",
  },
  else: {
    title: "Whatever it is, it counts",
    body: "You don't need the perfect words to ask for support. Starting the conversation is enough.",
  },
};

export const GENERAL_SUPPORT: SupportCard = {
  title: "Small steps still count",
  body: "Checking in with yourself is a real step. Try one small, kind thing for yourself today.",
};

export function supportFor(keys: string[]): SupportCard[] {
  const cards = keys.map((k) => SUPPORT[k]).filter(Boolean) as SupportCard[];
  return cards.length ? cards : [GENERAL_SUPPORT];
}

export function stressLabel(score: number) {
  if (score < 25) return "Very Low";
  if (score < 45) return "Low";
  if (score < 65) return "Moderate";
  if (score < 82) return "High";
  return "Very High";
}

export function stressMessage(score: number) {
  if (score < 45)
    return "Things sound fairly steady right now. Keep noticing what helps you stay balanced.";
  if (score < 65)
    return "There's some pressure in your week. Small adjustments now can keep it from building up.";
  return "It sounds like you've been dealing with a lot of pressure lately. You don't have to handle everything alone.";
}

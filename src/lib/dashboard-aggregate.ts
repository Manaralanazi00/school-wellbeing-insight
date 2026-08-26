import {
  MIN_GROUP_SIZE,
  RANGE_DATA,
  SCHOOL,
  STRESS_SOURCES,
  STRESS_TREND_7D,
  type StressorSlice,
} from "./school-pulse-data";
import type { LocalCheckIn } from "./checkin-store";

export type Aggregate = {
  checkIns: number;
  averageStress: number;
  highStressPct: number;
  trend: { label: string; short: string; stress: number }[];
  sources: StressorSlice[];
  localCount: number;
  enoughResponses: boolean;
};

const LABELS: Record<string, string> = {
  exams: "Exams",
  workload: "Academic workload",
  future: "Future / Career",
  relationships: "Relationships",
  bullying: "Bullying",
  personal: "Other",
  else: "Other",
};

/** Merges the fictional demo baseline with check-ins submitted in this browser. */
export function buildAggregate(local: LocalCheckIn[]): Aggregate {
  const base = RANGE_DATA["7d"];
  const baseCount = base.checkIns;
  const n = local.length;
  const checkIns = baseCount + n;

  const localAvg = n ? local.reduce((s, c) => s + c.level, 0) / n : 0;
  const averageStress = Math.round((base.averageStress * baseCount + localAvg * n) / checkIns);

  const localHigh = local.filter((c) => c.level >= 65).length;
  const highStressPct = Math.round(
    ((base.highStress / 100) * baseCount + localHigh) * (100 / checkIns),
  );

  // Trend: today's point (last item) blends in local responses.
  const trend = STRESS_TREND_7D.map((d, i) => {
    if (i !== STRESS_TREND_7D.length - 1 || n === 0) return d;
    const dayBase = 180;
    return {
      ...d,
      stress: Math.round((d.stress * dayBase + localAvg * n) / (dayBase + n)),
    };
  });

  // Stress factors: convert baseline shares to counts, add local selections, re-normalise.
  const counts = new Map<string, number>();
  STRESS_SOURCES.forEach((s) => counts.set(s.key, s.responses));
  local.forEach((c) =>
    c.stressors.forEach((k) => {
      const name = LABELS[k] ?? "Other";
      const match = STRESS_SOURCES.find((s) => s.name === name);
      const key = match?.key ?? "other";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }),
  );
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const sources = STRESS_SOURCES.map((s) => {
    const responses = counts.get(s.key) ?? 0;
    return { ...s, responses, value: Math.round((responses / total) * 100) };
  })
    .filter((s) => s.responses >= MIN_GROUP_SIZE)
    .sort((a, b) => b.value - a.value);

  return {
    checkIns,
    averageStress,
    highStressPct,
    trend,
    sources,
    localCount: n,
    enoughResponses: checkIns >= MIN_GROUP_SIZE,
  };
}

export const SCHOOL_NAME = SCHOOL.name;

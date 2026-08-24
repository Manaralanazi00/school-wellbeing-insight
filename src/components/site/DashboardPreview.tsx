import { Lock } from "lucide-react";
import { STRESS_TREND_7D, STRESS_SOURCES } from "@/lib/school-pulse-data";

export function DashboardPreview() {
  const max = 70;
  const points = STRESS_TREND_7D.map((d, i) => {
    const x = (i / (STRESS_TREND_7D.length - 1)) * 100;
    const y = 100 - (d.stress / max) * 90;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="animate-fade-up rounded-3xl border border-border bg-card p-4 shadow-lift sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">School Pulse</p>
          <p className="text-xs text-muted-foreground">Anonymous student wellbeing insights</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[11px] font-medium">
          <Lock className="size-3 text-teal" /> Aggregated
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { l: "Check-ins", v: "1,248" },
          { l: "Avg stress", v: "61%" },
          { l: "High stress", v: "42%" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl bg-muted/70 p-3">
            <p className="text-[11px] text-muted-foreground">{k.l}</p>
            <p className="text-lg font-semibold tabular-nums">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-border p-3">
        <p className="text-xs font-medium text-muted-foreground">Stress levels — last 7 days</p>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-24 w-full">
          <defs>
            <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${points} 100,100`} fill="url(#pv)" />
          <polyline
            points={points}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-3 space-y-2">
        {STRESS_SOURCES.slice(0, 3).map((s) => (
          <div key={s.key} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-xs text-muted-foreground">{s.name}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full"
                style={{ width: `${s.value * 2}%`, background: s.colorVar }}
              />
            </span>
            <span className="w-9 text-right text-xs font-semibold tabular-nums">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

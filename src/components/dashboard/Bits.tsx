import { ArrowDownRight, ArrowUpRight, Inbox, Lock, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  delta,
  tone = "neutral",
  icon,
  index = 0,
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: number | null;
  tone?: "neutral" | "warning" | "danger" | "teal";
  icon?: React.ReactNode;
  index?: number;
}) {
  const toneRing = {
    neutral: "bg-primary-soft text-primary",
    warning: "bg-warning-soft text-foreground",
    danger: "bg-destructive-soft text-destructive",
    teal: "bg-teal-soft text-teal",
  }[tone];

  return (
    <Card
      className="card-lift animate-fade-up gap-0 p-5 shadow-soft"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && (
          <span className={cn("inline-flex size-9 items-center justify-center rounded-xl", toneRing)}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {typeof delta === "number" && <TrendPill delta={delta} />}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  );
}

export function TrendPill({ delta, suffix = "%" }: { delta: number; suffix?: string }) {
  const up = delta > 0;
  const flat = delta === 0;
  const Icon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
        flat
          ? "bg-muted text-muted-foreground"
          : up
            ? "bg-destructive-soft text-destructive"
            : "bg-success-soft text-success",
      )}
    >
      <Icon className="size-3" />
      {flat ? "Stable" : `${up ? "+" : ""}${delta}${suffix}`}
    </span>
  );
}

export function EmptyState({
  title = "Not enough data yet",
  body = "We need more anonymous responses before showing this insight.",
  secondary = "This protects student privacy while ensuring the data remains useful.",
}: {
  title?: string;
  body?: string;
  secondary?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center">
      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-background">
        <Inbox className="size-5 text-muted-foreground" />
      </span>
      <p className="font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      <p className="mt-2 max-w-sm text-xs text-muted-foreground">{secondary}</p>
    </div>
  );
}

export function SuppressedRow({ name, responses }: { name: string; responses: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{responses} responses in this period</p>
      </div>
      <div className="text-left sm:text-right">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium">
          <Lock className="size-3.5 text-teal" />
          Not enough responses to display this insight.
        </p>
        <p className="text-xs text-muted-foreground">
          We hide small groups to help protect student privacy.
        </p>
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

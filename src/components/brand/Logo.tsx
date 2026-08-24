import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function PulseMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 24" className="h-4 w-6" fill="none">
        <path
          d="M2 13h7l3.5-9 5 18 4-11 3 4h13"
          stroke="currentColor"
          className="animate-pulse-line text-primary-foreground"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  withTagline = false,
  to = "/",
  className,
}: {
  withTagline?: boolean;
  to?: string;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-3", className)}>
      <PulseMark />
      <span className="leading-tight">
        <span className="block text-lg font-semibold tracking-tight">School Pulse</span>
        {withTagline && (
          <span className="block text-xs text-muted-foreground">
            Hear the pressure before it becomes a problem.
          </span>
        )}
      </span>
    </Link>
  );
}

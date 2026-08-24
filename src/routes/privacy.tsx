import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeOff, Lock, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrivacyChip } from "@/components/PrivacyBadge";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — School Pulse" },
      {
        name: "description",
        content:
          "How School Pulse protects students: anonymous responses, aggregated insights only, and small groups hidden entirely.",
      },
      { property: "og:title", content: "Privacy — School Pulse" },
      {
        property: "og:description",
        content: "Anonymous by design. Schools see patterns, never individual students.",
      },
    ],
  }),
  component: PrivacyPage,
});

const POINTS = [
  {
    icon: Lock,
    title: "Anonymous",
    body: "Your name is not required and no student names are displayed in the school dashboard.",
  },
  {
    icon: Users,
    title: "Aggregated",
    body: "Schools only see patterns and percentages across groups of students.",
  },
  {
    icon: EyeOff,
    title: "Small groups hidden",
    body: "If a category has fewer than 10 responses, the insight is hidden completely.",
  },
  {
    icon: ShieldCheck,
    title: "Support, not diagnosis",
    body: "School Pulse is not a medical or psychological diagnostic tool. It exists to help schools support students earlier.",
  },
];

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-brand-wash">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <PrivacyChip>🔒 Anonymous &amp; Aggregated</PrivacyChip>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
            Privacy isn't a feature. It's the foundation.
          </h1>
          <p className="mt-4 text-muted-foreground">
            School Pulse is designed to help schools understand student needs without exposing
            individual student responses.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Card
                key={p.title}
                className="card-lift animate-fade-up gap-0 p-6 shadow-soft"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal-soft">
                  <p.icon className="size-5 text-teal" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-8 gap-0 border-dashed p-6">
            <h2 className="text-base font-semibold">What the school actually sees</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A school administrator sees statements like “42% of students report exam-related
              stress, up 8% from last week.” They never see who answered, when a specific student
              answered, or any individual response.
            </p>
          </Card>

          <div className="mt-10">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/checkin">Start an anonymous check-in</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ClipboardList,
  Lightbulb,
  Lock,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { PrivacyChip, PrivacyProtectedButton } from "@/components/PrivacyBadge";
import { EmptyState, SectionHeading, StatCard, SuppressedRow } from "@/components/dashboard/Bits";
import { ComparisonBars, StressTrendChart } from "@/components/dashboard/Charts";
import { signOut, useDemoAuth } from "@/lib/auth";
import { useLocalCheckIns } from "@/lib/checkin-store";
import { buildAggregate } from "@/lib/dashboard-aggregate";
import { EMERGING_SIGNALS, MIN_GROUP_SIZE, SCHOOL, SUPPRESSED_GROUPS } from "@/lib/school-pulse-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "School Dashboard — School Pulse" },
      {
        name: "description",
        content:
          "Aggregated, anonymous student wellbeing insights: stress trends, top stress factors, emerging issues and recommended actions.",
      },
      { property: "og:title", content: "School Dashboard — School Pulse" },
      {
        property: "og:description",
        content: "Aggregated wellbeing patterns for schools — never individual student answers.",
      },
    ],
  }),
  component: DashboardPage,
});

const RECOMMENDED_ACTIONS = [
  {
    title: "Offer study-planning support before exams",
    body: "Exam pressure peaks in the days before assessments — short planning sessions help most there.",
  },
  {
    title: "Increase counselor availability during high-stress periods",
    body: "Extend drop-in hours across the exam window and the weeks assignments cluster.",
  },
  {
    title: "Share wellbeing resources with students",
    body: "Circulate sleep, breaks and stress-management resources through form groups and school channels.",
  },
];

function DashboardPage() {
  const signedIn = useDemoAuth();
  const local = useLocalCheckIns();
  const agg = buildAggregate(local);

  if (!signedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center bg-brand-wash px-4 py-16">
          <Card className="max-w-md gap-0 p-8 text-center shadow-soft">
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft">
              <Lock className="size-5 text-primary" />
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight">Sign in required</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The school dashboard is available after signing in with the demo credentials.
            </p>
            <Button asChild size="lg" className="mt-6 self-center rounded-full">
              <Link to="/login">Go to School Login</Link>
            </Button>
          </Card>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-brand-wash">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{SCHOOL.name}</p>
              <h1 className="text-3xl font-bold tracking-tight">School Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Aggregated results from anonymous student check-ins — last 7 days.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PrivacyProtectedButton />
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => signOut()}
              >
                <LogOut className="size-4" /> Sign out
              </Button>
            </div>
          </div>

          <Card className="mb-8 animate-fade-up gap-0 border-teal/30 bg-teal-soft/50 p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" />
              <div>
                <p className="text-sm font-semibold">Individual responses are never shown</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This dashboard only displays combined patterns. Any group with fewer than{" "}
                  {MIN_GROUP_SIZE} responses is hidden so no student can be identified.
                </p>
              </div>
            </div>
          </Card>

          {!agg.enoughResponses ? (
            <EmptyState
              title="Not enough responses yet"
              body={`We need at least ${MIN_GROUP_SIZE} anonymous check-ins before any aggregated result is displayed.`}
            />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  label="Total anonymous check-ins"
                  value={agg.checkIns.toLocaleString()}
                  hint={
                    agg.localCount
                      ? `includes ${agg.localCount} from this demo session`
                      : "this period"
                  }
                  icon={<Users className="size-4" />}
                  index={0}
                />
                <StatCard
                  label="Average stress level"
                  value={`${agg.averageStress}%`}
                  delta={4}
                  hint="vs. last week"
                  tone="warning"
                  icon={<Activity className="size-4" />}
                  index={1}
                />
                <StatCard
                  label="High-stress responses"
                  value={`${agg.highStressPct}%`}
                  delta={8}
                  hint="of all check-ins"
                  tone="danger"
                  icon={<AlertTriangle className="size-4" />}
                  index={2}
                />
              </div>

              <section className="mt-10">
                <SectionHeading
                  title="Stress trend — last 7 days"
                  subtitle="Average reported stress level across all anonymous check-ins."
                />
                <Card className="gap-0 p-5 shadow-soft">
                  <StressTrendChart data={agg.trend} />
                </Card>
              </section>

              <section className="mt-10">
                <SectionHeading
                  title="Top stress factors"
                  subtitle="Share of responses mentioning each factor."
                  right={<PrivacyChip>Aggregated only</PrivacyChip>}
                />
                {agg.sources.length ? (
                  <Card className="gap-0 p-5 shadow-soft">
                    <ComparisonBars
                      data={agg.sources.map((s) => ({ label: s.name, value: s.value }))}
                    />
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {agg.sources.map((s) => (
                        <li
                          key={s.key}
                          className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-sm"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="tabular-nums text-muted-foreground">{s.value}%</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ) : (
                  <EmptyState />
                )}
              </section>

              <section className="mt-10">
                <SectionHeading
                  title="Emerging Issues"
                  subtitle="Patterns that changed noticeably in this period."
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="card-lift gap-0 p-5 shadow-soft">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-destructive-soft">
                      <TrendingUp className="size-4 text-destructive" />
                    </span>
                    <p className="mt-3 font-medium">
                      Exam-related stress increased 18% this week.
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      The rise is concentrated in the days before scheduled assessments.
                    </p>
                  </Card>
                  <Card className="card-lift gap-0 p-5 shadow-soft">
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-warning-soft">
                      <ClipboardList className="size-4" />
                    </span>
                    <p className="mt-3 font-medium">
                      Academic workload is the second most reported stress factor.
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Most often reported when assignment deadlines cluster together.
                    </p>
                  </Card>
                  {EMERGING_SIGNALS.filter((s) => s.slug === "bullying").map((s) => (
                    <Card key={s.slug} className="card-lift gap-0 p-5 shadow-soft">
                      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-teal-soft">
                        <Activity className="size-4 text-teal" />
                      </span>
                      <p className="mt-3 font-medium">{s.message}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {s.value}% of responses — {s.trendLabel.toLowerCase()} compared with last
                        week.
                      </p>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <SectionHeading
                  title="Recommended Actions"
                  subtitle="Suggestions generated from the aggregated trends above."
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  {RECOMMENDED_ACTIONS.map((a, i) => (
                    <Card
                      key={a.title}
                      className="card-lift animate-fade-up gap-0 p-5 shadow-soft"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft">
                        <Lightbulb className="size-4 text-primary" />
                      </span>
                      <h3 className="mt-3 text-base font-semibold">{a.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {a.body}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <SectionHeading
                  title="Hidden for privacy"
                  subtitle={`Groups with fewer than ${MIN_GROUP_SIZE} responses are never displayed.`}
                />
                <div className="grid gap-3">
                  {SUPPRESSED_GROUPS.map((g) => (
                    <SuppressedRow key={g.key} name={g.name} responses={g.responses} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

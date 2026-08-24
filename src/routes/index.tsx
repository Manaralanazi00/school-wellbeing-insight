import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  EyeOff,
  HeartHandshake,
  Lock,
  MessageCircleHeart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { PrivacyChip } from "@/components/PrivacyBadge";
import { SCHOOL } from "@/lib/school-pulse-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "School Pulse — Hear the pressure before it becomes a problem" },
      {
        name: "description",
        content:
          "Anonymous student check-ins turn into aggregated school-wide wellbeing insights, so schools can act early — never seeing individual responses.",
      },
      { property: "og:title", content: "School Pulse — Anonymous student wellbeing insights" },
      {
        property: "og:description",
        content: "Student voice → anonymous data → school insight → early intervention.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    n: "01",
    title: "Students Check In",
    body: "Students answer a few quick questions anonymously.",
    icon: MessageCircleHeart,
  },
  {
    n: "02",
    title: "Data Stays Private",
    body: "Individual responses are never shown to the school.",
    icon: EyeOff,
  },
  {
    n: "03",
    title: "Schools See the Pulse",
    body: "Aggregated data reveals emerging stress patterns.",
    icon: BarChart3,
  },
  {
    n: "04",
    title: "Schools Act Early",
    body: "Counselors and administrators can respond before problems escalate.",
    icon: HeartHandshake,
  },
];

const PRIVACY_CARDS = [
  {
    title: "Anonymous",
    body: "No student names are displayed in the school dashboard.",
    icon: Lock,
  },
  {
    title: "Aggregated",
    body: "Schools only see patterns and percentages across groups.",
    icon: Users,
  },
  {
    title: "Early Support",
    body: "The goal is prevention and support — not diagnosis or surveillance.",
    icon: ShieldCheck,
  },
];

function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-brand-wash">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
            <div className="animate-fade-up">
              <PrivacyChip>Anonymous &amp; Aggregated</PrivacyChip>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Hear the pressure <span className="text-brand-gradient">before it becomes</span> a
                problem.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                School Pulse gives students a safe, anonymous way to share what is stressing them —
                while giving schools aggregated insights to identify problems early and respond
                proactively.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-glow">
                  <Link to="/checkin">
                    Check In Anonymously <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/login">Explore School Dashboard</Link>
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span>
                  <strong className="text-foreground">{SCHOOL.weeklyCheckIns.toLocaleString()}</strong>{" "}
                  check-ins this week
                </span>
                <span>
                  <strong className="text-foreground">{SCHOOL.students.toLocaleString()}</strong>{" "}
                  students at {SCHOOL.name}
                </span>
              </div>
            </div>
            <DashboardPreview />
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Student voice, turned into early action.
            </h2>
          </div>
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Card
                  key={s.n}
                  className="card-lift animate-fade-up relative gap-0 p-5 shadow-soft"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-soft">
                    <s.icon className="size-5 text-primary" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-widest text-teal">{s.n}</p>
                  <h3 className="mt-1 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <PrivacyChip>🔒 Anonymous &amp; Aggregated</PrivacyChip>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Privacy isn't a feature. It's the foundation.
              </h2>
              <p className="mt-3 text-muted-foreground">
                School Pulse is designed to help schools understand student needs without exposing
                individual student responses.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {PRIVACY_CARDS.map((c, i) => (
                <Card
                  key={c.title}
                  className="card-lift animate-fade-up gap-0 border-teal/20 bg-teal-soft/50 p-6"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-background">
                    <c.icon className="size-5 text-teal" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="overflow-hidden rounded-3xl bg-brand-gradient px-6 py-12 text-center shadow-glow sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              School Pulse turns anonymous student voices into early action.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Anonymous student insights. Actionable school-wide mental health signals.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/checkin">Check In Anonymously</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/school">Explore School Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

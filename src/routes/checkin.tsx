import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { PrivacyChip } from "@/components/PrivacyBadge";
import { cn } from "@/lib/utils";
import { addCheckIn } from "@/lib/checkin-store";

import {
  STRESSOR_OPTIONS,
  STRESS_LEVELS,
  TIMING_OPTIONS,
  stressLabel,
  stressMessage,
  supportFor,
} from "@/lib/student-content";

export const Route = createFileRoute("/checkin")({
  head: () => ({
    meta: [
      { title: "Anonymous Check-In — School Pulse" },
      {
        name: "description",
        content:
          "A one-minute anonymous check-in. No account needed, and your individual answers are never shared with your school.",
      },
      { property: "og:title", content: "Anonymous Check-In — School Pulse" },
      {
        property: "og:description",
        content: "Share what's stressing you, anonymously. Takes less than a minute.",
      },
    ],
  }),
  component: CheckIn,
});

type Step = "welcome" | "privacy" | "q1" | "q2" | "q3" | "results" | "done";

function CheckIn() {
  const [step, setStep] = useState<Step>("welcome");
  const [level, setLevel] = useState<number | null>(null);
  const [stressors, setStressors] = useState<string[]>([]);
  const [timing, setTiming] = useState<string | null>(null);

  const questionIndex = step === "q1" ? 1 : step === "q2" ? 2 : step === "q3" ? 3 : 0;

  function toggleStressor(key: string) {
    setStressors((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function restart() {
    setLevel(null);
    setStressors([]);
    setTiming(null);
    setStep("welcome");
  }

  const score = level ?? 0;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-brand-wash">
        <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
          {questionIndex > 0 && (
            <div className="mb-8 animate-fade-up">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Question {questionIndex} of 3
                </span>
                <span className="text-muted-foreground">
                  {Math.round((questionIndex / 3) * 100)}%
                </span>
              </div>
              <Progress value={(questionIndex / 3) * 100} className="h-2" />
            </div>
          )}

          {step === "welcome" && (
            <Card key="welcome" className="animate-fade-up gap-0 p-7 text-center shadow-soft sm:p-10">
              <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft">
                <Sparkles className="size-6 text-primary" />
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight">How are you feeling lately?</h1>
              <p className="mt-3 text-muted-foreground">
                This check-in is anonymous and takes less than one minute.
              </p>
              <Button
                size="lg"
                className="mt-7 w-full rounded-full shadow-glow sm:w-auto sm:self-center sm:px-10"
                onClick={() => setStep("privacy")}
              >
                Start Check-In
              </Button>
              <p className="mt-5 text-xs text-muted-foreground">
                🔒 Your individual answers are not shared with your school.
              </p>
            </Card>
          )}

          {step === "privacy" && (
            <Card key="privacy" className="animate-fade-up gap-0 p-7 shadow-soft sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-teal-soft">
                <ShieldCheck className="size-5 text-teal" />
              </span>
              <h1 className="mt-5 text-2xl font-bold tracking-tight">Your privacy comes first</h1>
              <ul className="mt-5 space-y-3">
                {[
                  "Your name is not required.",
                  "Your school sees aggregated trends, not individual answers.",
                  "Your responses help identify areas where students may need more support.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft">
                      <Check className="size-3 text-success" />
                    </span>
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                This tool is not a medical or psychological diagnosis.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="rounded-full" onClick={() => setStep("q1")}>
                  I Understand — Start
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setStep("welcome")}
                >
                  <ArrowLeft className="size-4" /> Back
                </Button>
              </div>
            </Card>
          )}

          {step === "q1" && (
            <Card key="q1" className="animate-fade-up gap-0 p-6 shadow-soft sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight">
                How much stress have you been feeling recently?
              </h1>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {STRESS_LEVELS.map((opt) => {
                  const active = level === opt.value;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setLevel(opt.value)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all sm:flex-col sm:items-center sm:gap-2 sm:text-center",
                        active
                          ? "border-primary bg-primary-soft shadow-glow"
                          : "border-border bg-card hover:border-primary/40 hover:bg-accent/40",
                      )}
                    >
                      <span className="text-3xl">{opt.emoji}</span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <Button variant="ghost" className="rounded-full" onClick={() => setStep("privacy")}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button
                  size="lg"
                  className="rounded-full"
                  disabled={level === null}
                  onClick={() => setStep("q2")}
                >
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          )}

          {step === "q2" && (
            <Card key="q2" className="animate-fade-up gap-0 p-6 shadow-soft sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight">
                What is causing you the most stress?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">You can select more than one.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {STRESSOR_OPTIONS.map((opt) => {
                  const active = stressors.includes(opt.key);
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => toggleStressor(opt.key)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                        active
                          ? "border-teal bg-teal-soft"
                          : "border-border bg-card hover:border-teal/40 hover:bg-accent/40",
                      )}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="flex-1 text-sm font-medium">{opt.label}</span>
                      <span
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-md border",
                          active ? "border-teal bg-teal" : "border-border",
                        )}
                      >
                        {active && <Check className="size-3 text-teal-foreground" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <Button variant="ghost" className="rounded-full" onClick={() => setStep("q1")}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button
                  size="lg"
                  className="rounded-full"
                  disabled={stressors.length === 0}
                  onClick={() => setStep("q3")}
                >
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          )}

          {step === "q3" && (
            <Card key="q3" className="animate-fade-up gap-0 p-6 shadow-soft sm:p-8">
              <h1 className="text-2xl font-bold tracking-tight">
                When do you feel the most pressure?
              </h1>
              <div className="mt-6 grid gap-3">
                {TIMING_OPTIONS.map((opt) => {
                  const active = timing === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTiming(opt)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all",
                        active
                          ? "border-primary bg-primary-soft"
                          : "border-border bg-card hover:border-primary/40 hover:bg-accent/40",
                      )}
                    >
                      <span className="text-sm font-medium">{opt}</span>
                      <span
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-full border",
                          active ? "border-primary bg-primary" : "border-border",
                        )}
                      >
                        {active && <Check className="size-3 text-primary-foreground" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <Button variant="ghost" className="rounded-full" onClick={() => setStep("q2")}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button
                  size="lg"
                  className="rounded-full"
                  disabled={!timing}
                  onClick={() => setStep("results")}
                >
                  See My Results <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          )}

          {step === "results" && (
            <div key="results" className="animate-fade-up space-y-5">
              <Card className="gap-0 p-7 text-center shadow-soft sm:p-9">
                <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                  Reported Stress Level
                </p>
                <ScoreRing score={score} label={stressLabel(score)} />

                <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your responses suggest that you may be experiencing a{" "}
                  <span className="font-medium text-foreground">
                    {stressLabel(score).toLowerCase()}
                  </span>{" "}
                  level of stress recently.
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {stressMessage(score)}
                </p>
                {timing && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    You said pressure peaks: <span className="font-medium">{timing}</span>
                  </p>
                )}
              </Card>


              <div className="grid gap-4 sm:grid-cols-2">
                {supportFor(stressors).map((c, i) => (
                  <Card
                    key={c.title}
                    className="card-lift animate-fade-up gap-0 p-5 shadow-soft"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <h3 className="text-base font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </Card>
                ))}
              </div>

              <Card className="gap-0 border-teal/30 bg-teal-soft/50 p-5 shadow-soft">
                <div className="flex items-start gap-3 text-left">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" />
                  <div>
                    <h3 className="text-base font-semibold">What happens next?</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Your response is anonymous and combined with other student responses. Schools
                      only see aggregated patterns, not individual answers.
                    </p>
                  </div>
                </div>
              </Card>

              <p className="text-center text-xs text-muted-foreground">
                This is supportive guidance, not a medical or psychological diagnosis.
              </p>

              <Button
                size="lg"
                className="w-full rounded-full shadow-glow"
                onClick={() => {
                  addCheckIn({ level: score, stressors, timing });
                  setStep("done");
                }}
              >
                Submit Anonymously
              </Button>

            </div>
          )}

          {step === "done" && (
            <Card key="done" className="animate-fade-up gap-0 p-8 text-center shadow-soft sm:p-12">
              <span className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-success-soft">
                <svg viewBox="0 0 24 24" className="size-10" fill="none">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    className="animate-draw-check text-success"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h1 className="mt-6 text-2xl font-bold tracking-tight">
                Thank you for speaking up. 💙
              </h1>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Your anonymous response helps your school understand what students are experiencing.
              </p>
              <div className="mt-6 flex justify-center">
                <PrivacyChip>Your response was submitted anonymously.</PrivacyChip>
              </div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/">Done</Link>
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full" onClick={restart}>
                  Start another check-in
                </Button>
              </div>
            </Card>
          )}

          {step !== "done" && (
            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3 text-teal" /> Anonymous — no account, no name, no login.
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const tone = score >= 82 ? "var(--destructive)" : score >= 65 ? "var(--warning)" : score >= 45 ? "var(--chart-1)" : "var(--success)";
  return (
    <div className="relative mx-auto my-6 size-40">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--muted)" strokeWidth="14" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <span className="text-2xl font-bold leading-tight">{label}</span>
        <span className="mt-1 text-xs text-muted-foreground">Based on your answers</span>
      </div>

    </div>
  );
}

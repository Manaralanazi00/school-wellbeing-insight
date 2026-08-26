import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Lock, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DEMO_EMAIL, DEMO_PASSWORD, signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "School Login — School Pulse" },
      {
        name: "description",
        content:
          "Demo login for the School Pulse school dashboard. Aggregated, anonymous student wellbeing insights only.",
      },
      { property: "og:title", content: "School Login — School Pulse" },
      {
        property: "og:description",
        content: "Sign in to the School Pulse demo dashboard with the provided demo credentials.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setError(null);
      signIn();
      navigate({ to: "/dashboard" });
      return;
    }
    setError("Incorrect email or password. Use the demo credentials shown below.");
  }

  function tryDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError(null);
    signIn();
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-brand-wash">
        <div className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 sm:py-20">
          <Card className="animate-fade-up gap-0 p-7 shadow-soft sm:p-9">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft">
              <ShieldCheck className="size-5 text-primary" />
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight">School Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo access to the aggregated school dashboard. No real accounts, no student data.
            </p>

            <form className="mt-6 space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="school@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="flex items-start gap-2 rounded-xl bg-destructive-soft p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full rounded-full shadow-glow">
                <LogIn className="size-4" /> Sign In
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="w-full rounded-full"
                onClick={tryDemo}
              >
                Try Demo Dashboard
              </Button>
            </form>

            <div className="mt-6 rounded-xl bg-muted p-4 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Demo credentials</p>
              <p className="mt-1">Email: {DEMO_EMAIL}</p>
              <p>Password: {DEMO_PASSWORD}</p>
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3 text-teal" /> Schools only ever see aggregated results.
            </p>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

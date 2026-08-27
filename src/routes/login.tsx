import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { isValidEmail, signIn, useDemoAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "School Login — School Pulse" },
      {
        name: "description",
        content:
          "Sign in to the School Pulse staff dashboard to view aggregated, anonymous student wellbeing insights.",
      },
      { property: "og:title", content: "School Login — School Pulse" },
      {
        property: "og:description",
        content: "Staff access to aggregated student wellbeing patterns — never individual answers.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const signedIn = useDemoAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (signedIn) navigate({ to: "/dashboard" });
  }, [signedIn, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Please enter your school email.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!password) next.password = "Please enter your password.";
    setFieldErrors(next);
    setError(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    const message = await signIn(email, password, remember);
    setLoading(false);
    if (message) {
      setError(message);
      return;
    }
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
              For school staff. The dashboard shows aggregated results only — never individual
              student responses.
            </p>

            <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="Enter your school email"
                  aria-invalid={!!fieldErrors.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={!!fieldErrors.password}
                    className="pr-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-destructive">{fieldErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(v) => setRemember(v === true)}
                    aria-label="Remember me"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  onClick={() =>
                    setError("Password recovery is not available in this prototype.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl bg-destructive-soft p-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-full shadow-glow"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" /> Log In
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <Lock className="size-3 shrink-0 text-teal" />
              Prototype sign-in. No student data and no passwords are stored.
            </p>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

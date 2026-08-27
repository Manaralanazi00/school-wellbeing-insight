import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { signOut, useDemoAuth } from "@/lib/auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/checkin", label: "Check-In" },
  { to: "/privacy", label: "Privacy" },
] as const;

export function SiteHeader() {
  const signedIn = useDemoAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        {signedIn ? (
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-full">
              <Link to="/dashboard">School Dashboard</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => signOut()}
              aria-label="Log out"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        ) : (
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link to="/login">School Login</Link>
          </Button>
        )}
      </div>

      <nav className="flex items-center gap-1 border-t border-border/70 px-4 py-2 sm:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="flex-1 rounded-full px-3 py-2 text-center text-sm font-medium text-muted-foreground"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo withTagline />
        <p className="text-xs text-muted-foreground">
          Prototype with fictional data. Not a medical or psychological diagnostic tool.
        </p>
      </div>
    </footer>
  );
}

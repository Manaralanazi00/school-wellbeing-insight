import { Lock, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function PrivacyChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal-soft px-3 py-1.5 text-xs font-medium text-foreground",
        className,
      )}
    >
      <Lock className="size-3.5 text-teal" />
      {children}
    </span>
  );
}

export function PrivacyProtectedButton({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal-soft px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-teal/15",
            className,
          )}
        >
          <Lock className="size-3.5 text-teal" />
          Privacy Protected
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-teal-soft">
            <ShieldCheck className="size-5 text-teal" />
          </div>
          <DialogTitle>Privacy Protected</DialogTitle>
          <DialogDescription className="text-left leading-relaxed">
            School Pulse only displays aggregated insights. Individual student identities and
            individual responses are not visible to school administrators.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• No names, emails, or device identifiers are stored with a response.</li>
          <li>• Groups with fewer than 10 responses are hidden entirely.</li>
          <li>• Insights are designed for prevention and support, not surveillance.</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

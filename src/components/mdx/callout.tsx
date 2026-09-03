import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

/**
 * Tokens, not palette colours.
 *
 * The system allows one accent, so info and success both take `primary` and
 * are told apart by their icon. Warning and error borrow `rss` and
 * `destructive`, the only other two hues the site defines -- adding a yellow
 * and a red here would have introduced two colours nothing else uses.
 */
const calloutConfig = {
  info: {
    icon: Info,
    className: "border-primary/40 bg-primary-soft text-muted-foreground",
    iconClassName: "text-primary",
  },
  success: {
    icon: CheckCircle,
    className: "border-primary/40 bg-primary-soft text-muted-foreground",
    iconClassName: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-rss/40 bg-background-soft text-muted-foreground",
    iconClassName: "text-rss",
  },
  error: {
    icon: AlertCircle,
    className: "border-destructive/40 bg-background-soft text-muted-foreground",
    iconClassName: "text-destructive",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border-l-4 p-4",
        config.className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClassName)} />
      <div className="flex-1">
        {title && <div className="mb-1 font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

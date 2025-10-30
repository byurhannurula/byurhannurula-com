import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error"
  title?: string
  children: React.ReactNode
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    iconClassName: "text-yellow-500",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300",
    iconClassName: "text-green-500",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-300",
    iconClassName: "text-red-500",
  },
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-lg border-l-4 p-4", config.className)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClassName)} />
      <div className="flex-1">
        {title && <div className="mb-1 font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

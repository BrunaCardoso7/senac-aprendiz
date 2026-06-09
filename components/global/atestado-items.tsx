import { CheckCircle2, Clock } from "lucide-react"

type AtestadoStatus = "aprovado" | "em-analise"

interface AtestadoItemProps {
  title: string
  description: string
  status: AtestadoStatus
}

const statusConfig = {
  aprovado: {
    label: "Aprovado",
    badge: "bg-green-100 text-green-700",
    iconWrap: "bg-green-50",
    icon: CheckCircle2,
    iconColor: "text-green-500",
  },
  "em-analise": {
    label: "Em análise",
    badge: "bg-amber-100 text-amber-700",
    iconWrap: "bg-amber-50",
    icon: Clock,
    iconColor: "text-amber-500",
  },
} as const

export function AtestadoItem({ title, description, status }: AtestadoItemProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex size-9 items-center justify-center rounded-lg ${config.iconWrap}`}>
          <Icon className={`size-5 ${config.iconColor}`} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${config.badge}`}>{config.label}</span>
    </div>
  )
}

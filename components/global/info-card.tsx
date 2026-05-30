import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfoCardProps {
  icon?: React.ReactNode
  title: string
  subtitle: string
  description: string
  variant?: "blue" | "orange"
  className?: string
}

export function InfoCard({
  icon,
  title,
  subtitle,
  description,
  variant = "blue",
  className,
}: InfoCardProps) {
  const colorClasses = {
    blue: {
      stripe: "bg-blue-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      title: "text-blue-600",
    },
    orange: {
      stripe: "bg-orange-500",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "text-orange-600",
    },
  }

  const colors = colorClasses[variant]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100",
        className
      )}
    >
      {/* Faixa lateral colorida */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", colors.stripe)} />

      <div className="p-6 pl-8">
        {/* Ícone */}
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
            colors.iconBg
          )}
        >
          {icon || <Shield className={cn("h-6 w-6", colors.iconColor)} />}
        </div>

        {/* Título */}
        <h3 className={cn("text-lg font-semibold", colors.title)}>{title}</h3>

        {/* Subtítulo */}
        <p className="mt-1 text-sm text-gray-700">{subtitle}</p>

        {/* Descrição */}
        <p className="mt-4 text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  )
}

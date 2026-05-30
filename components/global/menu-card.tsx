import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuCardProps {
  icon: LucideIcon
  title: string
  description: string
  iconColor: string      // ex: "text-emerald-500"
  iconBg: string         // ex: "bg-emerald-50"
  onClick?: () => void
}

export function MenuCard({ icon: Icon, title, description, iconColor, iconBg, onClick }: MenuCardProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-white hover:bg-gray-50 min-w-full rounded-2xl p-4 flex items-center gap-4 shadow-sm"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Button>
  )
}
'use client'
import { UserGreeting } from "./user-greeting"
import { NotificationBell } from "./notification-bell"
import { MonthlySummary } from "./monthly-summary"
import { DailyTip } from "./daily-tip"
import { LogOut } from "lucide-react"
import { Button } from "@base-ui/react"
import { useAuth } from "@/context/auth-context"
import { useResumoTransacaoQuery } from "@/hooks/transacao/use-resumo-transacao-query"
import Image from "next/image"

interface DashboardHeaderProps {
  dayOfMonth: number
  notificationCount: number
  dailyTip: string
}

export function DashboardHeader({
  dayOfMonth,
  notificationCount,
  dailyTip,
}: DashboardHeaderProps) {
  const { user, logout } = useAuth()

  const { data: resumo } = useResumoTransacaoQuery(user?.id)

  const balance = resumo?.saldo != null
    ? resumo.saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "—"

  return (
    <header className="rounded-bl-2xl rounded-br-2xl bg-[#1a6bb5] p-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="mx-auto mb-4 brightness-125 [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.6))]"
        />
      <div className="flex items-start justify-between">
        <UserGreeting dayOfMonth={dayOfMonth} userId={user?.id} />
        <Button
          className="hover:bg-blue-600 text-white font-bold p-2 rounded"
          onClick={() => logout()}
        >
          <LogOut className="text-white" />
        </Button>
      </div>

      <div className="mt-4">
        <MonthlySummary frequency={"-"} hours={"-"} balance={balance} />
      </div>

      <div className="mt-4">
        <DailyTip tip={dailyTip} />
      </div>
    </header>
  )
}
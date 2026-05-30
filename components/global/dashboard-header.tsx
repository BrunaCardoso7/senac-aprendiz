'use client'
import { UserGreeting } from "./user-greeting"
import { NotificationBell } from "./notification-bell"
import { MonthlySummary } from "./monthly-summary"
import { DailyTip } from "./daily-tip"
import { LogOut } from "lucide-react"
import { Button } from "@base-ui/react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

interface DashboardHeaderProps {
  dayOfMonth: number
  userId: string |undefined
  notificationCount: number
  frequency: string
  hours: string
  balance: string
  dailyTip: string
}

export function DashboardHeader({
  dayOfMonth,
  userId,
  notificationCount,
  frequency,
  hours,
  balance,
  dailyTip,
}: DashboardHeaderProps) {
  const {logout} = useAuth()
  return (
    <header className="rounded-bl-2xl rounded-br-2xl bg-blue-600 p-4">
      <div className="flex items-start justify-between">
        <UserGreeting dayOfMonth={dayOfMonth} userId={userId} />
        <Button className=" hover:bg-blue-700 text-white font-bold p-2 rounded" onClick={() => logout()}>
          <LogOut className="text-white" />
        </Button>
      </div>

      <div className="mt-4">
        <MonthlySummary frequency={frequency} hours={hours} balance={balance} />
      </div>

      <div className="mt-4">
        <DailyTip tip={dailyTip} />
      </div>
    </header>
  )
}

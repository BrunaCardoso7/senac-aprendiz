'use client'
import { useAuth } from "@/context/auth-context"

interface UserGreetingProps {
  dayOfMonth: number
  userId: string | undefined
}

export function UserGreeting({ dayOfMonth, userId }: UserGreetingProps) {
  const { user } = useAuth()
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-800">
        {dayOfMonth}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-blue-100">Olá,
          <span className="text-lg font-bold text-white"> {user?.name}</span>
        </span>
        <span className="text-xs text-white">{user?.matricula}</span>
      </div>
    </div>
  )
}

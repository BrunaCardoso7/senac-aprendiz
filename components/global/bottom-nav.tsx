"use client"

import { useState } from "react"
import { Home, DollarSign, Calendar, HelpCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "financas", label: "Finanças", icon: DollarSign },
  { id: "calendario", label: "Calendário", icon: Calendar },
  { id: "suporte", label: "Suporte", icon: HelpCircle },
  { id: "perfil", label: "Perfil", icon: User },
]

interface BottomNavProps {
  activeItem?: string
  onItemClick?: (id: string) => void
}

export function BottomNav({ activeItem = "home", onItemClick }: BottomNavProps) {
  const [active, setActive] = useState(activeItem)

  const handleClick = (id: string) => {
    setActive(id)
    onItemClick?.(id)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-lg transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 mb-1 transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

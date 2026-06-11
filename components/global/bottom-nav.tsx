"use client"

import { Home, DollarSign, FileCheck, HelpCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const navItems: NavItem[] = [
  { id: "home",       label: "Home",       icon: Home,       href: "/senac/home" },
  { id: "financas",   label: "Finanças",   icon: DollarSign, href: "/senac/financas" },
  { id: "documentos", label: "Documentos", icon: FileCheck,  href: "/senac/documentos" },
  { id: "suporte",    label: "Suporte",    icon: HelpCircle, href: "/senac/suporte" },
  { id: "perfil",     label: "Perfil",     icon: User,       href: "/senac/perfil" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              // área mínima de 48x48px recomendada pelo Google para toque
              className="flex flex-1 flex-col items-center justify-center gap-1 py-3 active:bg-gray-50"
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-medium leading-none transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Espaço para safe area no iPhone */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  )
}
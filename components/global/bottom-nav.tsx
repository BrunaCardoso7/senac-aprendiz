"use client"

import { Home, DollarSign, FileCheck, HelpCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string // 👈 adiciona o caminho
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) // 👈 compara com a rota atual
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
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
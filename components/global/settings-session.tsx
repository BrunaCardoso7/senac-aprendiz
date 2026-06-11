"use client"

import type { ComponentType } from "react"
import { ChevronRight, HelpCircle, LogOut, Moon, Settings, Shield, SquarePen } from "lucide-react"

interface SettingsSectionProps {
  onEditProfile: () => void
}

interface SettingItem {
  label: string
  icon: ComponentType<{ className?: string }>
  iconClass: string
  onClick?: () => void
}

export function SettingsSection({ onEditProfile }: SettingsSectionProps) {
  const items: SettingItem[] = [
    { label: "Editar Perfil", icon: SquarePen, iconClass: "bg-blue-50 text-blue-600", onClick: onEditProfile },
    // { label: "Modo Escuro", icon: Moon, iconClass: "bg-violet-50 text-violet-600" },
    // { label: "Configurações", icon: Settings, iconClass: "bg-muted text-muted-foreground" },
    { label: "Segurança da Conta", icon: Shield, iconClass: "bg-emerald-50 text-emerald-600" },
    { label: "Ajuda e Suporte", icon: HelpCircle, iconClass: "bg-amber-50 text-amber-600" },
  ]

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-foreground">Configurações</h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={item.onClick}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-left shadow-sm transition-colors hover:bg-muted/50"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconClass}`}>
                <item.icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-4 font-semibold text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="h-5 w-5" aria-hidden="true" />
        Sair da Conta
      </button>
    </section>
  )
}

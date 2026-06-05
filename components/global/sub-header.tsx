"use client"

import { ChevronLeft, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PageHeaderProps {
  title: string
  onBack?: () => void
}

export function SubHeader({ title, onBack }: PageHeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="fixed top-0 left-0 z-50 right-0 bg-[#1a6bb5] w-full">
      <div className="flex items-center gap-3 px-4 py-6 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">{title}</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-white hover:bg-blue-700"
          title="Sair"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

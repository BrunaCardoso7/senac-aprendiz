"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
  title: string
  onBack?: () => void
}

export function SubHeader({ title, onBack }: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header className="fixed top-0 left-0 z-50 right-0 bg-[#1a6bb5] w-full">
      <div className="flex items-center gap-3 px-4 py-6">
        <button
          onClick={handleBack}
          className="text-white hover:opacity-80 transition-opacity"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-lg font-semibold">{title}</h1>
      </div>
    </header>
  )
}

"use client"

import { SigninModal } from "@/components/global/signin-modal"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se usuário está logado, redireciona para /senac
    if (user && !isLoading) {
      router.push('/senac')
    }
  }, [user, isLoading, router])

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#1a6bb5] flex flex-col items-center gap-5 justify-center p-4">
        <p className="text-white">Carregando...</p>
      </main>
    )
  }

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#1a6bb5] flex flex-col items-center gap-5 justify-center p-4">
      <SigninModal/>
      <p className="font-light text-xs text-white">Seus dados estão protegidos e seguros!</p>
    </main>
  )
}

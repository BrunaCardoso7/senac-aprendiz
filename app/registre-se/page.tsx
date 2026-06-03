"use client"

import { SignupModal } from "@/components/global/signup-modal"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#1a6bb5] flex flex-col items-center gap-5 justify-center p-4">
      <SignupModal />
      <p className="font-light text-xs text-white">Seus dados estão protegidos e seguros!</p>
    </main>
  )
}

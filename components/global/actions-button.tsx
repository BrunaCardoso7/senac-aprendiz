"use client"
import { AlertCircle, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ActionButtons() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => router.push("/senac/denuncias")}
        className="flex flex-col items-center gap-2 rounded-xl bg-red-500 px-6 py-5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-red-600"
      >
        <AlertCircle className="size-6" />
        Fazer Denúncia
      </button>

      <button
        type="button"
        onClick={() => router.push("/senac/ajuda")}
        className="flex flex-col items-center gap-2 rounded-xl bg-blue-500 px-6 py-5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
      >
        <MessageCircle className="size-6" />
        Pedir Ajuda
      </button>
    </div>
  )
}
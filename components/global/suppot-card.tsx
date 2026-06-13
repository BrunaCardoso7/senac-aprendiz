"use client"
import { Button } from "@base-ui/react"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
export function SupportCard() {
  const router = useRouter()
  return (
    <section
      aria-labelledby="support-heading "
      className="mt-10 rounded-xl mb-24 border border-blue-200 bg-blue-50 px-5 py-5"
    >
      <div className="flex items-center gap-2">
        <MessageCircle className="size-5 text-blue-600" aria-hidden="true" />
        <h2 id="support-heading" className="text-base font-bold text-blue-950">
          Ainda tem dúvidas?
        </h2>
      </div>
      <p className="mt-1 text-sm text-blue-900/70">
        Nossa equipe está pronta para ajudar você. Entre em contato através do canal de apoio.
      </p>
      <Button
        onClick={() => router.push("/senac/ajuda")}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
      >
        Falar com Suporte
      </Button>
    </section>
  )
}

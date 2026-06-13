"use client"

import { useRouter } from "next/navigation"

export function HelpBanner() {
  const router = useRouter()
  return (
    <section
      aria-labelledby="help-banner-title !mb-32"
      className="flex flex-col gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-col gap-1">
        <h2 id="help-banner-title" className="text-base font-bold leading-tight">
          Precisa de Ajuda?
        </h2>
        <p className="text-sm leading-relaxed text-orange-50">
          Nossa equipe está pronta para esclarecer suas dúvidas sobre direitos trabalhistas.
        </p>
      </div>
      <button
        type="button"
        onClick={() => router.push("/senac/ajuda")}
        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500"
      >
        Falar com Suporte
      </button>
    </section>
  )
}

import { Heart } from "lucide-react"

export function SupportBanner() {
  return (
    <section
      aria-label="Mensagem de acolhimento"
      className="rounded-xl bg-gradient-to-r from-pink-600 to-fuchsia-500 px-6 py-5 text-primary-foreground shadow-sm"
    >
      <div className="flex items-center gap-3">
        <Heart className="size-6 shrink-0" aria-hidden="true" />
        <h2 className="text-lg font-bold tracking-tight">Estamos Aqui por Você</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-pink-50">
        Este é um espaço seguro e confidencial. Você não está sozinho e merece respeito no ambiente de trabalho.
      </p>
    </section>
  )
}

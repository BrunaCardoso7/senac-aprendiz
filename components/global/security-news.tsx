import { Shield } from "lucide-react"

export function SecurityNotice() {
  return (
    <section className="rounded-xl border border-blue-100 bg-blue-50 p-5 mb-24">
      <div className="flex items-center gap-2">
        <Shield className="size-5 text-[#1565d8]" aria-hidden="true" />
        <h2 className="text-sm font-bold text-[#0b4fa6]">Segurança dos Documentos</h2>
      </div>
      <p className="mt-2 text-sm text-[#1565d8]">
        Seus documentos são armazenados de forma segura e protegida. Apenas você e a equipe autorizada têm acesso.
      </p>
    </section>
  )
}

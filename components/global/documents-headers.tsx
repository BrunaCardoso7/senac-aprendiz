import { FileText } from "lucide-react"

export function DocumentsHeader() {
  return (
    <header className="rounded-2xl bg-[#1a6bb5] p-6 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <FileText className="size-7" aria-hidden="true" />
        <h1 className="text-xl font-bold tracking-tight">Meus Documentos</h1>
      </div>
      <p className="mt-2 text-sm text-blue-100">
        Gerencie seus documentos institucionais e envie atestados de forma rápida e segura.
      </p>
    </header>
  )
}

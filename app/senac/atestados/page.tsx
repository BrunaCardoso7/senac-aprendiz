// app/senac/atestados/page.tsx
"use client"

import { useState } from "react"
import { Search, FileText, Download, Clock, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { UploadButton } from "@/components/global/uploud-file"
import { useListAtestados } from "@/hooks/atestado/use-list-atestado"

const STATUS_CONFIG = {
  "em-analise": {
    label: "Em análise",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  "aprovado": {
    label: "Aprovado",
    icon: CheckCircle,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  "reprovado": {
    label: "Reprovado",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
} as const

type Status = keyof typeof STATUS_CONFIG

export default function AtestadosPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // debounce simples
  const handleSearch = (value: string) => {
    setSearch(value)
    clearTimeout((handleSearch as any)._timer)
    ;(handleSearch as any)._timer = setTimeout(() => {
      setDebouncedSearch(value)
    }, 400)
  }

  const { data: atestados = [], isLoading } = useListAtestados(user?.id, debouncedSearch)

  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Meus Atestados</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie seus atestados médicos enviados
          </p>
        </div>

        {/* Upload */}
        <UploadButton />

        {/* Barra de pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por título ou descrição..."
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-[#1a6bb5] focus:ring-2 focus:ring-[#1a6bb5]/20"
          />
        </div>

        {/* Lista */}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        ) : atestados.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card py-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              {search ? "Nenhum atestado encontrado" : "Nenhum atestado enviado ainda"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {atestados.map((atestado: {
              id: string
              titulo: string
              descricao?: string
              url: string
              status: Status
              createdAt: string
            }) => {
              const config = STATUS_CONFIG[atestado.status] ?? STATUS_CONFIG["em-analise"]
              const StatusIcon = config.icon

              return (
                <div
                  key={atestado.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <FileText className="size-5 text-[#1a6bb5]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {atestado.titulo}
                      </p>
                      {atestado.descricao && (
                        <p className="truncate text-xs text-muted-foreground">
                          {atestado.descricao}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(atestado.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 flex shrink-0 items-center gap-2">
                    {/* Badge de status */}
                    <span
                      className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${config.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>

                    <a
                      href={atestado.url}
                      download={atestado.titulo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-[#1a6bb5] transition hover:bg-blue-50"
                      aria-label={`Baixar ${atestado.titulo}`}
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
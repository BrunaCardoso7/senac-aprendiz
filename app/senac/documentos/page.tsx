"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, Upload, FileText, Download, Loader2 } from "lucide-react"
import { AtestadoItem } from "@/components/global/atestado-items"
import { DocumentsHeader } from "@/components/global/documents-headers"
import { SecurityNotice } from "@/components/global/security-news"
import { UploadButton } from "@/components/global/uploud-file"
import { useAuth } from "@/context/auth-context"
import { useRef, useState } from "react"
import { toast } from "sonner"

type DocumentoInstitucional = {
  title: string
  meta: string
  url?: string
}

const atestados = [
  {
    title: "Atestado de 20/05/2026",
    description: "Consulta médica",
    status: "aprovado" as const,
  },
  {
    title: "Atestado de 15/04/2026",
    description: "Exames laboratoriais",
    status: "em-analise" as const,
  },
]

const DOCUMENTOS_INICIAIS: DocumentoInstitucional[] = [
  { title: "Contrato de Aprendizagem", meta: "PDF • 15/01/2024" },
  { title: "Regulamento Interno", meta: "PDF • 15/01/2024" },
  { title: "Comprovante de Matrícula", meta: "PDF • 15/01/2024" },
]

export default function Page() {
  const router = useRouter()
  const { user } = useAuth()
  const [documentos, setDocumentos] = useState<DocumentoInstitucional[]>(DOCUMENTOS_INICIAIS)
  const [uploading, setUploading] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleUpload = async (title: string, file: File) => {
    if (!user?.id) return

    setUploading(title)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("userId", user.id)
      formData.append("descricao", title)

      const res = await fetch("/api/atestado/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setDocumentos((prev) =>
        prev.map((doc) =>
          doc.title === title
            ? { ...doc, url: data.url, meta: `PDF • ${new Date().toLocaleDateString("pt-BR")}` }
            : doc
        )
      )

      toast.success(`${title} enviado com sucesso!`)
    } catch {
      toast.error("Erro ao enviar documento.")
    } finally {
      setUploading(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <DocumentsHeader />
        <UploadButton />

        {/* Documentos Institucionais */}
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-foreground">
            Documentos Institucionais
          </h2>

          {documentos.map((doc) => (
            <div
              key={doc.title}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
            >
              {/* Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                  <FileText className="size-5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {doc.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{doc.meta}</p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex shrink-0 items-center gap-1 ml-3">
                {/* Download se tiver URL */}
                {doc.url && (
                  <a
                    href={doc.url}
                    download={doc.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-lg text-[#1a6bb5] transition hover:bg-blue-50"
                    aria-label={`Baixar ${doc.title}`}
                  >
                    <Download className="size-4" />
                  </a>
                )}

                {/* Upload */}
                <button
                  type="button"
                  onClick={() => inputRefs.current[doc.title]?.click()}
                  disabled={uploading === doc.title}
                  className={`flex size-8 items-center justify-center rounded-lg transition ${
                    doc.url
                      ? "text-green-600 hover:bg-green-50"
                      : "text-[#1a6bb5] hover:bg-blue-50"
                  } disabled:opacity-50`}
                  aria-label={`Enviar ${doc.title}`}
                >
                  {uploading === doc.title ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </button>

                {/* Input hidden por documento */}
                <input
                  ref={(el) => { inputRefs.current[doc.title] = el }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleUpload(doc.title, file)
                    e.target.value = ""
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Atestados */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Atestados Enviados</h2>
            <button
              type="button"
              onClick={() => router.push("/senac/atestados")}
              className="flex items-center gap-1 text-sm font-medium text-[#1a6bb5] hover:underline"
            >
              Ver todos
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {atestados.map((item) => (
            <AtestadoItem
              key={item.title}
              title={item.title}
              description={item.description}
              status={item.status}
            />
          ))}
        </section>

        <SecurityNotice />
      </div>
    </main>
  )
}
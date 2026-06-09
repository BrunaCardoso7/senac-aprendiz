import { AtestadoItem } from "@/components/global/atestado-items"
import { DocumentItem } from "@/components/global/document-items"
import { DocumentsHeader } from "@/components/global/documents-headers"
import { SecurityNotice } from "@/components/global/security-news"
import { UploadButton } from "@/components/global/uploud-file"

const documentosInstitucionais = [
  { title: "Contrato de Aprendizagem", meta: "PDF • 245 KB • 15/01/2024" },
  { title: "Regulamento Interno", meta: "PDF • 180 KB • 15/01/2024" },
  { title: "Comprovante de Matrícula", meta: "PDF • 95 KB • 15/01/2024" },
]

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

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-6 pt-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <DocumentsHeader />

        <UploadButton />

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-foreground">Documentos Institucionais</h2>
          {documentosInstitucionais.map((doc) => (
            <DocumentItem key={doc.title} title={doc.title} meta={doc.meta} />
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-foreground">Atestados Enviados</h2>
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

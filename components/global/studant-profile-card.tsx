"use client"

import { Building2, FileText } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface Contrato {
  empresa: string
  unidade?: string | null
  curso: string
  inicio: Date
  final: Date
}

interface StudentProfileCardProps {
  badge?: string
  data?: Contrato | null
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatDate(date?: Date | null) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("pt-BR")
}

export function StudentProfileCard({
  badge = "Jovem Aprendiz Senac",
  data,
}: StudentProfileCardProps) {
  const { user } = useAuth() // ← nome e matrícula vêm daqui

  const nome = user?.name ?? "Aprendiz"
  const matricula = user?.matricula ?? "—"

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 p-4">
      <header className="rounded-2xl bg-gradient-to-b from-[oklch(0.5_0.12_255)] to-[oklch(0.42_0.14_255)] px-6 py-8 text-center text-white shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md">
          <span className="text-2xl font-bold text-[oklch(0.42_0.14_255)]">
            {getInitials(nome)}
          </span>
        </div>
        <h1 className="mt-4 text-pretty text-2xl font-bold">{nome}</h1>
        <p className="mt-1 text-sm text-white/80">Matrícula: {matricula}</p>
        <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
          {badge}
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[oklch(0.42_0.14_255)]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-card-foreground">Informações do Contrato</h2>
        </div>

        {data ? (
          <dl className="mt-5 divide-y divide-border">
            <InfoRow label="Empresa Contratante" value={data.empresa} icon />
            <InfoRow label="Unidade Senac" value={data.unidade ?? "—"} />
            <InfoRow label="Curso" value={data.curso} />
            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Início</dt>
                <dd className="mt-0.5 font-semibold text-card-foreground">{formatDate(data.inicio)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Término</dt>
                <dd className="mt-0.5 font-semibold text-card-foreground">{formatDate(data.final)}</dd>
              </div>
            </div>
          </dl>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground">Nenhum contrato cadastrado.</p>
        )}
      </section>
    </div>
  )
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="py-4">
      <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {icon && <Building2 className="h-3.5 w-3.5" aria-hidden="true" />}
        {label}
      </dt>
      <dd className="mt-0.5 font-semibold text-card-foreground">{value}</dd>
    </div>
  )
}
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  DollarSign,
  Calendar,
  Briefcase,
  Clock,
  ShieldCheck,
  Users,
  CalendarDays,
  type LucideIcon,
} from "lucide-react"
import { PerguntasFrequentes } from "./perguntas-frequentes"
import { HelpBanner } from "./helper-banner"

type Direito = {
  titulo: string
  descricao: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  rota: string
}

const direitos: Direito[] = [
  {
    titulo: "FGTS",
    descricao: "Direito a 2% do FGTS depositado mensalmente em sua conta",
    icon: DollarSign,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    rota: "/senac/financas",
  },
  {
    titulo: "Férias",
    descricao:
      "30 dias de férias anuais remuneradas, preferencialmente durante as férias escolares",
    icon: Calendar,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    rota: "/senac/seus-direitos",
  },
  {
    titulo: "Salário",
    descricao: "Salário mínimo/hora garantido conforme legislação vigente",
    icon: DollarSign,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    rota: "/senac/financas",
  },
  {
    titulo: "Vale-Transporte",
    descricao: "Direito ao vale-transporte para deslocamento casa-trabalho-escola",
    icon: Briefcase,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    rota: "/senac/documentos",
  },
  {
    titulo: "Jornada de Trabalho",
    descricao: "Máximo de 6 horas diárias. Teoria + prática não pode exceder 8 horas",
    icon: Clock,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    rota: "/senac/seus-direitos",
  },
  {
    titulo: "13º Salário",
    descricao: "Direito ao 13º salário proporcional ao tempo trabalhado",
    icon: ShieldCheck,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    rota: "/senac/financas",
  },
  {
    titulo: "Registro em Carteira",
    descricao: "Contrato deve ser registrado na CTPS com anotação de aprendiz",
    icon: Users,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    rota: "/senac/documentos",
  },
  {
    titulo: "Trabalho em Feriados",
    descricao: "Folga em feriados nacionais e descanso semanal remunerado",
    icon: CalendarDays,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    rota: "/senac/seus-direitos",
  },
]

export function DireitosAprendiz() {
  const [busca, setBusca] = useState("")
  const router = useRouter()

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return direitos
    return direitos.filter(
      (d) =>
        d.titulo.toLowerCase().includes(termo) ||
        d.descricao.toLowerCase().includes(termo),
    )
  }, [busca])

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-24">
      {/* Cabeçalho azul */}
      <header className="rounded-2xl bg-[#1a6bb5] px-6 py-5 text-white shadow-sm">
        <h1 className="text-lg font-bold leading-tight">Lei da Aprendizagem</h1>
        <p className="mt-1 text-sm text-blue-50">
          Você está protegido pela Lei 10.097/2000. Conheça todos os seus direitos como
          jovem aprendiz.
        </p>
      </header>

      {/* Busca */}
      <div className="relative mt-6">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar direitos..."
          aria-label="Buscar direitos"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Lista */}
      <section className="mt-6" aria-labelledby="titulo-direitos">
        <h2 id="titulo-direitos" className="mb-3 text-base font-bold text-foreground">
          Seus Direitos
        </h2>

        {filtrados.length === 0 ? (
          <p className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
            Nenhum direito encontrado para "{busca}".
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {filtrados.map((direito) => {
              const Icon = direito.icon
              return (
                <li key={direito.titulo}>
                  <button
                    onClick={() => router.push(direito.rota)}
                    className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition hover:shadow-md hover:border-blue-300 cursor-pointer text-left"
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${direito.iconBg}`}
                    >
                      <Icon className={`size-5 ${direito.iconColor}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">
                        {direito.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground">{direito.descricao}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
        <PerguntasFrequentes />
        <HelpBanner />
      </section>
    </div>
  )
}
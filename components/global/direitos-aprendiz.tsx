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
  BookOpen,
  Loader2,
  Sparkles,
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

type AIResult = {
  answer: string
  loading: boolean
  searched: boolean
}

const direitos: Direito[] = [
  {
    titulo: "FGTS",
    descricao: "Direito a 2% do FGTS depositado mensalmente em sua conta",
    icon: DollarSign,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    rota: "",
  },
  {
    titulo: "Férias",
    descricao: "30 dias de férias anuais remuneradas, preferencialmente durante as férias escolares",
    icon: Calendar,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    rota: "",
  },
  {
    titulo: "Salário",
    descricao: "Salário mínimo/hora garantido conforme legislação vigente",
    icon: DollarSign,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    rota: "",
  },
  {
    titulo: "Vale-Transporte",
    descricao: "Direito ao vale-transporte para deslocamento casa-trabalho-escola",
    icon: Briefcase,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    rota: "",
  },
  {
    titulo: "Jornada de Trabalho",
    descricao: "Máximo de 6 horas diárias. Teoria + prática não pode exceder 8 horas",
    icon: Clock,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    rota: "",
  },
  {
    titulo: "13º Salário",
    descricao: "Direito ao 13º salário proporcional ao tempo trabalhado",
    icon: ShieldCheck,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    rota: "",
  },
  {
    titulo: "Registro em Carteira",
    descricao: "Contrato deve ser registrado na CTPS com anotação de aprendiz",
    icon: Users,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    rota: "",
  },
  {
    titulo: "Trabalho em Feriados",
    descricao: "Folga em feriados nacionais e descanso semanal remunerado",
    icon: CalendarDays,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    rota: "",
  },
]

export function DireitosAprendiz() {
  const [busca, setBusca] = useState("")
  const [aiResult, setAiResult] = useState<AIResult>({
    answer: "",
    loading: false,
    searched: false,
  })
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

  const isSearching = busca.trim() !== ""
  const temResultadosLocais = filtrados.length > 0 && isSearching

  async function handleAISearch() {
    if (!busca.trim() || aiResult.loading) return

    setAiResult({ answer: "", loading: true, searched: false })

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: busca }],
        }),
      })
      const data = await res.json()
      setAiResult({ answer: data.answer, loading: false, searched: true })
    } catch {
      setAiResult({
        answer: "Não foi possível consultar o manual agora.",
        loading: false,
        searched: true,
      })
    }
  }

  function handleBuscaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBusca(e.target.value)
    setAiResult({ answer: "", loading: false, searched: false })
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-24">
      {/* Cabeçalho */}
      <header className="rounded-2xl bg-[#1a6bb5] px-6 py-5 text-white shadow-sm">
        <h1 className="text-lg font-bold leading-tight">Lei da Aprendizagem</h1>
        <p className="mt-1 text-sm text-blue-50">
          Você está protegido pela Lei 10.097/2000. Conheça todos os seus direitos como jovem aprendiz.
        </p>
      </header>

      {/* Busca + botão IA */}
      <div className="mt-6 flex gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={busca}
            onChange={handleBuscaChange}
            onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
            placeholder="Buscar direitos..."
            aria-label="Buscar direitos"
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          onClick={handleAISearch}
          disabled={!busca.trim() || aiResult.loading}
          className="flex items-center gap-2 rounded-xl bg-[#1a6bb5] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1559a0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aiResult.loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          <span className="hidden sm:inline">Consultar Manual</span>
        </button>
      </div>

      {/* Conteúdo */}
      <section className="mt-6" aria-labelledby="titulo-direitos">
        <h2 id="titulo-direitos" className="mb-3 text-base font-bold text-foreground">
          Seus Direitos
        </h2>

        {/* Card resposta IA */}
        {isSearching && (aiResult.loading || aiResult.searched) && (
          <div className={`mb-4 rounded-2xl border p-4 ${
            temResultadosLocais
              ? "border-blue-200 bg-blue-50"
              : "border-[#1a6bb5]/20 bg-blue-50"
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1a6bb5]/10">
                {aiResult.loading ? (
                  <Loader2 className="size-4 animate-spin text-[#1a6bb5]" />
                ) : (
                  <BookOpen className="size-4 text-[#1a6bb5]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1a6bb5]">
                    Manual da Aprendizagem Profissional
                  </span>
                  <span className="rounded-full bg-[#1a6bb5]/10 px-2 py-0.5 text-[10px] font-medium text-[#1a6bb5]">
                    MTE 2024
                  </span>
                </div>
                {aiResult.loading ? (
                  <p className="text-sm text-muted-foreground">Consultando o manual…</p>
                ) : (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                    {aiResult.answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dica quando está buscando mas ainda não consultou */}
        {isSearching && !aiResult.loading && !aiResult.searched && (
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Não encontrou o que procura? Clique em{" "}
            <span className="font-medium text-[#1a6bb5]">Consultar Manual</span> para
            buscar no documento oficial do MTE.
          </p>
        )}

        {/* Lista de direitos */}
        {!isSearching || temResultadosLocais ? (
          filtrados.length === 0 ? (
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
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${direito.iconBg}`}>
                        <Icon className={`size-5 ${direito.iconColor}`} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{direito.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{direito.descricao}</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        ) : null}

        <PerguntasFrequentes />
        <HelpBanner />
      </section>
    </div>
  )
}
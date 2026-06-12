// app/senac/suporte/page.tsx
"use client"

import { useMemo, useState } from "react"
import { Search, HelpCircle, Loader2, BookOpen, Sparkles } from "lucide-react"
import { FaqAccordionItem } from "@/components/global/faq-accordion"
import { faqData } from "@/lib/duvidas"
import { SupportCard } from "@/components/global/suppot-card"

type AIResult = {
  answer: string
  loading: boolean
  searched: boolean
}

export default function SuportePage() {
  const [query, setQuery] = useState("")
  const [aiResult, setAiResult] = useState<AIResult>({
    answer: "",
    loading: false,
    searched: false,
  })

  const filteredData = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return faqData
    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [query])

  const hasMockResults = filteredData.length > 0 && query.trim() !== ""
  const isSearching = query.trim() !== ""

  async function handleAISearch() {
    if (!query.trim() || aiResult.loading) return

    setAiResult({ answer: "", loading: true, searched: false })

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }],
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

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setAiResult({ answer: "", loading: false, searched: false })
  }

  return (
    <>
      <header className="mx-auto max-w-4xl rounded-2xl bg-[#f97316] px-4 text-white sm:px-6">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="size-7" aria-hidden="true" />
            <h1 className="text-xl font-bold tracking-tight">Central de Ajuda</h1>
          </div>
          <p className="mt-2 text-sm text-orange-50">
            Encontre respostas rápidas para as dúvidas mais comuns sobre o programa de aprendizagem.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
              placeholder="Buscar dúvidas..."
              aria-label="Buscar dúvidas"
              className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/30"
            />
          </div>

          <button
            onClick={handleAISearch}
            disabled={!query.trim() || aiResult.loading}
            className="flex items-center gap-2 rounded-lg bg-[#1a6bb5] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1559a0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {aiResult.loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            <span className="hidden sm:inline">Consultar no Manual</span>
          </button>
        </div>

        <div className="my-4 flex flex-col gap-6">
          {!isSearching &&
            faqData.map((category) => (
              <section key={category.category}>
                <h2 className="text-base font-bold text-foreground">{category.category}</h2>
                <div className="my-3 flex flex-col gap-3">
                  {category.items.map((item, index) => (
                    <FaqAccordionItem
                      key={item.title}
                      item={item}
                      defaultOpen={index === 0 && category === faqData[0]}
                    />
                  ))}
                </div>
              </section>
            ))}

          {isSearching && (
            <>
              {/* Card da IA — aparece primeiro */}
              {(aiResult.loading || aiResult.searched) && (
                <section>
                  <div
                    className={`rounded-2xl border p-4 ${
                      hasMockResults
                        ? "border-orange-200 bg-orange-50"
                        : "border-[#1a6bb5]/20 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                          hasMockResults ? "bg-orange-100" : "bg-[#1a6bb5]/10"
                        }`}
                      >
                        {aiResult.loading ? (
                          <Loader2
                            className={`size-4 animate-spin ${
                              hasMockResults ? "text-orange-600" : "text-[#1a6bb5]"
                            }`}
                          />
                        ) : (
                          <BookOpen
                            className={`size-4 ${
                              hasMockResults ? "text-orange-600" : "text-[#1a6bb5]"
                            }`}
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold ${
                              hasMockResults ? "text-orange-700" : "text-[#1a6bb5]"
                            }`}
                          >
                            Manual da Aprendizagem Profissional
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              hasMockResults
                                ? "bg-orange-200 text-orange-800"
                                : "bg-[#1a6bb5]/10 text-[#1a6bb5]"
                            }`}
                          >
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
                </section>
              )}

              {/* Dica para consultar — quando ainda não consultou */}
              {!aiResult.loading && !aiResult.searched && (
                <p className="text-center text-xs text-muted-foreground">
                  Não encontrou o que procura? Clique em{" "}
                  <span className="font-medium text-[#1a6bb5]">Consultar no Manual</span> para
                  buscar no documento oficial do MTE.
                </p>
              )}

              {/* Resultados do FAQ */}
              {hasMockResults &&
                filteredData.map((category) => (
                  <section key={category.category}>
                    <h2 className="text-base font-bold text-foreground">{category.category}</h2>
                    <div className="my-3 flex flex-col gap-3">
                      {category.items.map((item) => (
                        <FaqAccordionItem key={item.title} item={item} defaultOpen={false} />
                      ))}
                    </div>
                  </section>
                ))}
            </>
          )}
        </div>

        <SupportCard />
      </div>
    </>
  )
}
"use client"

import { useMemo, useState } from "react"
import { Search, HelpCircle } from "lucide-react"
import { FaqAccordionItem } from "./faq-accordion"
import { faqData } from "@/lib/duvidas"
import { SupportCard } from "./suppot-card"

export function HelpCenter() {
  const [query, setQuery] = useState("")

  const filteredData = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return faqData

    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [query])

  return (
    <>
      {/* Header */}
      <header className="bg-[#f97316] text-white rounded-2xl mx-auto max-w-4xl px-4 sm:px-6">
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
        {/* Search */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar dúvidas..."
            aria-label="Buscar dúvidas"
            className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/30"
          />
        </div>

        {/* Categories */}
        <div className="my-4 flex flex-col gap-8">
          {filteredData.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Nenhuma dúvida encontrada para {`"${query}"`}.
            </p>
          ) : (
            filteredData.map((category) => (
              <section key={category.category}>
                <h2 className="text-base font-bold text-foreground">{category.category}</h2>
                <div className="flex flex-col gap-3 my-3">
                  {category.items.map((item, index) => (
                    <FaqAccordionItem
                      key={item.title}
                      item={item}
                      defaultOpen={category === filteredData[0] && index === 0 && !query}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
        <SupportCard />
      </div>
    </>
  )
}

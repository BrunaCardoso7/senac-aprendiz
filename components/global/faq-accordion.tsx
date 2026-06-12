"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FaqItem } from "@/lib/duvidas";

export function FaqAccordionItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-accent/40"
      >
        <span className="text-sm font-semibold text-card-foreground">{item.title}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="border-t border-border bg-secondary px-4 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      )}
    </div>
  )
}

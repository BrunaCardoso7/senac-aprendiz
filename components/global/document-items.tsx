"use client"

import { Download, FileText } from "lucide-react"

interface DocumentItemProps {
  title: string
  meta: string
}

export function DocumentItem({ title, meta }: DocumentItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-red-50">
          <FileText className="size-5 text-red-500" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{meta}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label={`Baixar ${title}`}
        className="rounded-lg p-2 text-[#1565d8] transition-colors hover:bg-blue-50"
      >
        <Download className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}

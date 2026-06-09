"use client"

import { Upload } from "lucide-react"

export function UploadButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f26b1d] px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#e25f15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26b1d] focus-visible:ring-offset-2"
    >
      <Upload className="size-5" aria-hidden="true" />
      Enviar Atestado Médico
    </button>
  )
}

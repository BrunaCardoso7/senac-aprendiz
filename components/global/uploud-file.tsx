"use client"

import { Upload } from "lucide-react"
import { useRef, useState } from "react"
import { X, FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { useUploadAtestadoMutation } from "@/hooks/atestado/use-upload-atestado-mutation"

export function UploadButton() {
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [descricao, setDescricao] = useState("")

  const mutation = useUploadAtestadoMutation()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleUpload = () => {
    if (!selectedFile || !user?.id) return

    mutation.mutate(
      { file: selectedFile, userId: user.id, descricao },
      {
        onSuccess: () => {
          toast.success("Atestado enviado com sucesso!")
          setSelectedFile(null)
          setDescricao("")
          if (inputRef.current) inputRef.current.value = ""
        },
        onError: () => toast.error("Erro ao enviar atestado."),
      }
    )
  }

  return (
    <>
      {/* Botão principal — abre o seletor de arquivo */}
      {!selectedFile && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f26b1d] px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#e25f15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26b1d] focus-visible:ring-offset-2"
        >
          <Upload className="size-5" aria-hidden="true" />
          Enviar Atestado Médico
        </button>
      )}

      {/* Painel expandido após selecionar arquivo */}
      {selectedFile && (
        <div className="flex flex-col gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
          {/* Preview */}
          <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-white px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-[#f26b1d]" />
              <span className="truncate text-sm text-gray-700">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
              className="ml-2 shrink-0 text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Descrição */}
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição (ex: consulta médica)"
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#f26b1d]"
          />

          {/* Ações */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
              className="h-11 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={mutation.isPending}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#f26b1d] text-sm font-semibold text-white transition hover:bg-[#e25f15] disabled:opacity-60"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Confirmar envio
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  )
}
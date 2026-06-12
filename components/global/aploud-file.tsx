// @/components/global/uploud-file.tsx
"use client"

import { useRef, useState } from "react"
import { Upload, X, FileText, Loader2 } from "lucide-react"
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
        onError: () => {
          toast.error("Erro ao enviar atestado.")
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4">
      <div className="flex items-center gap-3">
        <Upload className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium text-blue-700">Enviar Atestado</span>
      </div>

      {!selectedFile ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-blue-300 bg-white text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:bg-blue-100"
        >
          Selecionar arquivo
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Preview do arquivo */}
          <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-white px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-4 w-4 shrink-0 text-blue-500" />
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

          {/* Descrição opcional */}
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição (ex: consulta médica)"
            className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-400"
          />

          {/* Botão enviar */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={mutation.isPending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1a6bb5] text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Enviar atestado
              </>
            )}
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
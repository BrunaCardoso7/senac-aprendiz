"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"


// Tipo que reflete o contrato vindo do banco/query
type Contrato = {
  id: string
  empresa: string
  unidade?: string | null
  curso: string
  inicio: Date
  final: Date
}

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  contrato?: Contrato | null
}
interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  contrato?: Contrato | null
  onSuccess?: () => void  // ← adicionar
}

export function EditProfileModal({
  open,
  onClose,
  contrato,
  onSuccess, // ← receber
}: EditProfileModalProps) {
  
const {
  form: { register, handleSubmit, reset, formState: { errors } },
  onSubmit,
  isLoading,
} = useContratoForm({ contrato, onSuccess })

// ← adiciona isso temporariamente
console.log("errors", errors)

  // Reseta o formulário sempre que o modal abre com um contrato diferente
useEffect(() => {
  if (open) {
    reset({
      empresa: contrato?.empresa ?? "",
      unidade: contrato?.unidade ?? "",
      curso: contrato?.curso ?? "",
      inicio: contrato?.inicio ?? new Date(),
      final: contrato?.final ?? new Date(),
    })
  }
}, [open, contrato, reset])
  // Fecha com ESC e bloqueia scroll do body
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  // Fecha o modal após salvar com sucesso — passamos um wrapper que chama
  // onSubmit do hook e, se não lançar, fecha o modal.
  const handleSave = handleSubmit((values) => {
    onSubmit(values) // dispara a mutation; os toasts ficam no hook
    // O onClose ideal fica no onSuccess da mutation — veja nota abaixo
  })

  return (
    <div
      className="fixed inset-0 z-50 px-4 flex items-end justify-center bg-foreground/40  sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card shadow-xl sm:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2
            id="edit-profile-title"
            className="text-lg font-bold text-card-foreground"
          >
            {contrato?.id ? "Editar Contrato" : "Novo Contrato"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSave} className="space-y-5 px-6 py-5">
          <div className="space-y-4 border-t border-border pt-5">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Informações do Contrato
            </h3>

            <Field
              label="Empresa Contratante"
              error={errors.empresa?.message}
              {...register("empresa")}
            />

            <Field
              label="Unidade Senac"
              error={errors.unidade?.message}
              {...register("unidade")}
            />

            <Field
              label="Curso"
              error={errors.curso?.message}
              {...register("curso")}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Datas: RHF trabalha com Date, o input precisa de string ISO */}
              <Field
                label="Início"
                type="date"
                error={errors.inicio?.message}
                {...register("inicio", {
                  setValueAs: (v: string) => (v ? new Date(v) : new Date()),
                })}
              />
              <Field
                label="Término"
                type="date"
                error={errors.final?.message}
                {...register("final", {
                  setValueAs: (v: string) => (v ? new Date(v) : new Date()),
                })}
              />
            </div>
          </div>

         <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-blue-500 text-base font-semibold text-white hover:bg-blue-600 active:bg-blue-700"
          >
            {isLoading ? "Salvando…" : "Salvar alterações"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            Cancelar
          </Button>
        </div>  
        </form>
      </div>
    </div>
  )
}

// ── Field com suporte a mensagem de erro ─────────────────────────────
import { forwardRef } from "react"
import useContratoForm from "@/hooks/contrato/use-contrato-form"

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, ...props }, ref) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-card-foreground">
        {label}
      </span>
      <input
        ref={ref}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[oklch(0.42_0.14_255)] focus:ring-2 focus:ring-[oklch(0.42_0.14_255)]/20 aria-[invalid=true]:border-red-400"
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </label>
  )
)
Field.displayName = "Field"
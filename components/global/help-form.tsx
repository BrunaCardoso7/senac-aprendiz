// help-form.tsx
"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useAjudaForm from "@/hooks/ajuda/use-ajuda-form"

const BLUE = "#1a6bb5"

type HelpFormProps = {
  onBack?: () => void
  onSuccess?: () => void
}

export function HelpForm({ onBack, onSuccess }: HelpFormProps) {
  const {
    form: { register, handleSubmit, formState: { errors } },
    onSubmit,
    isLoading,
  } = useAjudaForm({ onSuccess })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-5xl">

      {/* Cabeçalho */}
      <div
        className="mb-6 rounded-xl border px-6 py-4"
        style={{ borderColor: `${BLUE}33`, backgroundColor: `${BLUE}0d` }}
      >
        <h1 className="text-lg font-semibold" style={{ color: BLUE }}>
          Formulário de Ajuda
        </h1>
      </div>

      {/* Nome */}
      <div className="mb-5 space-y-2">
        <Label>Seu nome</Label>
        <Input
          placeholder="Como podemos te chamar?"
          {...register("nome")}
        />
        {errors.nome && (
          <span className="text-xs text-red-500">{errors.nome.message}</span>
        )}
      </div>

      {/* Descrição */}
      <div className="mb-5 space-y-2">
        <Label>Descrição do problema</Label>
        <Textarea
          rows={5}
          placeholder="Descreva o que está acontecendo. Estamos aqui para ajudar."
          {...register("descricao")}
        />
        {errors.descricao && (
          <span className="text-xs text-red-500">{errors.descricao.message}</span>
        )}
      </div>

      {/* Aviso */}
      <div
        className="mb-6 rounded-md border px-4 py-3 text-sm"
        style={{
          borderColor: `${BLUE}33`,
          backgroundColor: `${BLUE}0d`,
          color: BLUE,
        }}
      >
        Seu pedido será recebido pela equipe de suporte. Entraremos em contato em breve.
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-xl text-base font-semibold text-white"
          style={{ backgroundColor: isLoading ? `${BLUE}99` : BLUE }}
        >
          <Send className="mr-2 h-4 w-4" />
          {isLoading ? "Enviando…" : "Enviar Pedido"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="h-12 w-full rounded-xl text-base font-semibold"
        >
          Voltar
        </Button>
      </div>
    </form>
  )
}
// report-form.tsx
"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller } from "react-hook-form"
import useDenunciaForm from "@/hooks/denuncia/use-denuncia-form"

const PINK = "#E91E8C"

type ReportFormProps = {
  onBack?: () => void
  onSuccess?: () => void
}

export function ReportForm({ onBack, onSuccess }: ReportFormProps) {
  const {
    form: { register, handleSubmit, control, formState: { errors } },
    onSubmit,
    isLoading,
  } = useDenunciaForm({ onSuccess })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-5xl">

      {/* Cabeçalho — borda e texto rosa */}
      <div
        className="mb-6 rounded-xl border px-6 py-4"
        style={{ borderColor: `${PINK}33`, backgroundColor: `${PINK}0d` }}
      >
        <h1 className="text-lg font-semibold" style={{ color: PINK }}>
          Formulário de Denúncia
        </h1>
      </div>

      {/* Categoria */}
      <div className="mb-5 space-y-2">
        <Label>Categoria do Problema</Label>
        <Controller
          control={control}
          name="categoria"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assedio">Assédio Moral</SelectItem>
                <SelectItem value="assedio">Assédio Sexual</SelectItem>
                <SelectItem value="discriminacao">Abuso psicológico</SelectItem>
                <SelectItem value="discriminacao">Discriminação</SelectItem>
                <SelectItem value="fraude">Exploração no trabalho</SelectItem>
                <SelectItem value="seguranca">Segurança no trabalho</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoria && (
          <span className="text-xs text-red-500">{errors.categoria.message}</span>
        )}
      </div>

      {/* Data */}
      <div className="mb-5 space-y-2">
        <Label>Data do Ocorrido</Label>
        <Input
          type="date"
          {...register("dataOcorido", {
            setValueAs: (v: string) => (v ? new Date(v) : new Date()),
          })}
        />
        {errors.dataOcorido && (
          <span className="text-xs text-red-500">{errors.dataOcorido.message}</span>
        )}
      </div>

      {/* Descrição */}
      <div className="mb-5 space-y-2">
        <Label>Descreva o que aconteceu</Label>
        <Textarea
          rows={5}
          placeholder="Conte o que aconteceu com o máximo de detalhes possível. Você está seguro aqui."
          {...register("descricao")}
        />
        {errors.descricao && (
          <span className="text-xs text-red-500">{errors.descricao.message}</span>
        )}
      </div>

      {/* Testemunhas */}
      <div className="mb-5 space-y-2">
        <Label>Houve testemunhas?</Label>
        <Input
          placeholder="Nome das testemunhas (opcional)"
          {...register("testemunhas")}
        />
      </div>

      {/* Aviso */}
      <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Sua denúncia será enviada de forma segura e confidencial para a equipe responsável.
        Você receberá acompanhamento em até 24 horas.
      </div>

      {/* Botões */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button type="button" variant="outline" className="h-11" onClick={onBack}>
          Voltar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 text-white"
          style={{
            backgroundColor: isLoading ? `${PINK}99` : PINK,
          }}
        >
          <Send className="mr-2 h-4 w-4" />
          {isLoading ? "Enviando…" : "Enviar Denúncia"}
        </Button>
      </div>
    </form>
  )
}
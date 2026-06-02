"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tag, DollarSign, Calendar, FileText } from "lucide-react"
import { useTransactionModal } from "@/context/modal-context-finance"
import useTransacaoForm from "@/hooks/transacao/use-transacao-create"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddTransactionModal() {
  const { isOpen, closeModal } = useTransactionModal()

  const { form, onSubmit, isLoading } = useTransacaoForm()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form

  const transactionType = watch("tipo_transacao")
  const [valorDisplay, setValorDisplay] = useState("")
  const handleMoneyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "")

    const value = Number(onlyNumbers) / 100

    setValorDisplay(
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )

    setValue("valor", value)
  }

  useEffect(() => {
    setValue("tipo_transacao", "ENTRADA")
  }, [setValue])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Adicionar Transação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Tipo de Transação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Tipo de Transação
            </Label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setValue("tipo_transacao", "ENTRADA", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  transactionType === "ENTRADA"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                💰 Receita
              </button>

              <button
                type="button"
                onClick={() =>
                  setValue("tipo_transacao", "SAIDA", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  transactionType === "SAIDA"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                💸 Despesa
              </button>
            </div>

            <input type="hidden" {...register("tipo_transacao")} />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <Select>
                <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <SelectTrigger {...register("categoria")} className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecione uma categoria:</SelectLabel>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="lazer">Lazer</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="moradia">Moradia</SelectItem>
                    <SelectItem value="compras">Compras</SelectItem>
                    <SelectItem value="outras">Outras</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {errors.categoria && (
              <p className="text-sm text-red-500">{errors.categoria.message as string}</p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Valor <span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={valorDisplay}
                onChange={handleMoneyChange}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {errors.valor && (
              <p className="text-sm text-red-500">{errors.valor.message as string}</p>
            )}
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Data</Label>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                {...register("data")}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Descrição (opcional)
            </Label>

            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Adicione detalhes sobre esta transação..."
                {...register("descricao")}
                className="min-h-[80px] pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
            >
              {isLoading ? "Salvando..." : "Adicionar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
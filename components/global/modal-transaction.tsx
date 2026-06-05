"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tag, DollarSign, Calendar, FileText } from "lucide-react"
import { useTransactionModal } from "@/context/modal-context-finance"
import useTransacaoForm from "@/hooks/transacao/use-transacao-create"

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
  const categoriaValue = watch("categoria")

  useEffect(() => {
    console.log("categoria (watch)", categoriaValue)
  }, [categoriaValue])

  const [valorDisplay, setValorDisplay] = useState("")
  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const inputClass = `
    h-10 pl-10
    bg-gray-50 border border-gray-200 rounded-lg
    text-sm text-gray-900 placeholder:text-gray-400
    transition-all duration-150
    hover:border-gray-300
    focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
  `

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
            <Label className="text-sm font-medium text-gray-600">
              Tipo de Transação
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setValue("tipo_transacao", "ENTRADA", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`
                  flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium
                  transition-all duration-150 active:scale-[0.98]
                  ${
                    transactionType === "ENTRADA"
                      ? "border-green-400 bg-white text-green-700 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
                  }
                `}
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
                className={`
                  flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium
                  transition-all duration-150 active:scale-[0.98]
                  ${
                    transactionType === "SAIDA"
                      ? "border-red-400 bg-white text-red-700 shadow-[0_0_0_3px_rgba(226,75,74,0.15)]"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
                  }
                `}
              >
                💸 Despesa
              </button>
            </div>

            <input type="hidden" {...register("tipo_transacao")} />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Categoria <span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <Tag className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                onChange={(e) =>
                  setValue("categoria", e.target.value, { shouldValidate: true, shouldDirty: true })
                }
                defaultValue=""
                className="
                  h-10 w-full pl-10 pr-4
                  appearance-none
                  bg-gray-50 border border-gray-200 rounded-lg
                  text-sm text-gray-900
                  transition-all duration-150
                  hover:border-gray-300
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
                  cursor-pointer
                "
              >
                <option value="" disabled className="text-gray-400">
                  Selecione uma categoria
                </option>
                <option value="salario">Salário</option>
                <option value="transporte">Transporte</option>
                <option value="alimentacao">Alimentação</option>
                <option value="lazer">Lazer</option>
                <option value="educacao">Educação</option>
                <option value="saude">Saúde</option>
                <option value="moradia">Moradia</option>
                <option value="compras">Compras</option>
                <option value="outras">Outras</option>
              </select>
              {/* Chevron customizado */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <input type="hidden" {...register("categoria")} />
            </div>

            {errors.categoria && (
              <p className="text-sm text-red-500">{errors.categoria.message as string}</p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
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
                className={inputClass}
              />
            </div>

            {errors.valor && (
              <p className="text-sm text-red-500">{errors.valor.message as string}</p>
            )}
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">Data</Label>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                {...register("data")}
                className={inputClass}
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Descrição (opcional)
            </Label>

            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Adicione detalhes sobre esta transação..."
                {...register("descricao")}
                className="
                  min-h-[80px] pl-10
                  bg-gray-50 border border-gray-200 rounded-lg
                  text-sm text-gray-900 placeholder:text-gray-400
                  transition-all duration-150
                  hover:border-gray-300
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
                "
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="
                flex-1 h-10 rounded-lg text-sm font-medium
                border border-gray-200 bg-transparent text-gray-600
                transition-all duration-150
                hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800
                active:scale-[0.98]
              "
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="
                flex-1 h-10 rounded-lg text-sm font-medium
                bg-orange-500 border border-orange-500 text-white
                transition-all duration-150
                hover:bg-orange-600 hover:border-orange-600
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
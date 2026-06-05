"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, DollarSign } from "lucide-react"
import { useGoalModal } from "@/context/modal-context-finance"
import useMetaForm from "@/hooks/meta/use-meta-create"

const colors = [
  { name: "Azul",    value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Laranja", value: "#F97316", bg: "bg-orange-500" },
  { name: "Verde",   value: "#22C55E", bg: "bg-green-500" },
  { name: "Roxo",    value: "#A855F7", bg: "bg-purple-500" },
  { name: "Rosa",    value: "#EC4899", bg: "bg-pink-500" },
  { name: "Amarelo", value: "#F59E0B", bg: "bg-amber-500" },
]

export function AddGoalModal() {
  const { isOpen, closeModal } = useGoalModal()
  const { form, onSubmit, isLoading } = useMetaForm()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form

  const selectedColor = watch("cor")

  const [valorDisplay, setValorDisplay] = useState("")
  const [valorAtualDisplay, setValorAtualDisplay] = useState("")

  const handleMoneyChange = (
    field: "valor" | "valor_atual",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "")
    const value = Number(onlyNumbers) / 100

    setter(
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )

    setValue(field, value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Adicionar Meta
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Nome da Meta */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Nome da Meta <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Ex: Novo celular, Viagem, Emergência..."
                {...register("meta")}
                className="
                  h-10 pl-10
                  bg-gray-50 border border-gray-200 rounded-lg
                  text-sm text-gray-900 placeholder:text-gray-400
                  transition-all duration-150
                  hover:border-gray-300
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
                "
              />
            </div>
            {errors.meta && (
              <p className="text-sm text-red-500">{errors.meta.message as string}</p>
            )}
          </div>

          {/* Valor da Meta */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Valor da Meta <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={valorDisplay}
                onChange={handleMoneyChange("valor", setValorDisplay)}
                className="
                  h-10 pl-10
                  bg-gray-50 border border-gray-200 rounded-lg
                  text-sm text-gray-900 placeholder:text-gray-400
                  transition-all duration-150
                  hover:border-gray-300
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
                "
              />
            </div>
            {errors.valor && (
              <p className="text-sm text-red-500">{errors.valor.message as string}</p>
            )}
          </div>

          {/* Valor Atual */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Valor Atual (opcional)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={valorAtualDisplay}
                onChange={handleMoneyChange("valor_atual", setValorAtualDisplay)}
                className="
                  h-10 pl-10
                  bg-gray-50 border border-gray-200 rounded-lg
                  text-sm text-gray-900 placeholder:text-gray-400
                  transition-all duration-150
                  hover:border-gray-300
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 focus:outline-none
                "
              />
            </div>
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">
              Escolha uma Cor
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setValue("cor", color.value, { shouldValidate: true, shouldDirty: true })}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg text-sm font-medium
                    border transition-all duration-150
                    ${
                      selectedColor === color.value
                        ? "border-orange-400 bg-white shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded-full ${color.bg}`} />
                  <span className="text-xs text-gray-600">{color.name}</span>
                </button>
              ))}
            </div>
            <input type="hidden" {...register("cor")} />
            {errors.cor && (
              <p className="text-sm text-red-500">{errors.cor.message as string}</p>
            )}
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
              className="
                flex-1 h-10 rounded-lg text-sm font-medium
                bg-orange-500 border border-orange-500 text-white
                transition-all duration-150
                hover:bg-orange-600 hover:border-orange-600
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Criar Meta"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
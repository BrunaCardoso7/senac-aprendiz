"use client"

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
import { useState } from "react"
import { useGoalModal } from "@/context/modal-context-finance"

const colors = [
  { name: "Azul", value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Laranja", value: "#F97316", bg: "bg-orange-500" },
  { name: "Verde", value: "#22C55E", bg: "bg-green-500" },
  { name: "Roxo", value: "#A855F7", bg: "bg-purple-500" },
  { name: "Rosa", value: "#EC4899", bg: "bg-pink-500" },
  { name: "Amarelo", value: "#F59E0B", bg: "bg-amber-500" },
]

export function AddGoalModal() {
  const { isOpen, closeModal } = useGoalModal()
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const [goalName, setGoalName] = useState("")
  const [goalValue, setGoalValue] = useState("")
  const [currentValue, setCurrentValue] = useState("")

  const handleSubmit = () => {
    // Aqui seria a logica para salvar a meta
    console.log({ goalName, goalValue, currentValue, selectedColor })
    closeModal()
    // Reset form
    setGoalName("")
    setGoalValue("")
    setCurrentValue("")
    setSelectedColor(colors[0].value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 rounded-2xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Adicionar Meta
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Nome da Meta */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Nome da Meta <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Ex: Novo celular, Viagem, Emergencia..."
                className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
          </div>

          {/* Valor da Meta */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Valor da Meta <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="0,00"
                className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
              />
            </div>
          </div>

          {/* Valor Atual */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Valor Atual (opcional)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="0"
                className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </div>
          </div>

          {/* Escolha de Cor */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Escolha uma Cor
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedColor === color.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${color.bg}`}
                  />
                  <span className="text-xs text-gray-700">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Botoes */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={closeModal}
              className="flex-1 h-12 rounded-full border-gray-200 text-gray-700 font-medium"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              Criar Meta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

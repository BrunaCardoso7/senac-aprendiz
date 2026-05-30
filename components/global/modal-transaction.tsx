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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tag, DollarSign, Calendar, FileText } from "lucide-react"
import { useTransactionModal } from "@/context/modal-context-finance"

export function AddTransactionModal() {
  const { isOpen, closeModal } = useTransactionModal()
  const [transactionType, setTransactionType] = useState<"receita" | "despesa">("despesa")
  const [categoria, setCategoria] = useState("")
  const [valor, setValor] = useState("")
  const [data, setData] = useState(new Date().toISOString().split("T")[0])
  const [descricao, setDescricao] = useState("")

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para salvar a transação
    console.log({
      tipo: transactionType,
      categoria,
      valor,
      data,
      descricao,
    })
    closeModal()
    // Reset form
    setTransactionType("despesa")
    setCategoria("")
    setValor("")
    setData(new Date().toISOString().split("T")[0])
    setDescricao("")
  }

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
            <Label className="text-sm font-medium text-gray-700">Tipo de Transação</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransactionType("receita")}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  transactionType === "receita"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                💰 Receita
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("despesa")}
                className={`flex items-center justify-center gap-2 rounded-lg border-2 py-3 text-sm font-medium transition-all ${
                  transactionType === "despesa"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                💸 Despesa
              </button>
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Selecione uma categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Valor <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="number"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Data</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Descrição (opcional)</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Adicione detalhes sobre esta transação..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="min-h-[80px] pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={closeModal}
            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
          >
            Adicionar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

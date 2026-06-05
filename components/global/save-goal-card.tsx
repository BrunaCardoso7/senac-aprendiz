"use client"

import { useState } from "react"
import { Target, Trash2 } from "lucide-react"
import { useMetaAddAmount } from "@/hooks/meta/use-add-mounth"
import { useDeleteMetaMutation } from "@/hooks/meta/use-meta-delete-mutation"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SavingsGoalCardProps {
  id: string
  title: string
  currentAmount: number
  goalAmount: number
  color?: string
}

const quickAddAmounts = [10, 50, 100]

export function SavingsGoalCard({
  id,
  title,
  currentAmount: initialAmount,
  goalAmount,
  color = "#22C55E",
}: SavingsGoalCardProps) {
  const [currentAmount, setCurrentAmount] = useState(Number(initialAmount ?? 0))
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { addAmount, isLoading } = useMetaAddAmount()
  const deleteMutation = useDeleteMetaMutation()

  const safeGoal = Number(goalAmount ?? 0)
  const percentage = safeGoal > 0
    ? Math.min(Math.round((currentAmount / safeGoal) * 100), 100)
    : 0

  const handleAddAmount = async (amount: number) => {
    const prev = currentAmount
    setCurrentAmount((c) => Math.min(c + amount, safeGoal))
    try {
      await addAmount(id, amount)
    } catch {
      setCurrentAmount(prev)
    }
  }

  const confirmDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Meta deletada com sucesso!")
        setDeleteDialogOpen(false)
      },
      onError: () => {
        toast.error("Erro ao deletar meta")
      },
    })
  }

  const formatCurrency = (value: number) => {
    const num = Number(value)
    if (isNaN(num)) return "R$ 0,00"
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: `${color}20` }}
            >
              <Target className="h-4 w-4" style={{ color }} />
            </div>
            <span className="font-medium text-gray-800">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-500">{percentage}%</span>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              disabled={deleteMutation.isPending}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Excluir meta"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${percentage}%`, backgroundColor: color }}
            />
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {formatCurrency(currentAmount)} de {formatCurrency(safeGoal)}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {quickAddAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAddAmount(amount)}
              disabled={isLoading || currentAmount >= safeGoal}
              className="rounded-lg border border-green-200 bg-green-50 py-2.5 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + R$ {amount}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar <strong>{title}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {deleteMutation.isPending ? "Deletando..." : "Deletar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteTransacaoMutation } from "@/hooks/transacao/use-transacao-delete-mutation"
import { toast } from "sonner"

interface Transaction {
  id: string
  amount: number
  category: string
  date: string
}

interface RecentTransactionsProps {
  transactions?: Transaction[]
  onViewAll?: () => void
  onDelete?: (id: string) => void
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    amount: -1000.00,
    category: "Lazer",
    date: "02/06/2026",
  },
]

export function RecentTransactions({
  transactions = defaultTransactions,
  onViewAll,
  onDelete,
}: RecentTransactionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)
  
  const deleteMutation = useDeleteTransacaoMutation()

  const formatCurrency = (value: number) => {
    const formatted = Math.abs(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return value < 0 ? `- R$ ${formatted}` : `R$ ${formatted}`
  }

  const handleDeleteClick = (id: string) => {
    setSelectedTransactionId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedTransactionId) return

    deleteMutation.mutate(selectedTransactionId, {
      onSuccess: () => {
        toast.success('Transação deletada com sucesso!')
        setDeleteDialogOpen(false)
        setSelectedTransactionId(null)
      },
      onError: () => {
        toast.error('Erro ao deletar transação')
      },
    })
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-background border border-border rounded-lg"
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className={`font-medium ${
                    transaction.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
                <span className="text-sm text-foreground">{transaction.category}</span>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(transaction.id)}
                disabled={deleteMutation.isPending}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma transação encontrada neste período</p>
          </div>
        )}
      </div>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {deleteMutation.isPending ? 'Deletando...' : 'Deletar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

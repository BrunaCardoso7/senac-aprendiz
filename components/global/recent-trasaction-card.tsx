"use client"

import { useState } from "react"
import { Trash2, Eye, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteTransacaoMutation } from "@/hooks/transacao/use-transacao-delete-mutation"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"

interface Transaction {
  id: string
  amount: number
  category: string
  descricao?: string
  date: string
  tipo_transacao: "ENTRADA" | "SAIDA"
}

interface RecentTransactionsProps {
  transactions?: Transaction[]
  onViewAll?: () => void
  onDelete?: (id: string) => void
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    amount: 1000.00,
    category: "lazer",
    descricao: "Conta de luz do mês de junho com valor acima do esperado",
    date: "02/06/2026",
    tipo_transacao: "SAIDA",
  },
]

const categoryColors: Record<string, string> = {
  lazer:        "bg-purple-100 text-purple-700",
  alimentacao:  "bg-orange-100 text-orange-700",
  transporte:   "bg-blue-100 text-blue-700",
  saude:        "bg-green-100 text-green-700",
  educacao:     "bg-indigo-100 text-indigo-700",
  moradia:      "bg-yellow-100 text-yellow-700",
  vestuario:    "bg-pink-100 text-pink-700",
  salario:      "bg-emerald-100 text-emerald-700",
  investimento: "bg-teal-100 text-teal-700",
  compras:      "bg-rose-100 text-rose-700",
  outras:       "bg-cyan-100 text-cyan-700",
}

function getCategoryColor(category: string): string {
  const normalized = category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  return categoryColors[normalized] ?? "bg-gray-100 text-gray-700"
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function truncate(text: string, limit = 28): string {
  if (text.length <= limit) return text
  return text.slice(0, limit) + "..."
}

export function RecentTransactions({
  transactions = defaultTransactions,
  onViewAll,
  onDelete,
}: RecentTransactionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const { user } = useAuth()
  const deleteMutation = useDeleteTransacaoMutation(user?.id)

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDeleteDialogOpen(true)
  }

  const handleDetailClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedTransaction) return
    deleteMutation.mutate(selectedTransaction.id, {
      onSuccess: () => {
        toast.success("Transação deletada com sucesso!")
        setDeleteDialogOpen(false)
        setSelectedTransaction(null)
      },
      onError: () => {
        toast.error("Erro ao deletar transação")
      },
    })
  }

  const isEntrada = (t: Transaction) => t.tipo_transacao === "ENTRADA"

  return (
    <div className="w-full">
      <div className="space-y-3">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 p-4 bg-background border border-border rounded-lg"
            >
              {/* Esquerda: valor, descrição e data */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  {isEntrada(transaction) ? (
                    <ArrowUpCircle className="size-4 shrink-0 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="size-4 shrink-0 text-red-500" />
                  )}
                  <span
                    className={`font-semibold text-base ${
                      isEntrada(transaction) ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <span className="text-sm text-foreground">
                  {truncate(transaction.descricao || "Sem descrição")}
                </span>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>

              {/* Direita: categoria + ações */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">categoria:</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(transaction.category)}`}
                  >
                    {capitalizeFirst(transaction.category)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDetailClick(transaction)}
                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(transaction)}
                    disabled={deleteMutation.isPending}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma transação encontrada neste período</p>
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Transação</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="flex flex-col gap-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tipo</span>
                <div className="flex items-center gap-1.5">
                  {isEntrada(selectedTransaction) ? (
                    <ArrowUpCircle className="size-5 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="size-5 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      isEntrada(selectedTransaction) ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isEntrada(selectedTransaction) ? "Receita" : "Despesa"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Valor</span>
                <span
                  className={`text-lg font-bold ${
                    isEntrada(selectedTransaction) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(selectedTransaction.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Categoria</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(selectedTransaction.category)}`}
                >
                  {capitalizeFirst(selectedTransaction.category)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data</span>
                <span className="text-sm font-medium">{selectedTransaction.date}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Descrição</span>
                <p className="text-sm font-medium leading-relaxed bg-muted rounded-lg p-3">
                  {selectedTransaction.descricao || "Sem descrição"}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Fechar
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                setDetailDialogOpen(false)
                if (selectedTransaction) handleDeleteClick(selectedTransaction)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.
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
    </div>
  )
}
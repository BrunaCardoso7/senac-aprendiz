"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteMetaMutation } from "@/hooks/meta/use-meta-delete-mutation"
import { toast } from "sonner"

interface Meta {
  id: string
  meta: string
  valor: number
  valor_atual: number
  cor?: string | null
}

interface MonthData {
  mes: string
  metas: Meta[]
  total_valor: number
  total_valor_atual: number
}

interface CardGoalsListProps {
  data?: MonthData[]
  isLoading?: boolean
  mesAtual: string
  onPrevious: () => void
  onNext: () => void
  onDelete?: (id: string) => void
}

export function CardGoalsList({
  data = [],
  isLoading,
  mesAtual,
  onPrevious,
  onNext,
  onDelete,
}: CardGoalsListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMetaId, setSelectedMetaId] = useState<string | null>(null)

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const getProgresso = (valorAtual: number, valor: number) => {
    if (valor === 0) return 0
    return Math.min((valorAtual / valor) * 100, 100)
  }

  const deleteMutation = useDeleteMetaMutation()

  const handleDeleteClick = (metaId: string) => {
    setSelectedMetaId(metaId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedMetaId) return

    deleteMutation.mutate(selectedMetaId, {
      onSuccess: () => {
        toast.success('Meta deletada com sucesso!')
        setDeleteDialogOpen(false)
        setSelectedMetaId(null)
      },
      onError: () => {
        toast.error('Erro ao deletar meta')
      },
    })
  }

  const mesFormatado = new Date(mesAtual + '-01T00:00:00').toLocaleString('pt-BR', {
    month: 'long', year: 'numeric',
    })

  const metas = data.flatMap((d) => d.metas)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-4">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-sm text-muted-foreground capitalize">{mesFormatado}</span>
          <div>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground text-center py-6">Carregando...</p>
      ) : metas.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Nenhuma meta neste mês.
        </p>
      ) : (
        <div className="space-y-2">
          {metas.map((meta) => {
            const progresso = getProgresso(meta.valor_atual, meta.valor)
            return (
              <div
                key={meta.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-background"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: meta.cor ?? "#6b7280" }}
                  />
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">
                      {meta.meta}
                    </span>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progresso}%`, backgroundColor: meta.cor ?? "#6b7280" }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(meta.valor_atual)} de {formatCurrency(meta.valor)}
                      </span>
                      <span className="text-xs font-medium" style={{ color: meta.cor ?? "#6b7280" }}>
                        {progresso.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(meta.id)}
                  disabled={deleteMutation.isPending}
                  className="p-2 ml-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Excluir meta"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar esta meta? Esta ação não pode ser desfeita.
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
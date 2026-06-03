"use client"
import { BalanceCard } from "@/components/global/balance-card"
import CardFinanceControl from "@/components/global/card-finance-control"
import CardGoals from "@/components/global/card-goals"
import { CardGoalsList } from "@/components/global/card-goals-list"
import EducationDetail from "@/components/global/education-detail"
import FinanceCard from "@/components/global/finance-card"
import { AddGoalModal } from "@/components/global/goal-modal"
import { AddTransactionModal } from "@/components/global/modal-transaction"
import { MonthlyHistoryChart } from "@/components/global/monthly-history-chart"
import { RecentTransactions } from "@/components/global/recent-trasaction-card"
import { useAuth } from "@/context/auth-context"
import { useGoalModal, useTransactionModal } from "@/context/modal-context-finance"
import { useMetaQuery } from "@/hooks/meta/use-list-meta"
import { useHistoricoMetaQuery } from "@/hooks/meta/use-list-meta-transacao-query"
import { useHistoricoTransacaoQuery } from "@/hooks/transacao/use-list-historico-transacao-query"
import { useTransacaoQuery } from "@/hooks/transacao/use-list-transacao"
import { useTransacoesPorPeriodo } from "@/hooks/transacao/use-transacoes-por-periodo"
import { useResumoTransacaoQuery } from "@/hooks/transacao/use-resumo-transacao-query"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CirclePlus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navegarMes = (prev: string, direcao: 'anterior' | 'proximo') => {
  const [year, month] = prev.split('-').map(Number)
  const date = direcao === 'anterior'
    ? new Date(year, month - 2)
    : new Date(year, month)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default function FinancaPage() {
  const { user } = useAuth()
  const { openModal } = useTransactionModal()
  const { openModal: openGoalModal } = useGoalModal()
  const anoAtual = new Date().getFullYear()
  const mesAtualFormatado = () => {
  const now = new Date()
    return now.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' })
      .split('/')
      .reverse()
      .join('-') // converte "06/2026" → "2026-06"
  }

  const {data: data_full_transacao, isLoading: isLoadingFullTransacao} = useTransacaoQuery(user?.id )
  const { data: data_full_metas, isLoading: isLoadingFullMetas } = useMetaQuery(user?.id)
  const { data, isLoading } = useResumoTransacaoQuery(user?.id)

  const [mesAtual, setMesAtual] = useState(mesAtualFormatado)
  const [mesAtualMeta, setMesAtualMeta] = useState(mesAtualFormatado)   

  // Hook para buscar transações do período (mês selecionado)
  const { data: transacoesPeriodo, isLoading: isLoadingTransacoesPeriodo } = useTransacoesPorPeriodo(
    user?.id,
    mesAtual
  )

  const { data: data_month, isLoading: isLoadingMonth } = useHistoricoTransacaoQuery(
    user?.id, mesAtual, mesAtual,
  )

  const { data: data_metas, isLoading: isLoadingMetas } = useHistoricoMetaQuery(
    user?.id, mesAtualMeta, mesAtualMeta,
  )

  const temTransacoes = data_full_transacao && data_full_transacao.length > 0
  const temMetas = data_full_metas && data_full_metas.length > 0

  return (
    <div className="flex-1 mt-6 px-4 py-24 space-y-6">
      <BalanceCard
        saldoDisponivel={data?.saldo}
        receitas={data?.receita}
        despesas={data?.despesa}
      />

      <button
        className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] flex justify-center items-center gap-6 text-white font-semibold rounded-lg"
        onClick={openModal}
      >
        <CirclePlus className="h-4 w-4" />
        Adicionar Transação
      </button>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {temTransacoes ? (
            <MonthlyHistoryChart
              data={data_month ?? []}
              isLoading={isLoadingMonth}
              mesAtual={mesAtual}
              onPrevious={() => setMesAtual((p) => navegarMes(p, 'anterior'))}
              onNext={() => setMesAtual((p) => navegarMes(p, 'proximo'))}
            />
          ) : (
            <CardFinanceControl />
          )}
          <EducationDetail />
        </TabsContent>

        {/* Transações Tab */}
        <TabsContent value="transacoes" className="space-y-6">
          {temTransacoes ? (
            <div className="space-y-4">
              {/* Header com navegação de mês */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Transações do Mês
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(mesAtual + '-01T00:00:00').toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    }).replace(/^\w/, (c: string) => c.toUpperCase())}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMesAtual((p) => navegarMes(p, 'anterior'))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setMesAtual((p) => navegarMes(p, 'proximo'))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Lista de transações do período */}
              <RecentTransactions
                transactions={
                  transacoesPeriodo && transacoesPeriodo.length > 0
                    ? transacoesPeriodo.map((t: any) => ({
                        id: t.id,
                        amount: t.valor,
                        category: t.categoria,
                        date: new Date(t.data).toLocaleDateString('pt-BR'),
                      }))
                    : []
                }
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma transação registrada</p>
            </div>
          )}
        </TabsContent>

        {/* Metas Tab */}
        <TabsContent value="metas" className="space-y-6">
          {temMetas ? (
            <CardGoalsList
              data={data_metas ?? []}
              isLoading={isLoadingMetas}
              mesAtual={mesAtualMeta}
              onPrevious={() => setMesAtualMeta((p) => navegarMes(p, 'anterior'))}
              onNext={() => setMesAtualMeta((p) => navegarMes(p, 'proximo'))}
            />
          ) : (
            <CardGoals openGoalModal={openGoalModal} />
          )}
        </TabsContent>
      </Tabs>

      <AddTransactionModal />
      <AddGoalModal />
    </div>
  )
}
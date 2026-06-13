"use client"
import { BalanceCard } from "@/components/global/balance-card"
import CardFinanceControl from "@/components/global/card-finance-control"
import CardGoals from "@/components/global/card-goals"
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
import { SavingsGoalCard } from "@/components/global/save-goal-card"
import { ExpenseChart } from "@/components/global/expense-chart"
import EducationDetail from "@/components/global/education-detail"

const navegarMes = (prev: string, direcao: 'anterior' | 'proximo') => {
  const [year, month] = prev.split('-').map(Number)
  const date = direcao === 'anterior'
    ? new Date(year, month - 2)
    : new Date(year, month)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

const formatarMes = (mes: string) =>
  new Date(mes + '-01T00:00:00').toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).replace(/^\w/, (c: string) => c.toUpperCase())

export default function FinancaPage() {
  const { user } = useAuth()
  const { openModal } = useTransactionModal()
  const { openModal: openGoalModal } = useGoalModal()

  const mesAtualFormatado = () => {
    const now = new Date()
    return now.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' })
      .split('/')
      .reverse()
      .join('-')
  }

  const [mesAtual, setMesAtual] = useState(mesAtualFormatado)
  const [mesAtualMeta, setMesAtualMeta] = useState(mesAtualFormatado)

  const { data: data_full_transacao } = useTransacaoQuery(user?.id)
  const { data: data_full_metas } = useMetaQuery(user?.id)
  const { data } = useResumoTransacaoQuery(user?.id)

  const { data: transacoesPeriodo } = useTransacoesPorPeriodo(user?.id, mesAtual)
  const { data: data_month, isLoading: isLoadingMonth } = useHistoricoTransacaoQuery(user?.id, mesAtual, mesAtual)
  const { data: data_metas, isLoading: isLoadingMetas } = useHistoricoMetaQuery(user?.id, mesAtualMeta, mesAtualMeta)

  const temTransacoes = data_full_transacao && data_full_transacao.length > 0
  const temMetas = data_full_metas && data_full_metas.length > 0

  const NavButtons = ({
    onPrev,
    onNext,
  }: {
    onPrev: () => void
    onNext: () => void
  }) => (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={onPrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  const TabHeader = ({
    title,
    mes,
    onPrev,
    onNext,
  }: {
    title: string
    mes: string
    onPrev: () => void
    onNext: () => void
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{formatarMes(mes)}</p>
      </div>
      <NavButtons onPrev={onPrev} onNext={onNext} />
    </div>
  )

  return (
    <div className="flex-1 mt-6 px-4 py-24 space-y-6">
      <BalanceCard
        saldoDisponivel={data?.saldo}
        receitas={data?.receita}
        despesas={data?.despesa}
      />
      <div className="grid grid-cols-2 gap-3">
        <button
          className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] flex justify-center items-center gap-2 text-white font-semibold rounded-lg"
          onClick={openModal}
        >
          <CirclePlus className="h-4 w-4" />
          Transação
        </button>

        <button
          className="w-full h-12 bg-[#8b5cf6] hover:bg-[#7c3aed] flex justify-center items-center gap-2 text-white font-semibold rounded-lg"
          onClick={openGoalModal}
        >
          <CirclePlus className="h-4 w-4" />
          Meta
        </button>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {temTransacoes ? (
            <>
              <TabHeader
                title="Dashboard Financeiro"
                mes={mesAtual}
                onPrev={() => setMesAtual((p) => navegarMes(p, 'anterior'))}
                onNext={() => setMesAtual((p) => navegarMes(p, 'proximo'))}
              />
              <ExpenseChart data={transacoesPeriodo ?? []} />
              <MonthlyHistoryChart
                data={data_month ?? []}
                isLoading={isLoadingMonth}
                mesAtual={mesAtual}
              />
            </>
          ) : (
            <CardFinanceControl />
          )}
          <EducationDetail />
        </TabsContent>

        {/* Transações Tab */}
        <TabsContent value="transacoes" className="space-y-6">
          {temTransacoes ? (
            <div className="space-y-4">
              <TabHeader
                title="Transações do Mês"
                mes={mesAtual}
                onPrev={() => setMesAtual((p) => navegarMes(p, 'anterior'))}
                onNext={() => setMesAtual((p) => navegarMes(p, 'proximo'))}
              />
              <RecentTransactions
                transactions={
                  transacoesPeriodo?.map((t: any) => ({
                    id: t.id,
                    amount: t.valor,
                    category: t.categoria,
                    descricao: t.descricao,
                    date: new Date(t.data).toLocaleDateString('pt-BR'),
                    tipo_transacao: t.tipo_transacao, // ← corrigido
                  })) ?? []
                }
              />
            </div>
          ) : (
            <CardFinanceControl />
          )}
        </TabsContent>

        {/* Metas Tab */}
        <TabsContent value="metas" className="space-y-6">
          {temMetas ? (
            <div className="space-y-4">
              <TabHeader
                title="Minhas Metas"
                mes={mesAtualMeta}
                onPrev={() => setMesAtualMeta((p) => navegarMes(p, 'anterior'))}
                onNext={() => setMesAtualMeta((p) => navegarMes(p, 'proximo'))}
              />

              {isLoadingMetas ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Carregando...
                </p>
              ) : (data_metas ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma meta criada em{" "}
                  {new Date(mesAtualMeta + '-01T00:00:00').toLocaleDateString('pt-BR', { month: 'long' })}
                </p>
              ) : (
                <div className="space-y-4">
                  {(data_metas ?? []).flatMap((d: any) => d.metas ?? []).map((meta: any) => (
                    <SavingsGoalCard
                      key={String(meta.id)}
                      id={String(meta.id)}
                      title={meta.meta ?? ""}
                      currentAmount={Number(meta.valor_atual ?? 0)}
                      goalAmount={Number(meta.valor ?? 0)}
                      color={meta.cor}
                    />
                  ))}
                </div>
              )}
            </div>
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
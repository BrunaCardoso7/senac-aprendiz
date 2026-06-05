'use client'

import createTransacao from '@/server/services/create-transacao'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTransacaoMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createTransacao,
    onSuccess: (_, variables) => {
      // lista completa — useTransacaoQuery
      queryClient.invalidateQueries({
        queryKey: ["transacao", variables.userId],
      })
      // resumo saldo/receita/despesa — useResumoTransacaoQuery
      queryClient.invalidateQueries({
        queryKey: ["transacao", "resumo", variables.userId],
      })
      // transações por período — useTransacoesPorPeriodo
      queryClient.invalidateQueries({
        queryKey: ["transacoes", variables.userId],
      })
      // histórico mensal — useHistoricoTransacaoQuery
      queryClient.invalidateQueries({
        queryKey: ["transacao", "historico", variables.userId],
      })
    },
  })
}
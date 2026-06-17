'use client'

import createTransacao from '@/server/services/create-transacao'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTransacaoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransacao,

    onSuccess: async (_, variables) => {
      // Lista principal
      await queryClient.refetchQueries({
        queryKey: ['transacao', variables.userId],
      })

      // Resumo
      await queryClient.refetchQueries({
        queryKey: ['transacao', 'resumo', variables.userId],
      })

      // Transações por período
      await queryClient.refetchQueries({
        queryKey: ['transacoes', variables.userId],
      })

      // Histórico
      await queryClient.refetchQueries({
        queryKey: ['transacao', 'historico', variables.userId],
      })
    },
  })
}
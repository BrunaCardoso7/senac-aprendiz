'use client'

import deleteTransacao from '@/server/services/delete-transacao'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTransacaoMutation(userId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTransacao,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['transacao', userId],
      })

      await queryClient.invalidateQueries({
        queryKey: ['transacao', 'resumo', userId],
      })

      await queryClient.invalidateQueries({
        queryKey: ['transacoes', userId],
      })

      await queryClient.invalidateQueries({
        queryKey: ['transacao', 'historico', userId],
      })
    },
  })
}
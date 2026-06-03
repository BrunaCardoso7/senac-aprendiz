'use client'

import deleteTransacao from '@/server/services/delete-transacao'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTransacaoMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteTransacao,
    onSuccess: () => {
      // Invalida as queries para refetch das transações
      queryClient.invalidateQueries({
        queryKey: ['transacao'],
      })
    },
  })
}

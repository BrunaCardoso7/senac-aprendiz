'use client'

import createTransacao from '@/server/services/create-transacao'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateTransacaoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTransacao,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transacao", "resumo", variables.userId],
      })
      queryClient.invalidateQueries({
        queryKey: ["transacao", variables.userId],
      })
    },
  })
}
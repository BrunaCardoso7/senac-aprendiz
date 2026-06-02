'use client'

import createTransacao from '@/server/services/create-transacao'
import createUser from '@/server/services/create-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateTransacaoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTransacao,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['transacao'],
      })
  },
  })
}
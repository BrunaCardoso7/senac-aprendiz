'use client'

import updateMetaAmount from '@/server/services/update-meta'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMetaAddAmount() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateMetaAmount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta'] })
    },
  })

  const addAmount = (metaId: string, amount: number) => {
    return mutation.mutateAsync({ id: metaId, amount }) // 👈 só aqui
  }

  return { addAmount, isLoading: mutation.isPending }
}
'use client'

import deleteMeta from '@/server/services/delete-meta'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteMetaMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteMeta,
    onSuccess: () => {
      // Invalida a query para refetch das metas
      queryClient.invalidateQueries({
        queryKey: ['meta'],
      })
    },
  })
}

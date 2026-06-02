'use client'

import createMeta from '@/server/services/create-meta'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateMetaMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createMeta,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['meta'],
      })
  },
  })
}
'use client'

import createUser from '@/server/services/create-user'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
  },
  })
}
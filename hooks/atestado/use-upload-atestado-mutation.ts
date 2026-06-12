// @/hooks/atestado/use-upload-atestado-mutation.ts
import uploadAtestado from "@/server/services/uploud-atestado"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type UploadParams = {
  file: File
  userId: string
  descricao?: string
}

export function useUploadAtestadoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, userId, descricao }: UploadParams) =>
      uploadAtestado(file, userId, descricao),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atestados"] })
    },
  })
}
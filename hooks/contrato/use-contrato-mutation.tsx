import { useMutation, useQueryClient } from "@tanstack/react-query"
import createContrato from "@/server/services/create-contrato"
import updateContrato from "@/server/services/update-contrato"
import { ContratoSchema } from "@/server/schema/contrato-schema"

export function useCreateContratoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ContratoSchema) => createContrato(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contratos"],
      })
    },
  })
}

export function useUpdateContratoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: ContratoSchema
    }) => updateContrato(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contratos"],
      })
    },
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import createContrato from "@/server/services/create-contrato"
import updateContrato from "@/server/services/update-contrato"
import { ContratoSchema } from "@/server/schema/contrato-schema"
import { CONTRATO_QUERY_KEY } from "./use-get-contrato" // ← importa a constante

type SaveContratoParams = {
  contratoId?: string | null
  data: ContratoSchema
}

export function useSaveContratoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ contratoId, data }: SaveContratoParams) => {
      if (contratoId) return updateContrato(contratoId, data)
      return createContrato(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTRATO_QUERY_KEY }) // ← corrigido
    },
  })
}
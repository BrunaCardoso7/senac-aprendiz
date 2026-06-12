// @/hooks/ajuda/use-ajuda-mutation.ts
import { useMutation } from "@tanstack/react-query"
import createAjuda from "@/server/services/create-ajuda"
import { AjudaSchema } from "@/server/schema/ajuda-schema"

export function useCreateAjudaMutation() {
  return useMutation({
    mutationFn: (data: AjudaSchema) => createAjuda(data),
  })
}
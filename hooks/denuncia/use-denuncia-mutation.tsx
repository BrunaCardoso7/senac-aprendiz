// @/hooks/denuncia/use-denuncia-mutation.ts
import { useMutation } from "@tanstack/react-query"
import { DenunciaSchema } from "@/server/schema/denuncia.schema"
import createDenuncia from "@/server/services/create-denuncia"

export function useCreateDenunciaMutation() {
  return useMutation({
    mutationFn: (data: DenunciaSchema) => createDenuncia(data),
  })
}
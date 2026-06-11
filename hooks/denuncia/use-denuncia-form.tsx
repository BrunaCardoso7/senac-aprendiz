// @/hooks/denuncia/use-denuncia-form.ts
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { useCreateDenunciaMutation } from "./use-denuncia-mutation"
import { DenunciaFormSchema, denunciaFormSchema } from "@/server/schema/denuncia.schema"

type UseDenunciaFormProps = {
  onSuccess?: () => void
}

export default function useDenunciaForm({ onSuccess }: UseDenunciaFormProps = {}) {
  const { user } = useAuth()
  const mutation = useCreateDenunciaMutation()

  const form = useForm<DenunciaFormSchema>({
    resolver: zodResolver(denunciaFormSchema),
    defaultValues: {
      categoria: "",
      dataOcorido: new Date(),
      descricao: "",
      testemunhas: "",
    },
  })

  const onSubmit = (values: DenunciaFormSchema) => {
    if (!user?.id) {
      toast.warning("Usuário não identificado.")
      return
    }

    mutation.mutate(
      { ...values, userId: user.id }, // userId injetado aqui
      {
        onSuccess: () => {
          toast.success("Denúncia enviada com sucesso!")
          form.reset()
          onSuccess?.()
        },
        onError: () => {
          toast.error("Erro ao enviar denúncia.")
        },
      }
    )
  }

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  }
}
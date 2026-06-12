// @/hooks/ajuda/use-ajuda-form.ts
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { ajudaFormSchema, AjudaFormSchema } from "@/server/schema/ajuda-schema"
import { useCreateAjudaMutation } from "./use-create-mutation-ajuda"

type UseAjudaFormProps = {
  onSuccess?: () => void
}

export default function useAjudaForm({ onSuccess }: UseAjudaFormProps = {}) {
  const { user } = useAuth()
  const mutation = useCreateAjudaMutation()

  const form = useForm<AjudaFormSchema>({
    resolver: zodResolver(ajudaFormSchema),
    defaultValues: {
      nome: user?.name ?? "",
      descricao: "",
    },
  })

  const onSubmit = (values: AjudaFormSchema) => {
    if (!user?.id) {
      toast.warning("Usuário não identificado.")
      return
    }

    mutation.mutate(
      { ...values, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Pedido de ajuda enviado com sucesso!")
          form.reset()
          onSuccess?.()
        },
        onError: () => {
          toast.error("Erro ao enviar pedido de ajuda.")
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
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { useGoalModal } from "@/context/modal-context-finance"
import { useCreateMetaMutation } from "./use-meta-mutation"
import { metaSchema, MetaSchema } from "@/server/schema/meta-schema"

export default function useMetaForm() {
  const { user } = useAuth()
  const { closeModal } = useGoalModal()

  const form = useForm<MetaSchema>({
    resolver: zodResolver(metaSchema),
    defaultValues: {
      userId: user?.id ?? "",
      meta: "",
      valor: 0,
      valor_atual: 0,
      cor: "#3B82F6",
    },
  })

  const createMutation = useCreateMetaMutation()

  const onSubmit = async (values: MetaSchema) => {
    if (!user) {
      toast.warning("Usuário não identificado.")
      return
    }

    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Meta criada com sucesso!")
        form.reset()
        closeModal()
      },
      onError: () => {
        toast.error("Erro ao criar meta")
      },
    })
  }

  return {
    form,
    onSubmit,
    isLoading: createMutation.isPending,
    isError: createMutation.isError,
    error: createMutation.error,
  }
}
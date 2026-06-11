"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { contratoFormSchema, ContratoFormSchema } from "@/server/schema/contrato-schema"
import { useSaveContratoMutation } from "./use-save-contrato"

type UseContratoFormProps = {
  contrato?: {
    id: string
    empresa: string
    unidade?: string | null
    curso: string
    inicio: Date
    final: Date
  } | null
  onSuccess?: () => void
}

export default function useContratoForm({
  contrato,
  onSuccess,
}: UseContratoFormProps = {}) {
  const { user } = useAuth()
  const saveContratoMutation = useSaveContratoMutation()

  const form = useForm<ContratoFormSchema>({
    resolver: zodResolver(contratoFormSchema), // ← sem userId
    defaultValues: {
      empresa: contrato?.empresa ?? "",
      unidade: contrato?.unidade ?? "",
      curso: contrato?.curso ?? "",
      inicio: contrato?.inicio ?? new Date(),
      final: contrato?.final ?? new Date(),
    },
  })

  const onSubmit = (values: ContratoFormSchema) => {
    if (!user?.id) {
      toast.warning("Usuário não identificado.")
      return
    }

    // userId injetado aqui, nunca passa pelo RHF
    saveContratoMutation.mutate(
      {
        contratoId: contrato?.id,
        data: { ...values, userId: user.id },
      },
      {
        onSuccess: () => {
          toast.success(
            contrato?.id
              ? "Contrato atualizado com sucesso!"
              : "Contrato criado com sucesso!"
          )
          onSuccess?.()
        },
        onError: () => {
          toast.error("Erro ao salvar contrato")
        },
      }
    )
  }

  return {
    form,
    onSubmit,
    isLoading: saveContratoMutation.isPending,
    isError: saveContratoMutation.isError,
    error: saveContratoMutation.error,
  }
}
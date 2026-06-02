"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateTransacaoMutation } from "./use-transacao-mutation"
import { TransacaoSchema, transacaoSchema } from "@/server/schema/transacao-schema"
import { useAuth } from "@/context/auth-context"
import { useTransactionModal } from "@/context/modal-context-finance"

export default function useTransacaoForm() {
  const { user } = useAuth()
  const { closeModal } = useTransactionModal()

  if (!user) {
    toast.warning("Usuário não identificado.")
  }

  const form = useForm<any>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      userId: user?.id, 
      categoria: "",
      valor: 0.00,
      data: new Date(),
      descricao: "",
      tipo_transacao: "ENTRADA",
    },
  })

  const createMutation = useCreateTransacaoMutation()

  const onSubmit = async (values: TransacaoSchema) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success("Transação criada com sucesso!")
        closeModal()
      },
      onError: (error) => {
        toast.error("Erro ao criar transação")
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
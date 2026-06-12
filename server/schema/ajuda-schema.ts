// @/server/schema/ajuda-schema.ts
import { z } from "zod"

const ajudaBase = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
  nome: z.string().min(1, "Nome é obrigatório").max(255),
  descricao: z.string().min(10, "Descreva com pelo menos 10 caracteres"),
})

export const ajudaSchema = ajudaBase
export const ajudaFormSchema = ajudaBase.omit({ userId: true })

export type AjudaSchema = z.infer<typeof ajudaSchema>
export type AjudaFormSchema = z.infer<typeof ajudaFormSchema>
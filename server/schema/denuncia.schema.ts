// @/server/schema/denuncia-schema.ts
import { z } from "zod"

const denunciaBase = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  dataOcorido: z.coerce.date({ message: "Data inválida" }),
  descricao: z.string().min(10, "Descreva com pelo menos 10 caracteres"),
  testemunhas: z.string().optional(),
})

export const denunciaSchema = denunciaBase

export const denunciaFormSchema = denunciaBase.omit({ userId: true })

export type DenunciaSchema = z.infer<typeof denunciaSchema>
export type DenunciaFormSchema = z.infer<typeof denunciaFormSchema>
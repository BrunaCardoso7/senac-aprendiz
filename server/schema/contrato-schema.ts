import { z } from "zod"

const contratoBase = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
  empresa: z.string().min(1, "Empresa é obrigatória").max(255),
  unidade: z.string().max(255).optional(),
  curso: z.string().min(1, "Curso é obrigatório").max(255),
  inicio: z.coerce.date({ message: "Data de início inválida" }),
  final: z.coerce.date({ message: "Data final inválida" }),
})

// Schema completo com refine (usado na API)
export const contratoSchema = contratoBase.refine(
  (data) => data.final >= data.inicio,
  { message: "A data final deve ser maior ou igual à data de início", path: ["final"] }
)

// Schema do form sem userId — omit funciona no objeto base, antes do refine
export const contratoFormSchema = contratoBase
  .omit({ userId: true })
  .refine(
    (data) => data.final >= data.inicio,
    { message: "A data final deve ser maior ou igual à data de início", path: ["final"] }
  )

export type ContratoSchema = z.infer<typeof contratoSchema>
export type ContratoFormSchema = z.infer<typeof contratoFormSchema>
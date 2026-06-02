import { z } from "zod";



export const metaSchema = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
  meta: z
    .string()
    .min(1, "Categoria é obrigatória")
    .max(100, "Categoria muito longa"),
  valor: z
    .number()
    .positive("O valor deve ser maior que zero"),
  valor_atual: z
    .number(),
  cor: z
    .string()
    .max(500, "Cor muito longa")
    .optional(),
});

export type MetaSchema = z.infer<typeof metaSchema>;
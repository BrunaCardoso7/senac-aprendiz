import { z } from "zod";

export const tipoTransacaoSchema = z.enum([
  "ENTRADA",
  "SAIDA",
]);

export const transacaoSchema = z.object({
  userId: z.string().uuid("ID de usuário inválido"),

  categoria: z
    .string()
    .min(1, "Categoria é obrigatória")
    .max(100, "Categoria muito longa"),

  valor: z
    .number()
    .positive("O valor deve ser maior que zero"),

  data: z.coerce.date(),

  descricao: z
    .string()
    .max(500, "Descrição muito longa")
    .optional(),

  tipo_transacao: tipoTransacaoSchema.default("ENTRADA"),
});

export type TransacaoSchema = z.infer<typeof transacaoSchema>;
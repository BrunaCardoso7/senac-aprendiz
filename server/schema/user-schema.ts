import { z } from 'zod'

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter ao menos 2 caracteres')
    .max(255, 'Nome muito longo')
    .trim(),
  matricula: z
    .string()
    .min(1, 'Matrícula obrigatória')
    .max(55, 'Matrícula muito longa')
    .trim(),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .trim(),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'], // erro aparece no campo confirmPassword
})


export type UserFormData = z.infer<typeof userSchema>
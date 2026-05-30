import { UserFormData } from "../schema/user-schema"

type CreateUserPayload = Omit<UserFormData, 'confirmPassword'>

async function createUser(data: UserFormData) {
  const { confirmPassword, ...payload } = data
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const response = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(response?.message || 'Erro ao criar usuário')
  }


  return payload
}
export default createUser
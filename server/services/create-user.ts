import { UserFormData } from "../schema/user-schema"

async function createUser(data: UserFormData) {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(payload?.message || 'Erro ao criar usuário')
  }


  return payload
}
export default createUser
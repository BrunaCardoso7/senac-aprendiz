// @/server/services/list-atestados.ts
async function listAtestados(userId: string, search?: string) {
  const params = new URLSearchParams({ userId })
  if (search) params.append("search", search)

  const res = await fetch(`/api/atestado/get?${params}`)
  const response = await res.json()

  if (!res.ok) throw new Error(JSON.stringify(response))

  return response
}

export default listAtestados
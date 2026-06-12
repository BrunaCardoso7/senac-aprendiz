// @/server/services/upload-atestado.ts
async function uploadAtestado(file: File, userId: string, descricao?: string) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("userId", userId)
  if (descricao) formData.append("descricao", descricao)

  const res = await fetch("/api/atestado/upload", {
    method: "POST",
    body: formData,
  })

  const response = await res.json()

  if (!res.ok) throw new Error(JSON.stringify(response))

  return response
}

export default uploadAtestado
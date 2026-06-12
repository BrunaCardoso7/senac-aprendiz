// @/server/services/create-ajuda.ts
import { AjudaSchema } from "../schema/ajuda-schema"

async function createAjuda(data: AjudaSchema) {
  const res = await fetch("/api/ajuda", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const response = await res.json()

  if (!res.ok) throw new Error(JSON.stringify(response))

  return response
}

export default createAjuda
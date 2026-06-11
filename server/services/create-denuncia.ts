// @/server/services/create-denuncia.ts

import { DenunciaSchema } from "../schema/denuncia.schema"

async function createDenuncia(data: DenunciaSchema) {
  const res = await fetch("/api/denuncia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const response = await res.json()

  if (!res.ok) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default createDenuncia
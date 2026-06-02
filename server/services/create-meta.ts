import { MetaSchema } from "../schema/meta-schema"

async function createMeta(data: MetaSchema) {

  const res = await fetch("/api/meta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const response = await res.json()

  if (!res.ok) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default createMeta
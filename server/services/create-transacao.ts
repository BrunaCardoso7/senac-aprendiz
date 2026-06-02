import { TransacaoSchema } from "../schema/transacao-schema"

async function createTransacao(data: TransacaoSchema) {
  console.log("ENVIANDO", data)

  const res = await fetch("/api/transacao", {
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

export default createTransacao
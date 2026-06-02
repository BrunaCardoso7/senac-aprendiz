
async function listResumoTransacao(user_id: string | undefined) {
  const res = await fetch("/api/transacao/resumo?userId=" + user_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const response = await res.json()

  if (!res.ok) {
    console.error("Erro ao buscar resumo de transação:", response)
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default listResumoTransacao
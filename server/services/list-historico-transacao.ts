
async function listHistoricoTransacao(user_id: string | undefined, monthInitial?: string, monthFinal?: string) {
  const res = await fetch("/api/transacao/historico?userId=" + user_id + (monthInitial ? `&month_initial=${monthInitial}` : '') + (monthFinal ? `&month_final=${monthFinal}` : ''), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const response = await res.json()

  if (!res.ok) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default listHistoricoTransacao
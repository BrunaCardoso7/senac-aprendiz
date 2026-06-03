async function deleteTransacao(transacaoId: string) {
  const res = await fetch(`/api/transacao/delete?id=${transacaoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const response = await res.json()

  console.log('DELETE transacao status:', res.status)
  console.log('DELETE transacao response:', response)

  if (!res.ok) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default deleteTransacao

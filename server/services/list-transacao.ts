
async function listTransacao(user_id: string | undefined) {
  const res = await fetch("/api/transacao/?userId=" + user_id , {
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

export default listTransacao
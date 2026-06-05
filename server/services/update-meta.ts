const updateMetaAmount = async ({ id, amount }: { id: string; amount: number }) => {
  const res = await fetch(`/api/meta/update?id=${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message ?? 'Erro ao atualizar meta')
  }

  return res.json()
}

export default updateMetaAmount
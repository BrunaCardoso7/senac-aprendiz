async function deleteMeta(metaId: string) {
  const res = await fetch(`/api/meta/delete?id=${metaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const response = await res.json()

  console.log('DELETE meta status:', res.status)
  console.log('DELETE meta response:', response)

  if (!res.ok) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

export default deleteMeta

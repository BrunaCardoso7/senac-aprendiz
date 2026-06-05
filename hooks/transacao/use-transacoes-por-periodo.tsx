import { useQuery } from '@tanstack/react-query'

interface Transaction {
  id: string
  valor: number
  categoria: string
  data: string
  tipo_transacao: string // 👈 adiciona
}
async function fetchTransacoesByDateRange(
  userId: string | undefined,
  dataInicio: string,
  dataFim: string
): Promise<Transaction[]> {
  if (!userId) return []

  const res = await fetch(
    `/api/transacao?userId=${userId}&dataInicio=${dataInicio}&dataFim=${dataFim}`
  )

  if (!res.ok) {
    throw new Error('Erro ao buscar transações')
  }

  return res.json()
}

export function useTransacoesPorPeriodo(
  userId: string | undefined,
  mesAtual: string
) {
  // Extrai ano e mês
  const [year, month] = mesAtual.split('-').map(Number)
  
  // Data de início (primeiro dia do mês)
  const dataInicio = `${year}-${String(month).padStart(2, '0')}-01`
  
  // Data de fim (último dia do mês)
  const ultimoDia = new Date(year, month, 0).getDate()
  const dataFim = `${year}-${String(month).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`

  return useQuery({
    queryKey: ['transacoes', userId, dataInicio, dataFim],
    queryFn: () => fetchTransacoesByDateRange(userId, dataInicio, dataFim),
    enabled: !!userId,
  })
}

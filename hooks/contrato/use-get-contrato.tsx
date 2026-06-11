// use-get-contrato.ts
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/auth-context"

export const CONTRATO_QUERY_KEY = ["contrato"]

export function useGetContrato() {
  const { user } = useAuth()

  return useQuery({
    queryKey: [...CONTRATO_QUERY_KEY, user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/contrato/get?userId=${user?.id}`)

      if (res.status === 404) return null // usuário ainda sem contrato

      if (!res.ok) throw new Error("Erro ao buscar contrato")

      return res.json()
    },
    enabled: !!user?.id, // só dispara quando o user estiver disponível
  })
}
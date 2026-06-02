import listResumoTransacao from "@/server/services/list-resumo-transacao";
import { useQuery } from "@tanstack/react-query";

// hook
export function useResumoTransacaoQuery(userId: string | undefined) {
  return useQuery({
    queryKey: ["transacao", "resumo", userId,],
    queryFn: () => listResumoTransacao(userId),
    enabled: !!userId, // só roda se tiver userId
  })
}
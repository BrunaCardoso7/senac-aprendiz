import listHistoricoTransacao from "@/server/services/list-historico-transacao";
import { useQuery } from "@tanstack/react-query";

// hook
export function useHistoricoTransacaoQuery(userId: string | undefined, monthInitial?: string, monthFinal?: string) {
  return useQuery({
    queryKey: ["transacao", "historico", userId, monthInitial, monthFinal],
    queryFn: () => listHistoricoTransacao(userId, monthInitial, monthFinal),
    enabled: !!userId, // só roda se tiver userId
  })
}
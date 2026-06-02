import listHistoricoMeta from "@/server/services/list-historico-meta";
import { useQuery } from "@tanstack/react-query";

// hook
export function useHistoricoMetaQuery(userId: string | undefined, monthInitial?: string, monthFinal?: string) {
  return useQuery({
    queryKey: ["meta", "historico", userId, monthInitial, monthFinal],
    queryFn: () => listHistoricoMeta(userId, monthInitial, monthFinal),
    enabled: !!userId, // só roda se tiver userId
  })
}
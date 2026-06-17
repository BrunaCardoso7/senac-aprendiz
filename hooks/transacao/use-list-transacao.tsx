import listTransacao from "@/server/services/list-transacao";
import { useQuery } from "@tanstack/react-query";

// hook
export function useTransacaoQuery(userId: string | undefined) {
  return useQuery({
    queryKey: ["transacao"],
    queryFn: () => listTransacao(userId),
    enabled: !!userId, // só roda se tiver userId
  })
}
// @/hooks/atestado/use-list-atestados.ts
import listAtestados from "@/server/services/list-atestado"
import { useQuery } from "@tanstack/react-query"

export function useListAtestados(userId: string | undefined, search: string) {
  return useQuery({
    queryKey: ["atestados", userId, search],
    queryFn: () => listAtestados(userId!, search),
    enabled: !!userId,
  })
}
import listMeta from "@/server/services/list-meta";
import { useQuery } from "@tanstack/react-query";

// hook
export function useMetaQuery(userId: string | undefined) {
  return useQuery({
    queryKey: ["meta", userId],
    queryFn: () => listMeta(userId),
    enabled: !!userId, // só roda se tiver userId
  })
}
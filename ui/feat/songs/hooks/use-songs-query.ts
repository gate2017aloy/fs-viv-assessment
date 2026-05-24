import { useQuery } from "@tanstack/react-query"
import { GetSongsResponse, getSongs } from "@/api"

export const useSongsQuery = (
  currentPage: number,
  pageSize: number,
  enabled: boolean
) => {
  return useQuery<GetSongsResponse>({
    queryKey: ["songs", currentPage, pageSize],
    queryFn: () => getSongs(pageSize, (currentPage - 1) * pageSize),
    placeholderData: (prev) => prev,
    enabled,
  })
}

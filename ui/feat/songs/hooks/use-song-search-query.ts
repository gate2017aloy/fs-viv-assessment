import { useQuery } from "@tanstack/react-query"
import { Song, getSongByTitle } from "@/api"

export const useSongSearchQuery = (searchSubmittedQuery: string) => {
  return useQuery<Song | null>({
    queryKey: ["song-search", searchSubmittedQuery],
    queryFn: async () => {
      if (!searchSubmittedQuery) return null
      try {
        const song = await getSongByTitle(searchSubmittedQuery)
        return song
      } catch (err) {
        console.warn("Song not found during search:", err)
        return null
      }
    },
    enabled: !!searchSubmittedQuery,
    retry: false,
  })
}

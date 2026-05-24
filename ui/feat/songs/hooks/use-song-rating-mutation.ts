import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GetSongsResponse, updateSongRating, Song } from "@/api"

export const useSongRatingMutation = (
  searchSubmittedQuery: string,
  currentPage: number,
  pageSize: number
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ songId, rating }: { songId: string; rating: number }) =>
      updateSongRating(songId, rating),
    onSuccess: (updatedSong) => {
      if (searchSubmittedQuery) {
        queryClient.setQueryData<Song | null>(
          ["song-search", searchSubmittedQuery],
          (oldData) => {
            if (!oldData || oldData.id !== updatedSong.id) return oldData
            return { ...oldData, rating: updatedSong.rating }
          }
        )
      } else {
        queryClient.setQueryData<GetSongsResponse>(
          ["songs", currentPage, pageSize],
          (oldData) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              songs: oldData.songs.map((song) =>
                song.id === updatedSong.id
                  ? { ...song, rating: updatedSong.rating }
                  : song
              ),
            }
          }
        )
      }
    },
    onError: (error) => {
      console.error("Failed to update song rating:", error)
    },
  })
}

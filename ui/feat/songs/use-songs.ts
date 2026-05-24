import { useState } from "react"
import { GetSongsResponse, getSongs, updateSongRating, Song } from "@/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useSongs = (initialSongs: GetSongsResponse) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const queryClient = useQueryClient()

  // Query to fetch songs dynamically using React Query
  const { data, isLoading } = useQuery<GetSongsResponse>({
    queryKey: ["songs", currentPage, pageSize],
    queryFn: () => getSongs(pageSize, (currentPage - 1) * pageSize),
    placeholderData: (prev) => prev, // Keeps current data visible while fetching next page
  })

  // Mutation to update song ratings cleanly
  const ratingMutation = useMutation({
    mutationFn: ({ songId, rating }: { songId: string; rating: number }) =>
      updateSongRating(songId, rating),
    onSuccess: (updatedSong) => {
      // Optimistically update the React Query cache instantly for seamless UI response
      queryClient.setQueryData<GetSongsResponse>(
        ["songs", currentPage, pageSize],
        (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            songs: oldData.songs.map((song) =>
              song.id === updatedSong.id ? { ...song, rating: updatedSong.rating } : song
            ),
          }
        }
      )
    },
    onError: (error) => {
      console.error("Failed to update song rating:", error)
    },
  })

  const songs = data?.songs ?? initialSongs.songs
  const totalSongs = data?.total ?? initialSongs.total

  // Derive rating saving state natively from TanStack Mutation variables
  const ratingLoadingId = ratingMutation.isPending
    ? ratingMutation.variables?.songId
    : null

  // Pagination calculation
  const totalPages = Math.ceil(totalSongs / pageSize)
  const startItem = totalSongs === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalSongs)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  // Dashboard Stats (Calculated on current page data)
  const avgDanceability = songs.length > 0
    ? songs.reduce((acc, s) => acc + (s.danceability ?? 0), 0) / songs.length
    : 0

  const avgEnergy = songs.length > 0
    ? songs.reduce((acc, s) => acc + (s.energy ?? 0), 0) / songs.length
    : 0

  return {
    songs,
    totalSongs,
    isLoading,
    ratingLoadingId,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    handleRatingChange: (songId: string, rating: number) =>
      ratingMutation.mutate({ songId, rating }),
    totalPages,
    startItem,
    endItem,
    getPageNumbers,
    avgDanceability,
    avgEnergy,
  }
}

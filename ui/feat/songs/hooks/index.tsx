import { GetSongsResponse } from "@/api"
import { useSongsPagination } from "./use-songs-pagination"
import { useSongsSearch } from "./use-songs-search"
import { useSongsQuery } from "./use-songs-query"
import { useSongSearchQuery } from "./use-song-search-query"
import { useSongRatingMutation } from "./use-song-rating-mutation"
import { useSongStats } from "./use-song-stats"

// Re-export all constituent sub-hooks for external re-usability
export * from "./use-songs-pagination"
export * from "./use-songs-search"
export * from "./use-songs-query"
export * from "./use-song-search-query"
export * from "./use-song-rating-mutation"
export * from "./use-song-stats"

// Composed hook to keep the original UI integration perfectly intact
export const useSongs = (initialSongs: GetSongsResponse) => {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    getPageNumbers: getRawPageNumbers,
  } = useSongsPagination()

  const {
    searchQuery,
    setSearchQuery,
    searchSubmittedQuery,
    handleSearch,
    handleClearSearch,
  } = useSongsSearch(() => setCurrentPage(1))

  const { data, isLoading: isSongsLoading } = useSongsQuery(
    currentPage,
    pageSize,
    !searchSubmittedQuery
  )

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSongSearchQuery(searchSubmittedQuery)

  const ratingMutation = useSongRatingMutation(
    searchSubmittedQuery,
    currentPage,
    pageSize
  )

  // Determine active song list
  const songs = searchSubmittedQuery
    ? searchData
      ? [searchData]
      : []
    : (data?.songs ?? initialSongs.songs)

  const totalSongs = searchSubmittedQuery
    ? searchData
      ? 1
      : 0
    : (data?.total ?? initialSongs.total)

  const isLoading = searchSubmittedQuery ? isSearchLoading : isSongsLoading

  const ratingLoadingId = ratingMutation.isPending
    ? ratingMutation.variables?.songId
    : null

  // Pagination calculation
  const totalPages = Math.ceil(totalSongs / pageSize)
  const startItem = totalSongs === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalSongs)

  const getPageNumbers = () => getRawPageNumbers(totalPages)

  const { avgDanceability, avgEnergy } = useSongStats(songs)

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
    searchQuery,
    setSearchQuery,
    searchSubmittedQuery,
    handleSearch,
    handleClearSearch,
    isSearchError:
      isSearchError ||
      (!!searchSubmittedQuery && !isSearchLoading && !searchData),
  }
}

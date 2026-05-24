"use client"

import { GetSongsResponse } from "@/api"
import { useSongs } from "./use-songs"
import {
  PaginationControls,
  TrackHeader,
  SummaryStats,
  SongsTable,
  PageSizeSelector,
} from "./components"

interface SongsProps {
  songs: GetSongsResponse
}

export const Songs = ({ songs: initialSongs }: SongsProps) => {
  // Consume all state and business logic from the headless hook
  const {
    songs,
    totalSongs,
    isLoading,
    ratingLoadingId,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    handleRatingChange,
    totalPages,
    startItem,
    endItem,
    getPageNumbers,
    avgDanceability,
    avgEnergy,
  } = useSongs(initialSongs)

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 select-none md:py-12">
      {/* Title Header with Modern Gradient */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-center md:justify-between">
        <TrackHeader />

        {/* Dynamic Summary Cards */}
        <SummaryStats
          totalSongs={totalSongs}
          avgDanceability={avgDanceability}
          avgEnergy={avgEnergy}
        />
      </div>

      {/* Main Glassmorphic Table Container */}
      <div className="overflow-hidden rounded-2xl border border-border/75 bg-card/30 shadow-lg backdrop-blur-sm">
        <div className="w-full overflow-x-auto">
          <SongsTable
            songs={songs}
            isLoading={isLoading}
            pageSize={pageSize}
            ratingLoadingId={ratingLoadingId}
            handleRatingChange={handleRatingChange}
          />
        </div>

        {/* Premium Pagination Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/75 bg-muted/20 p-5 sm:flex-row">
          {/* Left Side: Page entries & Size Selector */}
          <PageSizeSelector
            startItem={startItem}
            endItem={endItem}
            totalSongs={totalSongs}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
          />

          {/* Right Side: Shadcn Pagination Controls */}
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            getPageNumbers={getPageNumbers}
          />
        </div>
      </div>
    </div>
  )
}

import * as React from "react"

interface PageSizeSelectorProps {
  startItem: number
  endItem: number
  totalSongs: number
  pageSize: number
  setPageSize: (size: number) => void
  setCurrentPage: (page: number) => void
  isLoading?: boolean
}

export const PageSizeSelector = ({
  startItem,
  endItem,
  totalSongs,
  pageSize,
  setPageSize,
  setCurrentPage,
  isLoading = false,
}: PageSizeSelectorProps) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="text-xs font-medium text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{startItem}</span> to{" "}
        <span className="font-semibold text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-foreground">{totalSongs}</span>{" "}
        tracks
      </span>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium whitespace-nowrap text-muted-foreground">
          Rows per page
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
            setCurrentPage(1)
          }}
          disabled={isLoading}
          className="h-8 rounded-lg border border-border/65 bg-background px-2.5 py-1 text-xs font-medium shadow-sm transition-all outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-border/50"
        >
          {[5, 10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

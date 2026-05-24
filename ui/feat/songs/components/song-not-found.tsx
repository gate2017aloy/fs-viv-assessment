import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface SongNotFoundProps {
  searchSubmittedQuery: string
  handleClearSearch: () => void
}

export const SongNotFound = ({
  searchSubmittedQuery,
  handleClearSearch,
}: SongNotFoundProps) => {
  return (
    <div className="flex animate-in flex-col items-center justify-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/10 p-12 text-center backdrop-blur-sm duration-300 fade-in slide-in-from-bottom-2">
      <div className="animate-pulse rounded-full bg-destructive/20 p-4 text-destructive">
        <AlertCircle className="size-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">Song Not Found</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          We couldn't find a track with the exact title{" "}
          <span className="font-semibold text-foreground">
            "{searchSubmittedQuery}"
          </span>
          . Please verify the casing and spelling, or search for another song.
        </p>
      </div>
      <Button
        onClick={handleClearSearch}
        variant="outline"
        size="sm"
        className="mt-2 h-9 border-destructive/30 transition-all duration-200 hover:border-destructive/40 hover:bg-destructive/20 hover:text-destructive"
      >
        Reset Search
      </Button>
    </div>
  )
}

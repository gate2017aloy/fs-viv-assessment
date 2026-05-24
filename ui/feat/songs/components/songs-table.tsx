import * as React from "react"
import { Song } from "@/api"
import { RatingStars } from "./rating-stars"
import { TableSkeleton } from "./table-skeleton"
import { SongDetailsRow } from "./song-details-row"
import { SongProgressBar } from "./song-progress-bar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"
import { formatDuration, formatTempo, formatLoudness, cn } from "@/lib/utils"
import {
  Sparkles,
  Zap,
  Clock,
  Gauge,
  Volume2,
  Music,
  Loader2,
  ChevronRight,
} from "lucide-react"

interface SongsTableProps {
  songs: Song[]
  isLoading: boolean
  pageSize: number
  ratingLoadingId: string | null
  handleRatingChange: (songId: string, rating: number) => void
}

interface ProgressCellProps {
  value?: number
  indicatorColorClass: string
  className?: string
}

const ProgressCell = ({
  value,
  indicatorColorClass,
  className,
}: ProgressCellProps) => {
  return (
    <TableCell className={cn("px-3 py-4", className)}>
      <SongProgressBar
        value={value}
        indicatorColorClass={indicatorColorClass}
        variant="inline"
      />
    </TableCell>
  )
}

export const SongsTable = ({
  songs,
  isLoading,
  pageSize,
  ratingLoadingId,
  handleRatingChange,
}: SongsTableProps) => {
  const [expandedSongId, setExpandedSongId] = React.useState<string | null>(
    null
  )

  const toggleRow = (songId: string) => {
    setExpandedSongId((prev) => (prev === songId ? null : songId))
  }

  return (
    <Table>
      <TableHeader className="border-b border-border/75 bg-muted/40">
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-72 px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">
            Track Title
          </TableHead>
          <TableHead className="hidden w-36 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase sm:table-cell">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Danceability
            </span>
          </TableHead>
          <TableHead className="hidden w-36 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase sm:table-cell">
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5" /> Energy
            </span>
          </TableHead>
          <TableHead className="hidden w-36 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase lg:table-cell">
            Valence
          </TableHead>
          <TableHead className="hidden w-28 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase md:table-cell">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> Duration
            </span>
          </TableHead>
          <TableHead className="hidden w-32 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase md:table-cell">
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5" /> Tempo
            </span>
          </TableHead>
          <TableHead className="hidden w-28 px-3 py-4 text-xs font-semibold text-muted-foreground uppercase xl:table-cell">
            <span className="flex items-center gap-1.5">
              <Volume2 className="size-3.5" /> Loudness
            </span>
          </TableHead>
          <TableHead className="w-36 px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">
            Rating
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-border/40">
        {isLoading ? (
          <TableSkeleton rows={pageSize} />
        ) : songs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-64 text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <Music className="size-10 animate-bounce text-muted-foreground/30" />
                <p className="text-sm font-medium text-muted-foreground">
                  No tracks found
                </p>
                <p className="text-xs text-muted-foreground/75">
                  Try modifying page limits or check the server status.
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          songs.map((song) => {
            const isExpanded = expandedSongId === song.id
            return (
              <React.Fragment key={song.id}>
                <TableRow
                  className={cn(
                    "group cursor-pointer border-b border-border/40 transition-colors duration-150 select-none hover:bg-muted/25",
                    isExpanded && "bg-muted/15 hover:bg-muted/20"
                  )}
                  onClick={() => toggleRow(song.id)}
                >
                  {/* Track Title */}
                  <TableCell className="px-6 py-4 font-medium text-foreground">
                    <div className="flex max-w-64 items-center gap-3">
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-hover:text-foreground",
                          isExpanded && "rotate-90 text-primary"
                        )}
                      />
                      <div className="truncate">
                        <p
                          className="truncate text-sm font-semibold"
                          title={song.title}
                        >
                          {song.title}
                        </p>
                        <p className="truncate font-mono text-[10px] text-muted-foreground">
                          ID: {song.id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Progress bars (Danceability, Energy, Valence) */}
                  <ProgressCell
                    value={song.danceability}
                    indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-cyan-500"
                    className="hidden sm:table-cell"
                  />
                  <ProgressCell
                    value={song.energy}
                    indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-amber-500"
                    className="hidden sm:table-cell"
                  />
                  <ProgressCell
                    value={song.valence}
                    indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-emerald-500"
                    className="hidden lg:table-cell"
                  />

                  {/* Technical stats */}
                  <TableCell className="hidden px-3 py-4 font-mono text-xs font-medium text-muted-foreground md:table-cell">
                    {formatDuration(song.duration_ms)}
                  </TableCell>
                  <TableCell className="hidden px-3 py-4 font-mono text-xs font-medium text-muted-foreground md:table-cell">
                    {formatTempo(song.tempo)}
                  </TableCell>
                  <TableCell className="hidden px-3 py-4 font-mono text-xs font-medium text-muted-foreground xl:table-cell">
                    {formatLoudness(song.loudness)}
                  </TableCell>

                  {/* Interactive Rating */}
                  <TableCell
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <RatingStars
                        rating={song.rating}
                        songId={song.id}
                        onChange={handleRatingChange}
                        disabled={ratingLoadingId === song.id}
                      />
                      {ratingLoadingId === song.id && (
                        <Loader2 className="size-3.5 shrink-0 animate-spin text-muted-foreground/60" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Details Row */}
                {isExpanded && <SongDetailsRow song={song} colSpan={8} />}
              </React.Fragment>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}

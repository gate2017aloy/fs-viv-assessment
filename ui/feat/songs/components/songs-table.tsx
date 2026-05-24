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

const ProgressCell = ({ value, indicatorColorClass, className }: ProgressCellProps) => {
  return (
    <TableCell className={cn("py-4 px-3", className)}>
      <SongProgressBar value={value} indicatorColorClass={indicatorColorClass} variant="inline" />
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
  const [expandedSongId, setExpandedSongId] = React.useState<string | null>(null)

  const toggleRow = (songId: string) => {
    setExpandedSongId(prev => (prev === songId ? null : songId))
  }

  return (
    <Table>
      <TableHeader className="bg-muted/40 border-b border-border/75">
        <TableRow className="hover:bg-transparent">
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-6 w-72">
            Track Title
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden sm:table-cell w-36">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Danceability
            </span>
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden sm:table-cell w-36">
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5" /> Energy
            </span>
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden lg:table-cell w-36">
            Valence
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden md:table-cell w-28">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> Duration
            </span>
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden md:table-cell w-32">
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5" /> Tempo
            </span>
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-3 hidden xl:table-cell w-28">
            <span className="flex items-center gap-1.5">
              <Volume2 className="size-3.5" /> Loudness
            </span>
          </TableHead>
          <TableHead className="font-semibold text-xs uppercase text-muted-foreground py-4 px-6 w-36">
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
                <Music className="size-10 text-muted-foreground/30 animate-bounce" />
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
                    "group border-b border-border/40 hover:bg-muted/25 transition-colors duration-150 cursor-pointer select-none",
                    isExpanded && "bg-muted/15 hover:bg-muted/20"
                  )}
                  onClick={() => toggleRow(song.id)}
                >
                  {/* Track Title */}
                  <TableCell className="py-4 px-6 font-medium text-foreground">
                    <div className="flex items-center gap-3 max-w-64">
                      <ChevronRight
                        className={cn(
                          "size-4 text-muted-foreground/60 transition-transform duration-200 shrink-0 group-hover:text-foreground",
                          isExpanded && "rotate-90 text-primary"
                        )}
                      />
                      <div className="truncate">
                        <p className="font-semibold text-sm truncate" title={song.title}>
                          {song.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono truncate">
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
                  <TableCell className="py-4 px-3 hidden md:table-cell font-mono text-xs text-muted-foreground font-medium">
                    {formatDuration(song.duration_ms)}
                  </TableCell>
                  <TableCell className="py-4 px-3 hidden md:table-cell font-mono text-xs text-muted-foreground font-medium">
                    {formatTempo(song.tempo)}
                  </TableCell>
                  <TableCell className="py-4 px-3 hidden xl:table-cell font-mono text-xs text-muted-foreground font-medium">
                    {formatLoudness(song.loudness)}
                  </TableCell>

                  {/* Interactive Rating */}
                  <TableCell className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <RatingStars
                        rating={song.rating}
                        songId={song.id}
                        onChange={handleRatingChange}
                        disabled={ratingLoadingId === song.id}
                      />
                      {ratingLoadingId === song.id && (
                        <Loader2 className="size-3.5 animate-spin text-muted-foreground/60 shrink-0" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Details Row */}
                {isExpanded && (
                  <SongDetailsRow song={song} colSpan={8} />
                )}
              </React.Fragment>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}


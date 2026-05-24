import * as React from "react"
import { Sparkles, Zap } from "lucide-react"

interface SummaryStatsProps {
  totalSongs: number
  avgDanceability: number
  avgEnergy: number
}

export const SummaryStats = ({
  totalSongs,
  avgDanceability,
  avgEnergy,
}: SummaryStatsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex min-w-28 flex-col rounded-xl border border-border/50 bg-card/45 px-4 py-2">
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          Total Tracks
        </span>
        <span className="font-mono text-xl font-bold">{totalSongs}</span>
      </div>
      <div className="flex min-w-28 flex-col rounded-xl border border-border/50 bg-card/45 px-4 py-2">
        <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          <Sparkles className="size-3 text-cyan-400" /> Avg Dance
        </span>
        <span className="font-mono text-xl font-bold text-cyan-500 dark:text-cyan-400">
          {(avgDanceability * 100).toFixed(0)}%
        </span>
      </div>
      <div className="flex min-w-28 flex-col rounded-xl border border-border/50 bg-card/45 px-4 py-2">
        <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          <Zap className="size-3 text-amber-500" /> Avg Energy
        </span>
        <span className="font-mono text-xl font-bold text-amber-500">
          {(avgEnergy * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

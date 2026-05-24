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
      <div className="flex flex-col px-4 py-2 bg-card/45 border border-border/50 rounded-xl min-w-28">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
          Total Tracks
        </span>
        <span className="text-xl font-bold font-mono">{totalSongs}</span>
      </div>
      <div className="flex flex-col px-4 py-2 bg-card/45 border border-border/50 rounded-xl min-w-28">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
          <Sparkles className="size-3 text-cyan-400" /> Avg Dance
        </span>
        <span className="text-xl font-bold font-mono text-cyan-500 dark:text-cyan-400">
          {(avgDanceability * 100).toFixed(0)}%
        </span>
      </div>
      <div className="flex flex-col px-4 py-2 bg-card/45 border border-border/50 rounded-xl min-w-28">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
          <Zap className="size-3 text-amber-500" /> Avg Energy
        </span>
        <span className="text-xl font-bold font-mono text-amber-500">
          {(avgEnergy * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

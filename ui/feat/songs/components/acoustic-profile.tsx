import * as React from "react"
import { Song } from "@/api"
import { Sparkles } from "lucide-react"
import { SongProgressBar } from "./song-progress-bar"

interface AcousticProfileProps {
  song: Song
}

export const AcousticProfile = ({ song }: AcousticProfileProps) => {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase select-none">
        <Sparkles className="size-3.5 text-cyan-500" /> Acoustic Profile
      </h4>
      <div className="space-y-3 rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm">
        <SongProgressBar
          label="Acousticness"
          value={song.acousticness}
          indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-emerald-500"
          variant="stacked"
        />
        <SongProgressBar
          label="Instrumentalness"
          value={song.instrumentalness}
          indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-indigo-500"
          variant="stacked"
        />
        <SongProgressBar
          label="Liveness"
          value={song.liveness}
          indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-purple-500"
          variant="stacked"
        />
      </div>
    </div>
  )
}

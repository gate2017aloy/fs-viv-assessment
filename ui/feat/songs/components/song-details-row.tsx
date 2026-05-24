import * as React from "react"
import { Song } from "@/api"
import { TableRow, TableCell } from "@/components/ui/table"
import { Sparkles } from "lucide-react"
import { SongProgressBar } from "./song-progress-bar"
import { MusicalSpecs } from "./musical-specs"
import { StructureDetails } from "./structure-details"

interface SongDetailsRowProps {
  song: Song
  colSpan?: number
}

export const SongDetailsRow = ({ song, colSpan = 8 }: SongDetailsRowProps) => {
  return (
    <TableRow className="bg-muted/10 hover:bg-muted/10 border-b border-border/40">
      <TableCell colSpan={colSpan} className="py-6 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Column 1: Detailed Progress Metrics */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 select-none">
              <Sparkles className="size-3.5 text-cyan-500" /> Acoustic Profile
            </h4>
            <div className="space-y-3 bg-background/50 border border-border/50 rounded-xl p-4 shadow-sm">
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

          {/* Column 2: Musical Characteristics */}
          <MusicalSpecs song={song} />

          {/* Column 3: Structural Track Metrics */}
          <StructureDetails song={song} />
        </div>
      </TableCell>
    </TableRow>
  )
}





import * as React from "react"
import { Song } from "@/api"
import { Zap } from "lucide-react"

interface StructureDetailsProps {
  song: Song
}

export const StructureDetails = ({ song }: StructureDetailsProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 select-none">
        <Zap className="size-3.5 text-amber-500" /> Structure Details
      </h4>
      <div className="bg-background/50 border border-border/50 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-border/40 pb-2 select-none">
          <span className="text-muted-foreground font-medium">Bars Count</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_bars !== undefined ? song.num_bars : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs border-b border-border/40 pb-2 select-none">
          <span className="text-muted-foreground font-medium">Sections</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_sections !== undefined ? song.num_sections : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs select-none">
          <span className="text-muted-foreground font-medium">Segments</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_segments !== undefined ? song.num_segments : "-"}
          </span>
        </div>
      </div>
    </div>
  )
}

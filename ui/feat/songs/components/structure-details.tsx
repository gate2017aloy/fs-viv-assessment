import * as React from "react"
import { Song } from "@/api"
import { Zap } from "lucide-react"

interface StructureDetailsProps {
  song: Song
}

export const StructureDetails = ({ song }: StructureDetailsProps) => {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase select-none">
        <Zap className="size-3.5 text-amber-500" /> Structure Details
      </h4>
      <div className="space-y-3 rounded-xl border border-border/50 bg-background/50 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/40 pb-2 text-xs select-none">
          <span className="font-medium text-muted-foreground">Bars Count</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_bars !== undefined ? song.num_bars : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-border/40 pb-2 text-xs select-none">
          <span className="font-medium text-muted-foreground">Sections</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_sections !== undefined ? song.num_sections : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs select-none">
          <span className="font-medium text-muted-foreground">Segments</span>
          <span className="font-mono font-bold text-foreground">
            {song.num_segments !== undefined ? song.num_segments : "-"}
          </span>
        </div>
      </div>
    </div>
  )
}

import * as React from "react"
import { Song } from "@/api"
import { Progress } from "@/components/ui/progress"
import { TableRow, TableCell } from "@/components/ui/table"
import { Sparkles, Music, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface SongDetailsRowProps {
  song: Song
  colSpan?: number
}

interface MetricProgressProps {
  label: string
  value?: number
  indicatorColorClass: string
}

const getMusicalKeyName = (key?: number, mode?: number): string => {
  if (key === undefined) return "-"
  const keyMap = [
    "C", "C♯/D♭", "D", "D♯/E♭", "E", "F",
    "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"
  ]
  const keyName = keyMap[key] || `Key ${key}`
  const modeName = mode === 1 ? "Major" : mode === 0 ? "Minor" : ""
  return `${keyName} ${modeName}`.trim()
}

const MetricProgress = ({ label, value, indicatorColorClass }: MetricProgressProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs select-none">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-mono font-bold text-foreground">
          {value !== undefined ? `${(value * 100).toFixed(0)}%` : "-"}
        </span>
      </div>
      {value !== undefined ? (
        <Progress
          value={value * 100}
          className={cn("h-1.5", indicatorColorClass)}
        />
      ) : (
        <div className="h-1.5 w-full bg-muted/40 rounded-full" />
      )}
    </div>
  )
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
              <MetricProgress
                label="Acousticness"
                value={song.acousticness}
                indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-emerald-500"
              />
              <MetricProgress
                label="Instrumentalness"
                value={song.instrumentalness}
                indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-indigo-500"
              />
              <MetricProgress
                label="Liveness"
                value={song.liveness}
                indicatorColorClass="[&>[data-slot=progress-indicator]]:bg-purple-500"
              />
            </div>
          </div>

          {/* Column 2: Musical Characteristics */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 select-none">
              <Music className="size-3.5 text-pink-500" /> Musical Specs
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/50 border border-border/50 rounded-xl p-3.5 shadow-sm text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold select-none">Key & Mode</p>
                <p className="text-sm font-bold text-foreground mt-1.5 select-all">
                  {getMusicalKeyName(song.key, song.mode)}
                </p>
              </div>
              <div className="bg-background/50 border border-border/50 rounded-xl p-3.5 shadow-sm text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold select-none">Time Signature</p>
                <p className="text-sm font-bold text-foreground mt-1.5 select-all">
                  {song.time_signature !== undefined ? `${song.time_signature}/4` : "-"}
                </p>
              </div>
              <div className="bg-background/50 border border-border/50 rounded-xl p-3.5 shadow-sm text-center col-span-2">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold select-none">Class / Category</p>
                <p className="text-sm font-bold text-foreground mt-1.5">
                  {song.class !== undefined ? (
                    <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
                      Class {song.class}
                    </span>
                  ) : song.class_label !== undefined ? (
                    <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold">
                      Class {song.class_label}
                    </span>
                  ) : (
                    <span className="text-muted-foreground/40">-</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Structural Track Metrics */}
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
        </div>
      </TableCell>
    </TableRow>
  )
}


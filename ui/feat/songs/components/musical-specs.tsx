import * as React from "react"
import { Song } from "@/api"
import { Music } from "lucide-react"

interface MusicalSpecsProps {
  song: Song
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

export const MusicalSpecs = ({ song }: MusicalSpecsProps) => {
  return (
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
  )
}

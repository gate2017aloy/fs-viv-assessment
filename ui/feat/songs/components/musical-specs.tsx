import * as React from "react"
import { Song } from "@/api"
import { Music } from "lucide-react"

interface MusicalSpecsProps {
  song: Song
}

const getMusicalKeyName = (key?: number, mode?: number): string => {
  if (key === undefined) return "-"
  const keyMap = [
    "C",
    "C♯/D♭",
    "D",
    "D♯/E♭",
    "E",
    "F",
    "F♯/G♭",
    "G",
    "G♯/A♭",
    "A",
    "A♯/B♭",
    "B",
  ]
  const keyName = keyMap[key] || `Key ${key}`
  const modeName = mode === 1 ? "Major" : mode === 0 ? "Minor" : ""
  return `${keyName} ${modeName}`.trim()
}

export const MusicalSpecs = ({ song }: MusicalSpecsProps) => {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase select-none">
        <Music className="size-3.5 text-pink-500" /> Musical Specs
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/50 bg-background/50 p-3.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase select-none">
            Key & Mode
          </p>
          <p className="mt-1.5 text-sm font-bold text-foreground select-all">
            {getMusicalKeyName(song.key, song.mode)}
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-background/50 p-3.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase select-none">
            Time Signature
          </p>
          <p className="mt-1.5 text-sm font-bold text-foreground select-all">
            {song.time_signature !== undefined
              ? `${song.time_signature}/4`
              : "-"}
          </p>
        </div>
        <div className="col-span-2 rounded-xl border border-border/50 bg-background/50 p-3.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase select-none">
            Class / Category
          </p>
          <p className="mt-1.5 text-sm font-bold text-foreground">
            {song.class !== undefined ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                Class {song.class}
              </span>
            ) : song.class_label !== undefined ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
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

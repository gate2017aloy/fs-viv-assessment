import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(ms?: number): string {
  if (!ms) return "-"
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function formatTempo(tempo?: number): string {
  if (!tempo) return "-"
  return `${Math.round(tempo)} BPM`
}

export function formatLoudness(dB?: number): string {
  if (dB === undefined) return "-"
  return `${dB.toFixed(1)} dB`
}


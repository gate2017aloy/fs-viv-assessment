import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SongProgressBarProps {
  value?: number
  indicatorColorClass: string
  variant?: "inline" | "stacked"
  label?: string
}

export const SongProgressBar = ({
  value,
  indicatorColorClass,
  variant = "inline",
  label,
}: SongProgressBarProps) => {
  if (variant === "inline") {
    return value !== undefined ? (
      <div className="flex items-center gap-3">
        <Progress
          value={value * 100}
          className={cn("w-16 h-1.5 shrink-0", indicatorColorClass)}
        />
        <span className="text-xs font-mono font-semibold">
          {(value * 100).toFixed(0)}%
        </span>
      </div>
    ) : (
      <span className="text-muted-foreground/40">-</span>
    )
  }

  // variant === "stacked"
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-xs select-none">
          <span className="text-muted-foreground font-medium">{label}</span>
          <span className="font-mono font-bold text-foreground">
            {value !== undefined ? `${(value * 100).toFixed(0)}%` : "-"}
          </span>
        </div>
      )}
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

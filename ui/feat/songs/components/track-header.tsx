import * as React from "react"

export const TrackHeader = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
        Track Explorer
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Browse, visualize, and rate audio metrics for your library.
      </p>
    </div>
  )
}

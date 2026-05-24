import * as React from "react"

export const TrackHeader = () => {
  return (
    <div>
      <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
        Track Explorer
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Browse, visualize, and rate audio metrics for your library.
      </p>
    </div>
  )
}

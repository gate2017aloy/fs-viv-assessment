import { Song } from "@/api"

export const useSongStats = (songs: Song[]) => {
  const avgDanceability =
    songs.length > 0
      ? songs.reduce((acc, s) => acc + (s.danceability ?? 0), 0) / songs.length
      : 0

  const avgEnergy =
    songs.length > 0
      ? songs.reduce((acc, s) => acc + (s.energy ?? 0), 0) / songs.length
      : 0

  return { avgDanceability, avgEnergy }
}

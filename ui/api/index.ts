import axios from "axios"

// Get base URL from environment or default to http://localhost:8000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// TypeScript interfaces matching the database models and api responses
export interface Song {
  id: string
  title: string
  danceability?: number
  energy?: number
  key?: number
  loudness?: number
  mode?: number
  acousticness?: number
  instrumentalness?: number
  liveness?: number
  valence?: number
  tempo?: number
  duration_ms?: number
  time_signature?: number
  num_bars?: number
  num_sections?: number
  num_segments?: number
  class?: number // JSON field mapped to "class" Column in DB
  class_label?: number // fallback mapping if backend uses attribute name
  rating?: number | null
}

export interface GetSongsResponse {
  songs: Song[]
  total: number
}

/**
 * Fetches all songs with pagination (limit and offset).
 * @param limit Number of items to retrieve (default: 10)
 * @param offset Number of items to skip (default: 0)
 */
export const getSongs = async (
  limit: number = 10,
  offset: number = 0
): Promise<GetSongsResponse> => {
  const response = await apiClient.get<GetSongsResponse>("/songs", {
    params: { limit, offset },
  })
  return response.data
}

/**
 * Fetches a single song by its exact title.
 * @param title The title of the song
 */
export const getSongByTitle = async (title: string): Promise<Song> => {
  const response = await apiClient.get<Song>(
    `/songs/${encodeURIComponent(title)}`
  )
  return response.data
}

/**
 * Updates the rating of a song by ID (value between 1 and 5).
 * @param songId The unique ID of the song
 * @param rating The new rating value (1 to 5)
 */
export const updateSongRating = async (
  songId: string,
  rating: number
): Promise<Song> => {
  const response = await apiClient.patch<Song>(
    `/songs/${songId}/rating`,
    null,
    {
      params: { rating },
    }
  )
  return response.data
}

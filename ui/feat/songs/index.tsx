import { GetSongsResponse } from "@/api"

interface SongsProps {
    songs: GetSongsResponse
}

export const Songs = ({ songs }: SongsProps) => {
    return (
        <div>
            <h1>Songs</h1>
            <p>{songs.total}</p>
            <ul>
                {songs.songs.map((song) => (
                    <li key={song.id}>
                        <p>{song.title}</p>
                        <p>{song.danceability}</p>
                        <p>{song.energy}</p>
                        <p>{song.key}</p>
                        <p>{song.loudness}</p>
                        <p>{song.mode}</p>
                        <p>{song.acousticness}</p>
                        <p>{song.instrumentalness}</p>
                        <p>{song.liveness}</p>
                        <p>{song.valence}</p>
                        <p>{song.tempo}</p>
                        <p>{song.duration_ms}</p>
                        <p>{song.time_signature}</p>
                        <p>{song.num_bars}</p>
                        <p>{song.num_sections}</p>
                        <p>{song.num_segments}</p>
                        <p>{song.class}</p>
                        <p>{song.class_label}</p>
                        <p>{song.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

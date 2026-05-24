import { GetSongsResponse, getSongs } from "@/api"
import { Songs } from "@/feat/songs"

const fetchBanks = async () => {
  const data = await getSongs()
  return data
}

type Bank = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default async function SongsPage() {
  const songs: GetSongsResponse = await fetchBanks()

  return <Songs songs={songs} />
}

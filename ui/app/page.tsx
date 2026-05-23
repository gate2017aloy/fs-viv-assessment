import axios from "axios"

const fetchBanks = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1")
  return data
}

type Bank = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default async function Page() {
  const banks: Bank = await fetchBanks()

  return (
    <div className="flex min-h-svh p-6">
      <div>
        <h1>{banks.title}</h1>
        <p>{banks.completed.toString()}</p>
        <p>{banks.id}</p>
        <p>{banks.userId}</p>
      </div>
    </div>
  )
}

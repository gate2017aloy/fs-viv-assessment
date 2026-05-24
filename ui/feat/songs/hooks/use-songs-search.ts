import { useState } from "react"

export const useSongsSearch = (onResetPage: () => void) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchSubmittedQuery, setSearchSubmittedQuery] = useState("")

  const handleSearch = (query: string) => {
    const trimmed = query.trim()
    setSearchSubmittedQuery(trimmed)
    onResetPage()
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchSubmittedQuery("")
    onResetPage()
  }

  return {
    searchQuery,
    setSearchQuery,
    searchSubmittedQuery,
    setSearchSubmittedQuery,
    handleSearch,
    handleClearSearch,
  }
}

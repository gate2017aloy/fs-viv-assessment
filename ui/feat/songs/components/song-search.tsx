import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Sparkles } from "lucide-react"

interface SongSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchSubmittedQuery: string
  handleSearch: (query: string) => void
  handleClearSearch: () => void
  isLoading: boolean
}

export const SongSearch = ({
  searchQuery,
  setSearchQuery,
  searchSubmittedQuery,
  handleSearch,
  handleClearSearch,
  isLoading,
}: SongSearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch(searchQuery)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/10 p-4 backdrop-blur-md transition-all duration-300 md:flex-row md:items-center md:justify-between"
    >
      <div className="relative flex-1">
        {/* Decorative Search Icon */}
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60 transition-colors" />

        {/* Shadcn Input Component */}
        <Input
          type="text"
          placeholder="Search track by exact title (e.g. 'Get Lucky')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-9 w-full bg-background/50 pr-9 pl-9 backdrop-blur-sm"
          disabled={isLoading}
        />

        {/* Clear (X) icon inside input */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground/60 transition-all duration-200 hover:bg-muted hover:text-foreground"
            aria-label="Clear input"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {searchSubmittedQuery && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearSearch}
            className="h-9 gap-1.5 border-dashed"
          >
            Clear Filter
          </Button>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={isLoading || !searchQuery.trim()}
          className="h-9 min-w-24 gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-medium text-white shadow-md transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500"
        >
          <Search className="size-4" />
          Search
        </Button>
      </div>
    </form>
  )
}

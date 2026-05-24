import { useState } from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number | null | undefined
  songId: string
  onChange: (songId: string, value: number) => void
  disabled: boolean
}

export const RatingStars = ({
  rating,
  songId,
  onChange,
  disabled,
}: RatingStarsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const currentRating = rating ?? 0

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hoverRating !== null ? star <= hoverRating : star <= currentRating
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            className={`transition-all duration-150 relative ${
              disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"
            }`}
            onClick={() => onChange(songId, star)}
            onMouseEnter={() => !disabled && setHoverRating(star)}
            onMouseLeave={() => !disabled && setHoverRating(null)}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              className={`size-4 transition-colors ${
                isFilled
                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.4)]"
                  : "text-muted-foreground/35 hover:text-amber-300"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

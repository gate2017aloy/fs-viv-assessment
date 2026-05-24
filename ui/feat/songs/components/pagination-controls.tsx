import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  isLoading: boolean
  getPageNumbers: () => (number | string)[]
}

export const PaginationControls = ({
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
  getPageNumbers,
}: PaginationControlsProps) => {
  return (
    <Pagination className="w-auto mx-0">
      <PaginationContent>
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) setCurrentPage((p) => p - 1)
            }}
            href="#"
            className={currentPage === 1 || isLoading ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Numbered pages */}
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(page as number)
                }}
                href="#"
                className={isLoading ? "pointer-events-none opacity-50" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) setCurrentPage((p) => p + 1)
            }}
            href="#"
            className={currentPage === totalPages || totalPages === 0 || isLoading ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

import * as React from "react"
import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  rows?: number
}

export const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <TableRow key={idx} className="border-border/40">
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 shrink-0 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16 opacity-60" />
              </div>
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Skeleton className="h-3 w-6" />
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Skeleton className="h-3 w-6" />
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-16 rounded-full" />
              <Skeleton className="h-3 w-6" />
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="hidden xl:table-cell">
            <Skeleton className="h-4 w-14" />
          </TableCell>
          <TableCell>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, sIdx) => (
                <Skeleton key={sIdx} className="size-4 rounded-full" />
              ))}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

import * as React from "react"
import { Song } from "@/api"
import { TableRow, TableCell } from "@/components/ui/table"
import { AcousticProfile } from "./acoustic-profile"
import { MusicalSpecs } from "./musical-specs"
import { StructureDetails } from "./structure-details"

interface SongDetailsRowProps {
  song: Song
  colSpan?: number
}

export const SongDetailsRow = ({ song, colSpan = 8 }: SongDetailsRowProps) => {
  return (
    <TableRow className="border-b border-border/40 bg-muted/10 hover:bg-muted/10">
      <TableCell colSpan={colSpan} className="px-8 py-6">
        <div className="grid animate-in grid-cols-1 gap-6 duration-200 fade-in slide-in-from-top-2 md:grid-cols-3">
          <AcousticProfile song={song} />
          <MusicalSpecs song={song} />
          <StructureDetails song={song} />
        </div>
      </TableCell>
    </TableRow>
  )
}

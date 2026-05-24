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
    <TableRow className="bg-muted/10 hover:bg-muted/10 border-b border-border/40">
      <TableCell colSpan={colSpan} className="py-6 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <AcousticProfile song={song} />
          <MusicalSpecs song={song} />
          <StructureDetails song={song} />
        </div>
      </TableCell>
    </TableRow>
  )
}






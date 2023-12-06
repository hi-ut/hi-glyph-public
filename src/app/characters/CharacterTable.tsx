"use client";
import { Link } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

function CharacterTable({
  tableData,
}: {
  tableData: {
    related: string | null;
    _count: {
      related: number;
    };
  }[];
}) {
  return (
    <div className="sm:p-2 sm:m-4">
      <Table
        color="primary"
        selectionMode="single" 
        >
        <TableHeader>
          <TableColumn>Related Character</TableColumn>
          <TableColumn>Glyphs</TableColumn>
        </TableHeader>
        <TableBody>
          {tableData.map((char) => (
            <TableRow key={char.related}>
              <TableCell>
                <Link color="primary" href={`/glyphs?related=${char.related}`}>{char.related}</Link>
              </TableCell>
              <TableCell>{char._count.related}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CharacterTable;

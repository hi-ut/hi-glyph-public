"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Link } from '@nextui-org/link';
import { Image } from "@nextui-org/image";

export default function RefImagesList({list}:{list:string[]}) {
  return (
    <div>
        <Table aria-label='table-of-ref-images'>
        <TableHeader>
        <TableColumn>字形画像</TableColumn>
        <TableColumn>URL</TableColumn>
      </TableHeader>
      <TableBody>
        { list.map((url,index) => (
          <TableRow key={index}>
          <TableCell>
           <Image width={32} height={32} src={url} alt={`ref image ${index}`} />
          </TableCell>
          <TableCell>
            <Link href={url}>
              {url}
            </Link>
          </TableCell>
        </TableRow>
        ))}
        
      </TableBody>
        </Table>
    </div>
  )
}

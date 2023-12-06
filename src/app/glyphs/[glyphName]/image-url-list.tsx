"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { uploadSvg } from "./actions";

interface Props {
  name: string;
  host: string;
}

function ImageUrlList({ name, host }: Props) {
  const generatedSvgUrl = `${host}/glyphs/${name}/image.svg`;
  const cachedSvgUrl = `https://hi-glyph-images.s3.ap-northeast-1.amazonaws.com/${name}.svg`;

  const [isCachedSvgExists, setIsCachedSvgExists] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(cachedSvgUrl, {
        cache: "no-cache",
      });
      setIsCachedSvgExists(response.ok);
    })();
  }, [cachedSvgUrl]);

  const CachedSvgCell = () => {
    if (isCachedSvgExists) {
      return (
        <Link href={cachedSvgUrl}>
          {/* <img src={cachedSvgUrl} alt={`Cached SVG of glyph ${name}`} />; */}
          {cachedSvgUrl}
        </Link>
      );
    } else {
      return (
        <form action={uploadSvg}>
          <input type="hidden" name="name" value={name} />
          <Button type="submit" size="sm">Upload</Button>
        </form>
      );
    }
  };

  return (
    <Table aria-label={`Image urls of glyph ${name}`}>
      <TableHeader>
        <TableColumn>字形画像</TableColumn>
        <TableColumn>URL</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>SVG(Generated)</TableCell>
          <TableCell>
            <Link href={`/glyphs/${name}/image.svg`}>
              {generatedSvgUrl}
            </Link>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>SVG(Cached)</TableCell>
          <TableCell>
            <CachedSvgCell />
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>PNG(32x32)</TableCell>
          <TableCell>
            <Link href={`/glyphs/${name}/image32.png`}>
              {`${host}/glyphs/${name}/image32.png`}
            </Link>
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>PNG(200x200)</TableCell>
          <TableCell>
            <Link href={`/glyphs/${name}/image200.png`}>
              {`${host}/glyphs/${name}/image200.png`}
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default ImageUrlList;

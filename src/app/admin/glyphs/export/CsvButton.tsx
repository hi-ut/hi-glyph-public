"use client";

import { GlyphData } from "@prisma/client";

interface Props {
  className?: string;
  label: string;
  data: GlyphData[];
}
function CsvButton({ className, label, data }: Props) {
  const exportTsv = (data: GlyphData[]) => {
    const tsvContent =
      "data:text/csv;charset=utf-8," +
      "name,related,data\n" +
      data
        .map((glyph) => {
          return `${glyph.name},${glyph.related},${glyph.data}\n`;
        })
        .join("");
    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  return (
    <button className={`btn ${className}`} onClick={() => exportTsv(data)}>
      {label}
    </button>
  );
}

export default CsvButton;

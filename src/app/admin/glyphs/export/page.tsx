import { prisma } from "@/lib/db/prisma";
import DownloadButton from "./DownloadButton";

async function glyphsExportPage() {
  const allData = await prisma.glyphData.findMany();

  return (
    <div className="flex flex-col">
      <h2 className="p-2 font-bold">Export Glyphs Data</h2>
      <div className="flex gap-4">
        <DownloadButton label="TSV" data={allData} className="btn-primary" />
        <button className="btn btn-primary" disabled>CSV</button>
        <button className="btn btn-primary" disabled>Excel</button>
      </div>
    </div>
  );
}

export default glyphsExportPage;

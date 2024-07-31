import { prisma } from "@/lib/db/prisma";
import TsvButton from "./TsvButton";
import CsvButton from "./CsvButton";

async function glyphsExportPage() {
  const allData = await prisma.glyphData.findMany();

  return (
    <div className="flex flex-col">
      <h2 className="p-2 font-bold">Export Glyphs Data</h2>
      <div className="flex gap-4">
        <TsvButton label="TSV" data={allData} className="btn-primary" />
        <CsvButton label="CSV" data={allData} className="btn-secondary" />
        <button className="btn btn-primary" disabled>Excel</button>
      </div>
    </div>
  );
}

export default glyphsExportPage;

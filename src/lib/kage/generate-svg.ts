import { Kage, Polygons } from "@kurgm/kage-engine";
import { getPartsInGlyph } from "./get-parts-in-glyph";

export default async function generateSVG({
  name,
  data,
}: {
  name: string;
  data: string;
}) {
  const kage = new Kage();
  kage.kBuhin.push(name, data);

  if (data.includes("$") || data.startsWith("99")) {
    const glyphsInData = await getPartsInGlyph(data);
    for (const glyph of glyphsInData) {
      const { name, data } = glyph;
      kage.kBuhin.push(name, data);
    }
  }

  const polygons = new Polygons();
  kage.makeGlyph(polygons, name);

  const svg = polygons.generateSVG() as string;

  return svg;
}

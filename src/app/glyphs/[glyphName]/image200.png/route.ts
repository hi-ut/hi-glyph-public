import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import generateSVG from "@/lib/kage/generate-svg";
import { generatePNG } from "@/lib/generate-png";

export async function GET(
  request: NextRequest,
  { params }: { params: { glyphName: string } }
) {
  const glyph = await prisma.glyphData.findUnique({
    where: { name: params.glyphName },
  });
  if (!glyph) {
    return new NextResponse("Glyph not found", { status: 404 });
  }

  if (!glyph.data) {
    return new NextResponse("Glyph data not found", { status: 404 });
  }

  const svg = await generateSVG({
    name: glyph.name,
    data: glyph.data,
  });
  const svgBuffer = Buffer.from(svg, "utf-8");

  const pngBuffer = await generatePNG(svgBuffer, 200);
  return new NextResponse(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

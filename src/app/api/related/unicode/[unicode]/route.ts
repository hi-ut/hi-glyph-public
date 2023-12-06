import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const unicodeSchema = z
  .string()
  .regex(/^u?\+?[0-9a-f]{4,5}$/i)
  .toLowerCase();

export async function GET(
  request: NextRequest,
  { params }: { params: { unicode: string } }
) {
  const { unicode: inputUnicode } = params;
  const unicodeValidation = unicodeSchema.safeParse(inputUnicode);

  if (!unicodeValidation.success) {
    return NextResponse.json({
      inputed_unicode: inputUnicode,
      error: unicodeValidation.error,
    });
  }

  let unicode = unicodeValidation.data;
  if (unicode.startsWith("u+")) {
    unicode = unicode.slice(2);
  }
  if (unicode.startsWith("u")) {
    unicode = unicode.slice(1);
  }
  const unicodeHex = parseInt("0x" + unicode, 16);
  const character = String.fromCodePoint(unicodeHex);

  const allRelated = await prisma.glyphData.findMany({
    where: {
      related: character,
    },
    select: {
      name: true,
      related: true,
      data: true,
    },
  });

  return NextResponse.json({
    inputed_unicode: inputUnicode,
    character,
    related_glyphs: allRelated,
  });
}

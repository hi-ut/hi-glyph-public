import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const characterSchema = z.string().trim().min(1).max(2);

export async function GET(
  request: NextRequest,
  { params }: { params: { character: string } }
) {
  const { character:inputCharacter } = params;
  const character = characterSchema.safeParse(inputCharacter);

  if (!character.success) {
    return NextResponse.json({
      status: 200,
      body: {
        path: request.nextUrl.pathname,
        params,
        error: character.error,
      },
    });
  }

  const allRelatedGlyphs = await prisma.glyphData.findMany({
    where:{
      related:character.data,
    }
  })

  return NextResponse.json({
    character: character.data,
    related: allRelatedGlyphs,
  });
}

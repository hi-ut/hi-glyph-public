import { GlyphDataCreate } from "../types";
import { prisma } from "./prisma";

export async function createGlyph(glyph: GlyphDataCreate) {
  const { name, related, data, publicAccess, creatorId } = glyph;
  try {
    await prisma.glyphData.create({
      data: {
        name,
        related,
        data,
        publicAccess,
        creator: {
          connect: {
            id: creatorId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

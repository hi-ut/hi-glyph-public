import { GlyphDataUpdate } from "../types";
import { prisma } from "./prisma";

export async function updateGlyph(glyph: GlyphDataUpdate) {
  const { name, related, data, publicAccess, } = glyph;
  try {
    const update = await prisma.glyphData.update({
      where: { name },
      data: {
        related,
        data,
        publicAccess,
      },
    });
    
  } catch (error) {
    console.log(error);
  }
}

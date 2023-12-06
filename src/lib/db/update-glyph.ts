import { GlyphDataUpdate } from "../types";
import { prisma } from "./prisma";

export async function updateGlyph(glyph: GlyphDataUpdate) {
  const { name, related, data, publicAccess, refImgUrls } = glyph;
  try {
    const update = await prisma.glyphData.update({
      where: { name },
      data: {
        related,
        data,
        publicAccess,
      },
    });

    // add new refImgUrls
    if (refImgUrls) {
      // clear existing refImgUrls
      await prisma.glyphReferenceImage.deleteMany({
        where: {
          glyphId: update.id,
        },
      });
      
      await Promise.all(
        refImgUrls.map(async (url) => {
          await prisma.glyphReferenceImage.create({
            data: {
              glyphId: update.id,
              url,
            },
          });
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

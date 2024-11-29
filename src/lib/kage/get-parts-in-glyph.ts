import { prisma } from "../db/prisma";
import { getGlyphDataByName } from "../glyphwiki/get-glyph-data";

interface Result {
  name: string;
  data: string;
}

export async function getPartsInGlyph(
  glyphData: string,
  results: Result[] = []
) {
  const glyphsInData = glyphData.split("$");
  console.log(glyphsInData);
  await Promise.all(
    glyphsInData
      .filter((glyph) => glyph.startsWith("99:"))
      .map(async (glyph) => {
        const _arr = glyph.split(":");
        const name = _arr[7];
        const result = await prisma.glyphData.findUnique({
          where: { name },
        });

        if (!result) {
          console.log(`Glyph ${name} not found in database`);
          console.log(`Fetching glyph ${name} from GlyphWiki...`);
          const glyphWikiData = await getGlyphDataByName(name);
          if (glyphWikiData) {
            const { name, related, data } = glyphWikiData;
            results.push({ name, data });

            const relatedChar = String.fromCodePoint(
              parseInt("0x" + related.slice(2), 16)
            ); // remove "U+"

            // TODO: use admin user
            const adminUser = await prisma.user.findFirst({
              where: { email: process.env.ADMIN_EMAIL },
            });
            
            const newGlyph = await prisma.glyphData.create({
              data: {
                name,
                data,
                related: relatedChar,
                publicAccess: true,
                creator: {
                  connect: {
                    id: adminUser?.id,
                  },
                },
              },
            });
          }
          return;
        } else {
          console.log(`Glyph ${name} found in database`);
        }
        const data = result.data as string;
        results.push({ name, data });
        // TODO: infinite loop when 99 
        if (data.startsWith("99") || data.includes("$")) {
          await getPartsInGlyph(data, results);
        }
      })
  );
  // console.log(results);
  return results;
}

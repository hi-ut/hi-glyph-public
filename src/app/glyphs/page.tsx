import Results from "@/app/glyphs/results";
import { authOptions } from "@/lib/auth-option";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";

interface SearchParams {
  name?: string;
  related?: string;
  term?: string;
}

async function glyphsHome({ searchParams }: { searchParams: SearchParams }) {
  const { name, related } = searchParams;

  const advancedRoles = ["ADMIN", "ADVANCED_USER"];
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const showAll = userRole !== undefined && advancedRoles.includes(userRole);

  const results = await prisma.glyphData.findMany({
    where: {
      name: {
        contains: name,
      },
      related: {
        contains: related,
      },
      publicAccess: showAll ? undefined : true,
    },
    include: {
      creator: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  console.log(results);
  // export type GlyphData= typeof results[0];

  return (
    <div>
      {/* @ts-ignore */}
      <Results glyphs={results} />
    </div>
  );
}

export default glyphsHome;

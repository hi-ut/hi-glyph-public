import { prisma } from "@/lib/db/prisma";
import CharacterTable from "./CharacterTable";

export default async function CharactersHome(){
  const allRelated = await prisma.glyphData.groupBy(
    {
      by:["related"],
      _count:{
          related: true
      }
    }
  );

  return (
    <>
      <h2 className="p-2 m-4 text-3xl font-bold">All related characters</h2>
      <CharacterTable tableData={allRelated} />
    </>
  )
}
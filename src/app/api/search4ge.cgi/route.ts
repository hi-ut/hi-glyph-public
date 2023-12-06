import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const queryResults = await prisma.glyphData.findMany({
    where: {
      related: query,
    },
    select: {
      name: true,
    },
  });
  const results = queryResults.map((result) => result.name).join("\t");
  // console.log(results);
  
  return new Response("data="+results, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',

      'Content-Type': 'text/plain',
    },
  })
}

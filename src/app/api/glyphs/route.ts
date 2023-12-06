import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "100";
  const name_contains = searchParams.get("name_contains") || undefined;
  const related = searchParams.get("related") || undefined;

  const results = await prisma.glyphData.findMany({
    skip: parseInt(skip),
    take: parseInt(take),
    where: {
      AND: [
        {
          name: {
            contains: name_contains,
          },
        },
        {
          related,
        },
      ],
    },
    select: {
      name: true,
      related: true,
      data: true,
      creator: {
        select: {
          name: true,
        },
      },
    },
  });

  const resultsLength = results.length;
  const took = resultsLength < parseInt(take) ? resultsLength : parseInt(take);

  return NextResponse.json({
    path: request.nextUrl.pathname,
    search_params: searchParams.toString(),
    found: resultsLength.toString(),
    skip,
    take:took.toString(),
    results,
  });
}

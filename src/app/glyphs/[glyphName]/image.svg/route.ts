import generateSVG from "@/lib/kage/generate-svg";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";

export async function GET(
  request: NextRequest,
  { params }: { params: { glyphName: string } }
) {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  const glyph = await prisma.glyphData.findUnique({
    where: { name: params.glyphName },
  });
  if (!glyph) {
    return new NextResponse("Glyph not found", { status: 404 });
  }

  if (!glyph.data) {
    return new NextResponse("Glyph data not found", { status: 404 });
  }

  // const advancedRoles = ["ADMIN", "ADVANCED_USER"];

  // if (!glyph.publicAccess) {
  //   if(!userRole) {
  //     return new NextResponse("Unauthorized", { status: 401 });
  //   }
  //   if (!session) {
  //     return new NextResponse("Unauthorized", { status: 401 });
  //   }
  //   if (
  //     !advancedRoles.includes(userRole)
  //     // && glyph.ownerId !== session.user.id
  //   ) {
  //     return new NextResponse("Unauthorized", { status: 401 });
  //   }
  // }

  const svg = await generateSVG({
    name: glyph.name,
    data: glyph.data,
  });

  const svgBlob = new Blob([svg], { type: "image/svg+xml" });

  const response = new NextResponse(svgBlob, {
    headers: { "content-type": "image/svg+xml" },
  });
  return response;
}

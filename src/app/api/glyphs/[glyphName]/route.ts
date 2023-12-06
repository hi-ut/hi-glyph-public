import { authOptions } from "@/lib/auth-option";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { glyphName: string } }
) {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const advancedRoles = ["ADMIN", "ADVANCED_USER"];
  const canAccessAll =
    userRole !== undefined && advancedRoles.includes(userRole);
  const glyphName = params.glyphName;

  if (!glyphName) {
    return NextResponse.json({
      path: request.nextUrl.pathname,
      desc: "This is the glyphs API route.",
    });
  }
  const glyph = await prisma.glyphData.findUnique({
    where: {
      name: glyphName,
    },
  });

  if (!glyph) {
    return NextResponse.json(
      {
        path: request.nextUrl.pathname,
        message: `字形「${glyphName}」は見つかりませんでした。`,
      },
      {
        status: 404,
      }
    );
  }

  // if (!glyph.publicAccess && !canAccessAll) {
  //   return NextResponse.json(
  //     {
  //       path: request.nextUrl.pathname,
  //       message: `Need authencation for ${glyphName}.`,
  //     },
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  const host = process.env.NEXTAUTH_URL || "";

  return NextResponse.json({
    path: request.nextUrl.pathname,
    glyph: glyph,
    glyph_image: {
      svg: `${host}/glyphs/${glyphName}/image.svg`,
      png12: `${host}/glyphs/${glyphName}/image12.png`,
      png32: `${host}/glyphs/${glyphName}/image32.png`,
      png200: `${host}/glyphs/${glyphName}/image200.png`,
    },
    message: `字形「${glyphName}」です。`,
  });
}

import { prisma } from "@/lib/db/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams;
  const host = process.env.NEXTAUTH_URL;
  const name = searchParams.get("name");
  const type = searchParams.get("type") || "svg";

  if(!name){
    return new Response(`"name" of glyph is required`, {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "text/plain",
      },
    });
  }

  const glyph = await prisma.glyphData.findUnique({
    where: {
      name,
    },
  });

  const notFonundUrl  = `${host}/no-img.svg`;
  if (!glyph) return new Response(notFonundUrl, {
    status: 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "text/plain",
    },
  });

  let ext = "";
  switch(type){
    case "svg":
      ext = ".svg";
      break;
    case "png12":
      ext = "12.png";
      break;
    case "png32":
      ext = "32.png";
      break;
    case "png200":
      ext = "200.png";
      break;
  }

  const url = `${host}/glyphs/${name}/image${ext}`;
  
  return new Response(url, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "text/plain;charset=utf-8",
    },
  });
}
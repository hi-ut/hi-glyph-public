'use server';

import { s3Upload } from "@/lib/s3-upload";

export async function uploadSvg(data:FormData){
  const name = data.get('name') as string
  const host = process.env.NEXTAUTH_URL
  const generatedSvgUrl = `${host}/glyphs/${name}/image.svg`;

  const svgFileArrayBuffer =await (await (await fetch(generatedSvgUrl)).blob()).arrayBuffer()
  const svgBuffer = Buffer.from(svgFileArrayBuffer)

  await s3Upload(`${name}.svg`, svgBuffer)
}
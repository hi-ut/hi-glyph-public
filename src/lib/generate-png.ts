import sharp from 'sharp';

export async function generatePNG(fileData:Buffer, size:number){
  const pngBuffer = await sharp(fileData)
    .resize(size, size)
    .png()
    .toBuffer()
  return pngBuffer
}
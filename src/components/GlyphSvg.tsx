import generateSVG from "@/lib/kage/generate-svg";
import Image from "next/image";

export async function GlyphSvg({
  name,
  data,
  width = 32,
  height = 32,
}: {
  name: string;
  data?: string | null;
  width?: number;
  height?: number;
}) {
  if (!data) return (
    <span>No SVG Data.</span>
  )
  const svg = await generateSVG({ name, data });
  const buff = Buffer.from(svg);
  const base64data = buff.toString("base64");

  return (
    <Image
      width={width}
      height={height}
      src={`data:image/svg+xml;base64,${base64data}`}
      alt=""
    />
  );
}

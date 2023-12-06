import generateSVG from "@/lib/kage/generate-svg";

export async function GET(request: Request){
  const url = new URL(request.url);
  console.log(url);
  const name = url.searchParams.get("name") || "preview";
  const data = url.searchParams.get("data") as string;
  const svg = await generateSVG({ name, data });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });

}
import { NextResponse } from "next/server";

export async function GET() {
  return new Response("Hello world!", {});
}

// https://stackoverflow.com/questions/76347162/cors-error-when-making-a-post-request-to-next-js-13-4-4-endpoint
export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}

export async function POST(request: Request) {
  console.log(await request.formData());
  // const body = await request.json();
  // console.log(body);
  // return NextResponse.json(body, {
  //   status: 200,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //     "Access-Control-Allow-Headers": "Content-Type, Authorization",

  //     "Content-Type": "text/json",
  //   },
  // });
}

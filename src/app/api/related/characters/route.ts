import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 200,
    body: {
      path: request.nextUrl.pathname,
      todo: "repsponse with a list of all related characters"
    },
  })
}
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

let startTime: number | null = null;

export async function POST(req: Request) {
  startTime = Date.now();
  return Response.json({ status: 200 });
}
export async function GET(req: Request) {
  if (startTime == null) {
    return Response.json({ ERROR: "The timer hasnt been initialize" });
  }
  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  return Response.json({ elapsedTime: elapsedTime });
}

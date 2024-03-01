import connectMongoDB from "~/lib/mongoDB";
import Image from "models/Image";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest) {
  await connectMongoDB();
  const images = await Image.find({});
  console.log(images);
  return NextResponse.json(images);
}

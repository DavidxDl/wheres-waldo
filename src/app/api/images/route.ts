import connectMongoDB from "~/lib/mongoDB";
import image from "models/image";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest) {
  await connectMongoDB();
  const images = await image.find({});
  console.log(images);
  return NextResponse.json(images);
}

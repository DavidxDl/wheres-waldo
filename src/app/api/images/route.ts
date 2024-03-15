import connectMongoDB from "~/lib/mongoDB";
import image from "models/image";
export async function GET(req: Request) {
  await connectMongoDB();
  const images = await image.find({});
  console.log(images);
  return Response.json(images);
}

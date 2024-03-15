import connectMongoDB from "~/lib/mongoDB";
import image from "models/image";

type Params = {
  imageId: string;
}

export async function PUT(req: Request, context: { params: Params }) {
  const id = context.params.imageId;
  console.log(`id: ${id}`);
  const reqBody = await req.json();
  await connectMongoDB();
  const newScore = { name: reqBody.name, score: reqBody.score };
  console.log(newScore);
  const document = await image.findByIdAndUpdate(
    id,
    { $push: { scores: newScore } },
    { new: true }
  );
  return Response.json({ newScore });
}

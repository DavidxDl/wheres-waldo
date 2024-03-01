import connectMongoDB from "~/lib/mongoDB";
import image from "models/image";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import React from "react";

export async function GET(req: Request, context: { params }) {
  const id = context.params.imageId;
  await connectMongoDB();
  const waldoImage = await image.findById(id);
  console.log(waldoImage);
  return NextResponse.json(waldoImage);
}

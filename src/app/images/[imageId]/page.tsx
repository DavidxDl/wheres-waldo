import React from "react";
import Game from "~/components/Game";
import { image } from "~/types"

export default async function ImagePage({
  params,
}: {
  params: { imageId: string };
}) {
  const image: image = await getImage(params.imageId);
  return <Game image={image} />;
}

async function getImage(id: string): Promise<image> {
  const res = await fetch(`${process.env.HOST}/api/images/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json() as image;
  console.log("this is the id:");
  console.log(id);

  console.log(`this is the data `);
  console.log(data);

  return data;
}

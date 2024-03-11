import React from "react";
import Game from "~/components/Game";

export default async function ImagePage({
  params,
}: {
  params: { imageId: string };
}) {
  const image = await getImage(params.imageId);
  return <Game image={image} />;
}

async function getImage(id: string) {
  const res = await fetch(`http://localhost:3000/api/images/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  console.log("this is the id:");
  console.log(id);

  console.log(`this is the data `);
  console.log(data);

  return data;
}

import React from "react";
import ImageGame from "~/components/ImageGame";

export default async function ImagePage({
  params,
}: {
  params: { imageId: string };
}) {
  const image = await getImage(params.imageId);
  return (
    <div>
      <ImageGame image={image} />
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-extrabold text-white">
          Some Info
        </h1>
      </div>
    </div>
  );
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

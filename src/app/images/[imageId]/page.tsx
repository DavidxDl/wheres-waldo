import React from "react";
import { character } from "~/app/testing/page";
import ImageGame from "~/components/ImageGame";
import Timer from "~/components/Timer";

export default async function ImagePage({
  params,
}: {
  params: { imageId: string };
}) {
  const image = await getImage(params.imageId);
  const startedTime = 0;
  return (
    <div>
      <ImageGame image={image} />
      <div className="bg-black/90 backdrop-blur-md text-white">
        <div className="flex justify-between px-5  text-3xl font-extrabold text-white">
          <div className=" flex items-end gap-4">
            <p className="">Characters: </p>
            <ul className="align-center gap-4 justify-center flex text-white font-extrabold text-2xl w-full">
              {image.characters.map((char: character) => (
                <li key={char.name}>{char.name}</li>
              ))}
            </ul>
          </div>
          <Timer />
        </div>
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

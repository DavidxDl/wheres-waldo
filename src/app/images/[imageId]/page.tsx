import React from "react";
import { character } from "~/app/testing/page";
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
      <div className="flex flex-col bg-black/90 backdrop-blur-md text-white">
        <div className="flex px-5  text-3xl font-extrabold text-white">
          <div>
            <p>Characters: </p>
          </div>
          <div className="text-center flex-grow ">Clock</div>
        </div>
        <div className="md:hidden">
          <h2 className="text-2xl font-extrabold text-center">Characters:</h2>
          <ul className="align-center gap-4 justify-center flex text-white font-extrabold text-2xl w-full">
            {image.characters.map((char: character) => (
              <li>{char.name}</li>
            ))}
          </ul>
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

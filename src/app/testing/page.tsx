import React from "react";
import ImageGame from "./ImageGame";

export interface character {
  name: string;
  x: number;
  y: number;
}
export interface image {
  _id: string;
  characters: character[];
}
const Test = async () => {
  const images = await getImages();
  return (
    <div>
      <ImageGame image={images[0]} />
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-extrabold text-white">
          Some Info
        </h1>
      </div>
    </div>
  );
};

export default Test;

async function getImages() {
  const res = await fetch("http://localhost:3000/api/images", {
    cache: "no-cache",
  });
  const data = await res.json();
  console.log(`this is the data `);
  console.log(...data);

  return data;
}

"use client";

import React, { useRef, useState } from "react";
import { character, image } from "~/app/testing/page";
import ImageGame from "./ImageGame";
import CharacterListItem from "./CharacterListItem";
import Timer from "~/components/Timer";

interface Props {
  image: image;
}

function Game({ image }: Props) {
  const [discoveredCharacters, setDiscoveredCharacters] = useState<Set<string>>(
    new Set()
  );
  const elapsedTime = useRef(0);
  if (discoveredCharacters.size == image.characters.length)
    return <div>You Win your score {elapsedTime.current}</div>;
  return (
    <div>
      <ImageGame
        image={image}
        discoveredCharacters={discoveredCharacters}
        setDiscoveredCharacters={setDiscoveredCharacters}
      />
      <div className="bg-black/90 backdrop-blur-md text-white">
        <div className="flex justify-between px-5  text-3xl font-extrabold text-white">
          <div className=" flex items-end gap-4">
            <p className="">Characters: </p>
            <ul className="align-center gap-4 justify-center flex text-white font-extrabold text-2xl w-full">
              {image.characters.map((char: character) => (
                <CharacterListItem
                  character={char.name}
                  key={char.name}
                  isFound={discoveredCharacters.has(char.name)}
                />
              ))}
            </ul>
          </div>
          <Timer passedTime={elapsedTime} />
        </div>
      </div>
    </div>
  );
}

export default Game;

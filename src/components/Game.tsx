"use client";

import React, { useRef, useState } from "react";
import { character, image } from "~/types";
import ImageGame from "./ImageGame";
import CharacterListItem from "./CharacterListItem";
import Timer from "~/components/Timer";
import WinnerPanel from "./WinnerPanel";
import Scores from "./Scores";

interface Props {
  image: image;
}

function Game({ image }: Props) {
  const [discoveredCharacters, setDiscoveredCharacters] = useState<Set<string>>(
    new Set()
  );
  const elapsedTime = useRef(0);
  const gameOver = discoveredCharacters.size == image.characters.length;
  return (
    <div>
      <ImageGame
        image={image}
        discoveredCharacters={discoveredCharacters}
        setDiscoveredCharacters={setDiscoveredCharacters}
      >
        {gameOver && <WinnerPanel score={elapsedTime.current} id={image._id} >
          <Scores scores={image.scores} />
        </WinnerPanel>}
      </ImageGame>
      {!gameOver && (
        <div className="bg-black/90 backdrop-blur-md text-white">
          <div className="flex items-center px-5  text-3xl font-extrabold text-white">
            <div className=" flex items-end gap-4 mx-auto">
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
      )}
    </div>
  );
}

export default Game;

"use client";

import React, { useRef, useState } from "react";
import { character, image } from "~/types";
import ImageGame from "./ImageGame";
import CharacterListItem from "./CharacterListItem";
import Timer from "~/components/Timer";
import WinnerPanel from "./WinnerPanel";
import Scores from "./Scores";
import UIPannel from "~/components/UIPannel"

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
        <UIPannel discoveredCharacters={discoveredCharacters} characters={image.characters} >
          <Timer elapsedTime={elapsedTime.current} />
        </UIPannel>
      )}
    </div>
  );
}

export default Game;

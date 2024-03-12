import React, { SetStateAction, useState } from "react";
import { character, image } from "../app/testing/page";

interface Props {
  position: { x: number; y: number };
  setSelected: React.Dispatch<SetStateAction<null | character>>;
  characters: character[];
  closeSelf: (b: boolean) => void;
  imageSize: DOMRect | undefined;
  discoveredCharacters: Set<string>;
}

const OFFSET = 40;

const CharacterList = ({
  position,
  setSelected,
  characters,
  closeSelf,
  imageSize,
  discoveredCharacters,
}: Props) => {
  const mousePos = imageSize
    ? getMousePos(imageSize, position)
    : { x: 1, y: 1 };

  function handleClick(char: character) {
    setSelected(char);
    closeSelf(false);
  }
  return (
    <div
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
      className="text-shadow roll-down text-xl text-[#ff0]  shadow shadow-black flex justify-center z-10 rounded p-3 bg-white/30 border-[1px] border-white/80 backdrop-blur-[2px] absolute min-h-32 min-w-28"
    >
      <ul className="flex flex-col items-center w-full">
        {characters.map(
          (char) =>
            !discoveredCharacters.has(char.name) && (
              <li
                key={char.name}
                onClick={() => handleClick(char)}
                className="
            capitalize font-bold
            hover:scale-110 hover:cursor-pointer
            active:translate-y-[-2px] transition-transform

            "
              >
                {char.name}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

function getMousePos(imageSize: DOMRect, position: { x: number; y: number }) {
  const tmpPos = {
    x: position.x * imageSize.width,
    y: position.y * imageSize.height,
  };
  if (tmpPos.x + OFFSET * 3 >= imageSize.width) {
    tmpPos.x -= OFFSET * 4;
  } else {
    tmpPos.x += OFFSET;
  }
  if (tmpPos.y + OFFSET * 2 >= imageSize.height) {
    tmpPos.y -= OFFSET * 3;
  }
  return tmpPos;
}

export default CharacterList;

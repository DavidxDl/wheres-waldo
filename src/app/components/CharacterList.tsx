import React, { SetStateAction, useState } from "react";
import { character, image } from "../testing/page";

interface Props {
  position: { x: number; y: number };
  setSelected: React.Dispatch<SetStateAction<null | character>>;
  characters: character[];
  closeSelf: (b: boolean) => void;
}

const CharacterList = ({
  position,
  setSelected,
  characters,
  closeSelf,
}: Props) => {
  function handleClick(char: character) {
    setSelected(char);
    closeSelf(false);
  }
  return (
    <div
      style={{ left: position.x, top: position.y }}
      className="flex justify-center z-10 rounded p-3 bg-white/30 border-[1px] border-white/80 backdrop-blur-[2px] absolute h-32 w-28"
    >
      <ul className="flex flex-col items-center w-full">
        {characters.map((char) => (
          <li
            key={char.name}
            onClick={() => handleClick(char)}
            className="capitalize font-bold hover:scale-110 hover:cursor-pointer active:translate-y-[-2px] transition-transform"
          >
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;

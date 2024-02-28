import React, { SetStateAction, useState } from "react";
import { character, image } from "../testing/page";

interface Props {
  onTarget: React.MutableRefObject<true | false>;
  position: { x: number; y: number };
  setSelected: React.Dispatch<SetStateAction<null | character>>;
  characters: character[];
  closeSelf: (b: boolean) => void;
}

const CharacterList = ({
  onTarget,
  position,
  setSelected,
  characters,
  closeSelf,
}: Props) => {
  const [result, setResults] = useState<null | string>(null);
  function handleClick(char: character) {
    setSelected(char);
    closeSelf(false);
  }
  return (
    <div
      style={{ left: position.x, top: position.y }}
      className="flex justify-center z-10 rounded p-3 bg-white/30 border-[1px] border-white/80 backdrop-blur-[2px] absolute h-32 w-28"
    >
      {result ? (
        <p className="hover:cursor-default">{result}</p>
      ) : (
        <ul className="flex flex-col items-center w-full">
          {characters.map((char) => (
            <li
              onClick={() => handleClick(char)}
              className="capitalize font-bold hover:scale-110 hover:cursor-pointer active:translate-y-[-2px] transition-transform"
            >
              {char.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;

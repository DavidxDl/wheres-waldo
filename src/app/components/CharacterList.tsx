import React, { useState } from "react";

interface Props {
  onTarget: React.MutableRefObject<true | false>;
  position: { x: number; y: number };
}

const CharacterList = ({ onTarget, position }: Props) => {
  const [result, setResults] = useState<null | string>(null);
  function handleClick() {
    if (onTarget.current) {
      setResults("✅");
    } else {
      setResults("❌");
    }
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
          <li
            onClick={handleClick}
            className="transition-transform duration-400 active:translate-y-[-10px] hover:scale-110 hover:cursor-pointer p-0 m-0"
          >
            👲 Waldo
          </li>
        </ul>
      )}
    </div>
  );
};

export default CharacterList;

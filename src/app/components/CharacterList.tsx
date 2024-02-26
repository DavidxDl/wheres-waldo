import React from "react";

interface Props {
  onTarget: React.MutableRefObject<true | false>;
  position: { x: number; y: number };
}

const CharacterList = ({ onTarget, position }: Props) => {
  return (
    <div
      style={{ left: position.x, top: position.y }}
      className="z-10 rounded p-3 bg-white/30 border-[1px] border-white/80 backdrop-blur-[2px] absolute h-32 w-28"
    >
      <ul className="flex flex-col items-center w-full">
        <li
          onClick={() => onTarget.current && console.log("YOU WIN!")}
          className="transition-transform duration-400 active:translate-y-[-10px] hover:scale-110 hover:cursor-pointer p-0 m-0"
        >
          👲 Waldo
        </li>
      </ul>
    </div>
  );
};

export default CharacterList;

"use client";

import React, { useEffect, useState } from "react";
interface Props {
  isFound: boolean;
  character: string;
}
function CharacterListItem({ isFound, character }: Props) {
  return (
    <li className={` min-w-[120px] flex flex-col items-center justify-center  `}>
      <div className={`${isFound ? "found-character" : ""}`}>
        <img className="w-14 h-14 rounded-full" src={`/images/${character}.jpg`} />
      </div >
      {character}
    </li>
  );
}

export default CharacterListItem;

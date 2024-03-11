"use client";

import React, { useEffect, useState } from "react";
interface Props {
  isFound: boolean;
  character: string;
}
function CharacterListItem({ isFound, character }: Props) {
  return <li className={isFound ? "found-character" : ""}>{character}</li>;
}

export default CharacterListItem;

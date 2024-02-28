"use client";

import React, { useRef, useState, useEffect } from "react";
import CharacterList from "../components/CharacterList";
import { image, character } from "./page";

const ZOOM_FACTOR = 2; // Adjust zoom level
const OFFSET_X = 40;
const ZOOM_SIZE = 120; // Adjust zoomed area size

interface Props {
  image: image;
}

export default function ImageGame({ image }: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const winnerText = useRef<null | HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [discoveredCharacters, setDiscoveredCharacters] = useState(new Set());
  const [zoomStyle, setZoomStyle] = useState({});
  const [showCharacterList, setShowCharacterList] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<null | character>(
    null
  );

  function handleClick(
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    if (e.target !== imageRef.current) return;

    imageRef.current.style.cursor =
      imageRef.current.style.cursor === "default" ? "none" : "default";

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const normalizedX = clientX / width;
    const normalizedY = clientY / height;

    console.log(normalizedX, normalizedY);
    if (showCharacterList) {
      setShowCharacterList(false);
    } else {
      setShowCharacterList(true);
    }

    setMousePosition({
      x: normalizedX,
      y: normalizedY,
    });
  }

  if (
    selectedCharacter &&
    !discoveredCharacters.has(selectedCharacter.name) &&
    mousePosition.y >= selectedCharacter.y - 0.05 &&
    mousePosition.y <= selectedCharacter.y + 0.05 &&
    mousePosition.x >= selectedCharacter.x - 0.02 &&
    mousePosition.x <= selectedCharacter.x + 0.02
  ) {
    !discoveredCharacters.has(selectedCharacter.name) &&
      setDiscoveredCharacters((s) =>
        new Set(discoveredCharacters).add(selectedCharacter.name)
      );
    if (winnerText.current) {
      winnerText.current.classList.add("dissapear");
      setTimeout(() => winnerText.current?.classList.remove("dissapear"), 5000);
    }
  } else if (selectedCharacter) setSelectedCharacter(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const containerRect = imageRef.current?.getBoundingClientRect();
      if (containerRect && !showCharacterList) {
        const offsetX = e.pageX - containerRect.left;
        const offsetY = e.pageY - containerRect.top;

        const zoomX = offsetX - ZOOM_SIZE / 2;
        const zoomY = offsetY - ZOOM_SIZE / 2;

        const imageWidth = containerRect.width * ZOOM_FACTOR;
        const imageHeight = containerRect.height * ZOOM_FACTOR;

        const backgroundPosX = -(offsetX * ZOOM_FACTOR - ZOOM_SIZE / 2);
        const backgroundPosY = -(offsetY * ZOOM_FACTOR - ZOOM_SIZE / 2);

        setZoomStyle({
          border: "none",
          display: "block",
          width: `${ZOOM_SIZE}px`,
          height: `${ZOOM_SIZE}px`,
          top: `${zoomY}px`,
          left: `${zoomX}px`,
          backgroundSize: `${imageWidth}px ${imageHeight}px`,
          backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`,
        });
      }
    }

    imageRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      imageRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCharacterList]);

  return (
    <div className="overflow-x-hidden h-full relative bg-black  overflow-y-scroll">
      <img
        ref={imageRef}
        src={`images/${image._id}.jpg`}
        style={{ filter: `${showCharacterList ? "blur(2px)" : ""} ` }}
        className={`max-h-[616px] aspect-ratio-custom hover:cursor:none grow aspect-video relative  w-full `}
        onClick={handleClick}
        onMouseLeave={() => {
          if (!showCharacterList && imageRef.current) {
            setZoomStyle({
              ...zoomStyle,
              display: "none",
            });
          }
        }}
      />
      <div
        className="zoom  shadow shadow-black rounded-full  absolute bg-black bg-no-repeat bg-contained"
        style={{
          ...zoomStyle,
          backgroundImage: `url("images/${image._id}.jpg")`,
          position: "absolute",
          zIndex: 2,
          pointerEvents: "none",
          border: `${showCharacterList ? "3px solid red" : "none"}`,
        }}
      ></div>
      {showCharacterList && (
        <CharacterList
          setSelected={setSelectedCharacter}
          characters={image.characters}
          position={mousePosition}
          closeSelf={setShowCharacterList}
          imageSize={imageRef.current?.getBoundingClientRect()}
        />
      )}
      {image.characters.map((char) => (
        <div
          key={char.name}
          style={{
            display: `${discoveredCharacters.has(char.name) ? "block" : "none"}`,
            top: `${char.y * imageRef.current?.getBoundingClientRect().height - OFFSET_X}px`,
            left: `${char.x * imageRef.current?.getBoundingClientRect().width - OFFSET_X}px`,
          }}
          className="absolute w-16 h-16 rounded-full bg-none border-2 border-red-700"
        ></div>
      ))}
      <div
        ref={winnerText}
        className="hidden  items-center justify-center text-white font-bold text-xl absolute h-10 w-full left-0 right-0 bottom-0 bg-black/90"
      >
        ✅ Well Done
      </div>
    </div>
  );
}

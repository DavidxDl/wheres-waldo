"use client";

import React, { useRef, useState, useEffect } from "react";
import CharacterList from "../components/CharacterList";

const WALDO = { x: 0.8541284403669724, y: 0.7372069317023445 };
const ZOOM_FACTOR = 2; // Adjust zoom level
const OFFSET_X = 18;
const ZOOM_SIZE = 120; // Adjust zoomed area size

export default function Testing() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const onTarget = useRef(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showCharacterList, setShowCharacterList] = useState(false);

  function handleClick(
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    if (e.target !== containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const normalizedX = clientX / width;
    const normalizedY = clientY / height;

    if (
      normalizedY >= WALDO.y - 0.05 &&
      normalizedY <= WALDO.y + 0.05 &&
      normalizedX >= WALDO.x - 0.02 &&
      normalizedX <= WALDO.x + 0.02
    ) {
      onTarget.current = true;
    } else {
      onTarget.current = false;
    }
    console.log(normalizedX, normalizedY);
    if (showCharacterList) {
      setShowCharacterList(false);
    } else {
      setShowCharacterList(true);
    }

    setMousePosition({ x: e.pageX + OFFSET_X, y: e.pageY });
  }

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (e.target !== containerRef.current) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const offsetX = e.pageX - containerRect.left;
        const offsetY = e.pageY - containerRect.top;

        const zoomX = offsetX - ZOOM_SIZE / 2;
        const zoomY = offsetY - ZOOM_SIZE / 2;

        const imageWidth = containerRect.width * ZOOM_FACTOR;
        const imageHeight = containerRect.height * ZOOM_FACTOR;

        const backgroundPosX = -(offsetX * ZOOM_FACTOR - ZOOM_SIZE / 2);
        const backgroundPosY = -(offsetY * ZOOM_FACTOR - ZOOM_SIZE / 2);

        setZoomStyle({
          width: `${ZOOM_SIZE}px`,
          height: `${ZOOM_SIZE}px`,
          top: `${zoomY}px`,
          left: `${zoomX}px`,
          backgroundImage: `url("images/wallpaperflare.com_wallpaper.jpg")`,
          backgroundSize: `${imageWidth}px ${imageHeight}px`,
          backgroundPosition: `${backgroundPosX}px ${backgroundPosY}px`,
        });
      }
    }

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="overflow-x-hidden h-full relative bg-black  overflow-y-scroll">
      <img
        ref={containerRef}
        src="images\wallpaperflare.com_wallpaper.jpg"
        className="hover:cursor-none grow aspect-video relative  w-full"
        onClick={handleClick}
      />
      <div
        className="zoom  shadow shadow-black rounded-full  absolute bg-black bg-no-repeat bg-contained"
        style={{
          ...zoomStyle,
          position: "absolute",
          zIndex: 2,
          pointerEvents: "none",
        }}
      ></div>
      {showCharacterList && (
        <CharacterList onTarget={onTarget} position={mousePosition} />
      )}
    </div>
  );
}

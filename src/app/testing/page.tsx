"use client";

import { useRef, useState, useEffect } from "react";

const WALDO = { x: 0.8926905132192846, y: 0.5030487804878049 };
const ZOOM_FACTOR = 2; // Adjust zoom level
const OFFSET_X = 18;
const ZOOM_SIZE = 100; // Adjust zoomed area size

export default function Testing() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const onTarget = useRef(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const dib = useRef<HTMLDivElement | null>(null);

  function handleClick(
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) {
    if (e.target !== containerRef.current) return;

    const { clientX, clientY } = e;
    const { scrollX, scrollY } = window;
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
    if (dib.current && e.target !== dib.current) {
      if (dib.current.style.display === "none") {
        dib.current.style.display = "block";
        dib.current.style.top = `${e.pageY}px`;
        dib.current.style.left = `${e.pageX + OFFSET_X}px`;
      } else {
        dib.current.style.display = "none";
      }
    }
  }
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (e.target !== containerRef.current) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect && e.target !== dib.current) {
        const offsetX = e.pageX - containerRect.left;
        const offsetY = e.pageY - containerRect.top;

        const normalizedX = offsetX / containerRect.width;
        const normalizedY = offsetY / containerRect.height;

        const zoomX = normalizedX * containerRect.width - ZOOM_SIZE / 2;
        const zoomY = normalizedY * containerRect.height - ZOOM_SIZE / 2;

        setZoomStyle({
          width: `${ZOOM_SIZE}px`,
          height: `${ZOOM_SIZE}px`,
          top: `${zoomY}px`,
          left: `${zoomX}px`,
          backgroundImage: `url("images/wallpaperflare.com_wallpaper.jpg")`,
          backgroundSize: `${containerRect.width * ZOOM_FACTOR}px auto`,
          backgroundPosition: `-${zoomX * ZOOM_FACTOR}px -${zoomY * ZOOM_FACTOR}px`,
        });
      }
      setMousePosition({ x: e.pageX, y: e.pageY });
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: `url("images/wallpaperflare.com_wallpaper.jpg")`,
      }}
      className="grow  bg-contain bg-no-repeat xl:bg-cover relative max-h-[380px]  w-full zoom "
      onClick={handleClick}
    >
      <div
        className="shadow shadow-black rounded-full  absolute bg-black bg-no-repeat bg-cover"
        style={{
          ...zoomStyle,
          position: "absolute",
          zIndex: 2,
          pointerEvents: "none",
        }}
      ></div>
      <div
        ref={dib}
        className="z-10 hidden rounded p-3 bg-white/30 border-[1px] border-white/80 backdrop-blur-[2px] absolute h-32 w-28"
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
    </div>
  );
}

import React from "react";
interface Props {
  zoomStyle: object;
  image: string;
  showCharacterList: boolean;
}
function Zoom({ zoomStyle, image, showCharacterList }: Props) {
  return (
    <div
      className={` z-[2] pointer-events-none zoom shadow shadow-black rounded-full  absolute bg-black bg-no-repeat bg-contained`}
      style={{
        ...zoomStyle,
        backgroundImage: `url("/images/${image}.jpg")`,
        border: `${showCharacterList ? "3px solid red" : "none"}`,
      }}
    ></div>
  );
}

export default Zoom;

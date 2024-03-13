import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  score: number;
}

function WinnerPanel({ score }: Props) {
  return (
    <div>
      <div className=" gap-3 flex flex-col items-center justify-center z-50 absolute w-full h-full bg-black/80 backdrop-blur-md top-0 left-0 right-0 bottom-0">
        <h1 className="text-7xl striped-text font-extrabold">You Win</h1>
        <h2 className="text-3xl striped-text">Score: {score}</h2>
        <Link href={"/"}>
          <Button variant={"secondary"}>Go Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default WinnerPanel;

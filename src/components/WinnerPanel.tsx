import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "~/components/ui/input"
import { useState } from "react";

interface Props {
  score: number;
  id: string;
  children: React.ReactNode;
}


function WinnerPanel({ score, id, children }: Props) {
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(`/api/images/${id}/scores`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": name, "score": score }),
      })
    console.log(name);
    console.log("score: ", score);
    setIsSent(true);
  }

  return (
    <div className=" gap-3 flex  z-50 absolute w-full h-full bg-black/80 backdrop-blur-md top-0 left-0 right-0 bottom-0">
      {children}
      <div className="grow flex flex-col items-center justify-center">
        <h1 className="text-7xl striped-text font-extrabold">You Win</h1>
        <h2 className="my-4 text-3xl striped-text score">Score: {score}</h2>
        {isSent
          ? <h2>SENT!</h2>

          : <Suspense fallback={<p>sending...</p>}>
            <form method="PUT" onSubmit={handleSubmit}>
              <p className="text-xl text-white">submit your username to save your score!</p>
              <label className=" text-xl text-white font-extrabold" htmlFor="name">Name</label>
              <div className="flex">
                <Input required={true} value={name} onChange={(e) => setName(n => e.target.value)} className="text-xl mb-5" />
                <Button type="submit" className="text-xl font-extrabold hover:px-8 transition-all ">Send</Button>
              </div>
            </form>
          </Suspense>
        }
        <Link href={"/"}>
          <Button variant={"secondary"}>Go Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default WinnerPanel;

"use client";
import React, { useEffect, useState } from "react";

interface Props {
  passedTime: React.MutableRefObject<number>;
}
function Timer({ passedTime }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0);

  async function syncTimer(): Promise<{ elapsedTime: number }> {
    const res = await fetch("/api/timer");
    const data = await res.json() as { elapsedTime: number };
    console.log(data);
    setElapsedTime(data.elapsedTime);
    passedTime.current = data.elapsedTime;
    return data;
  }

  async function startTimer() {
    await fetch("/api/timer", { method: "POST" });
    return;
  }

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    const timer = setInterval(syncTimer, 1000);

    return () => clearInterval(timer);
  }, []);
  return <div>Score: {elapsedTime}</div>;
}

export default Timer;

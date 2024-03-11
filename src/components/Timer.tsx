"use client";
import React, { useEffect, useState } from "react";

function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);

  async function syncTimer() {
    const res = await fetch("/api/timer");
    const data = await res.json();
    console.log(data);
    setElapsedTime(data.elapsedTime);
  }

  useEffect(() => {
    fetch("/api/timer", { method: "POST" });
  }, []);

  useEffect(() => {
    const timer = setInterval(syncTimer, 1000);

    return () => clearInterval(timer);
  }, []);
  return <div>Score: {elapsedTime}</div>;
}

export default Timer;

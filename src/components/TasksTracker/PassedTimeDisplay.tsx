import React, { useEffect, useState } from "react";

interface Props {
  passedSec: number;
}

const PassedTimeDisplay = ({ passedSec }: Props) => {
  const [displayStr, setDisplayStr] = useState("");
  useEffect(() => {
    if (passedSec === 0) {
      setDisplayStr("When you're ready...");
    } else if (passedSec < 60) {
      setDisplayStr("< 1 min");
    } else if (passedSec < 120) {
      setDisplayStr("1 min");
    } else if (passedSec >= 120) {
      setDisplayStr(`${Math.floor(passedSec / 60)} mins`);
    }
  }, [passedSec]);
  return <div>Time Passed: {displayStr}</div>;
};

export default PassedTimeDisplay;

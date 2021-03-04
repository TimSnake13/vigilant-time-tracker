import React, { useEffect, useState } from "react";

interface Props {
  passedTime: number[];
}

const PassedTimeDisplay = ({ passedTime }: Props) => {
  //   const [displayStr, setDisplayStr] = useState("");
  //   useEffect(() => {
  //     if (passedSec === 0) {
  //       setDisplayStr("...");
  //     } else if (passedSec < 60) {
  //       setDisplayStr("< 1 min");
  //     } else if (passedSec < 120) {
  //       setDisplayStr("1 min");
  //     } else if (passedSec >= 120) {
  //       setDisplayStr(`${Math.floor(passedSec / 60)} mins`);
  //     }
  //   }, [passedSec]);
  return (
    <div>
      Time Passed:{" "}
      {passedTime.map((v, i) => (
        <div key={i}>{v}:</div>
      ))}
    </div>
  );
};

export default PassedTimeDisplay;

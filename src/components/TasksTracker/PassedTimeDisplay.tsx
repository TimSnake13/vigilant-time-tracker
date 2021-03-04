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
    <div className="flex ">
      <div className="mr-2">Time Passed:</div>
      <div>
        {passedTime[0] > 0 && <label>{passedTime[0]} h </label>}
        {passedTime[1] > 0 && <label>{passedTime[1]} m </label>}
        {passedTime[2] !== null && <label>{passedTime[2]} s</label>}
      </div>
    </div>
  );
};

export default PassedTimeDisplay;

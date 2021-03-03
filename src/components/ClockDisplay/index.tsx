import React from "react";

interface Props {
  currentDate: string;
  currentTime: string;
}

const ClockDisplay = ({ currentDate, currentTime }: Props) => {
  return (
    <div>
      <div>{currentDate}</div>
      <div>{currentTime}</div>
    </div>
  );
};

export default ClockDisplay;

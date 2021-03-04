import React from "react";

interface Props {
  currentDate: string;
  currentTime: string;
}

const ClockDisplay = ({ currentDate, currentTime }: Props) => {
  return (
    <div className="flex items-center content-center">
      <div className="mr-2">{currentDate}</div>
      <div>{currentTime}</div>
    </div>
  );
};

export default ClockDisplay;

import React, { CSSProperties } from "react";
import { Activity } from "../types";

interface Props {
  activity: Activity;
  fullWidth: number;
}

const ActivityBlock = ({ activity, fullWidth }: Props) => {
  const style = {
    width: (activity.duration / (24 * 60)) * fullWidth,
    backgroundColor: "black",
    position: "absolute",
  } as CSSProperties;
  return <div className={"h-6"} style={style}></div>;
};

export default ActivityBlock;

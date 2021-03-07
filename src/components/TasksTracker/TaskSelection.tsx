import React from "react";
import { Task } from "./types";

const selectedStyle = "";

interface Props {
  currentTaskID: string;
  setCurrentTaskID: React.Dispatch<React.SetStateAction<string>>;
  allTasks: Record<string, Task>;
}

const TaskSelection = ({
  currentTaskID,
  setCurrentTaskID,
  allTasks,
}: Props) => {
  const handleCurrentTaskChange = (id: string) => {
    setCurrentTaskID(id);
  };

  const selectionSection = allTasks ? (
    Object.keys(allTasks).map((id) => (
      <div
        key={id}
        className={`py-1 px-2 border border-gray-300 ${
          currentTaskID === id ? "bg-gray-600 text-gray-100" : ""
        }`}
        onClick={() => handleCurrentTaskChange(id)}
      >
        {allTasks[id].name}
      </div>
    ))
  ) : (
    <div>Nothing Here</div>
  );
  return <>{selectionSection}</>;
};
export default TaskSelection;

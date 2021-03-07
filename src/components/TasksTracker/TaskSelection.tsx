import React from "react";
import { Task } from "./types";

const selectedStyle = "";

interface Props {
  currentTaskID: string;
  setCurrentTaskID: React.Dispatch<React.SetStateAction<string>>;
  tasks: Record<string, Task>;
}

const TaskSelection = ({ currentTaskID, setCurrentTaskID, tasks }: Props) => {
  const handleCurrentTaskChange = (id: string) => {
    setCurrentTaskID(id);
  };

  const selectionSection = tasks ? (
    Object.keys(tasks).map((id) => (
      <div
        key={id}
        className={`py-1 px-2 border border-gray-300 ${
          currentTaskID === id ? "bg-gray-600 text-gray-100" : ""
        }`}
        onClick={() => handleCurrentTaskChange(id)}
      >
        {tasks[id].name}
      </div>
    ))
  ) : (
    <div>Nothing Here</div>
  );
  return <>{selectionSection}</>;
};
export default TaskSelection;

import React from "react";
import Task from "./types";

interface Props {
  tasks: Task[];
}

const TasksDisplay = ({ tasks }: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};

export default TasksDisplay;

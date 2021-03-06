import React from "react";
import { Activity } from "./types";

interface Props {
  activities: Activity[];
}

const TasksDisplay = ({ activities }: Props) => {
  return (
    <div>
      {activities &&
        activities.map((activity) => (
          <div key={activity.task.id}>
            {activity.task.name} {activity.task.category}
          </div>
        ))}
    </div>
  );
};

export default TasksDisplay;

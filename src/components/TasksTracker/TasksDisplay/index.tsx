import React from "react";
import useMeasure from "../../../hooks/useMeasure";
import { Activity } from "../types";
import ActivityBlock from "./ActivityBlock";

interface Props {
  activities: Activity[];
}

const TasksDisplay = ({ activities }: Props) => {
  //   const [bind, rect] = useMeasure();
  return (
    <>
      <div className="h-6 w-full bg-gray-200 relative">
        {activities &&
          activities.map((activity) => (
            <ul key={"bar" + activity.task.id}>
              <ActivityBlock
                activity={activity}
                fullWidth={500}
              ></ActivityBlock>
            </ul>
          ))}
      </div>
      <h3>List:</h3>
      {activities &&
        activities.map((activity) => (
          <div key={"list" + activity.task.id}>
            {activity.task.name} {activity.task.category}
          </div>
        ))}
    </>
  );
};

export default TasksDisplay;

import React, { useEffect, useRef, useState } from "react";
import ClockDisplay from "../ClockDisplay";
import moment from "moment";
import Task from "./types";
import TasksDisplay from "./TasksDisplay";

const TasksTracker = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isActive, setIsActive] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [passedTime, setPassedTime] = useState("");
  const formatString = "YYYY-MM-DD HH:mm:ss A";

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        const timeStr = moment().format(formatString);
        const [date, time, a] = timeStr.split(" ");
        setCurrentDate(date);
        setCurrentTime(time + a);
      }, 1000);
    } else {
      clearTimeout(interval);
    }
    // TODO: when the seconds changes to 0, use 60000 as Interval. Update per mins

    return () => {
      clearTimeout(interval);
    };
  }, [isActive]);

  const AddTodaysTask = () => {
    const newTask = new Task(inputRef.current.value, startTime, currentTime);
    setTodaysTasks((arr) => [...arr, newTask]);
  };

  const calculatePassedTime = (): string => {
    let result = "";
    if (startTime) {
      const [startHour, startMin, startSec] = startTime.split(":").map(Number);
      const [currentHour, currentMin, currentSec] = currentTime
        .split(":")
        .map(Number);
      result = `${currentHour - startHour}:${currentMin - startMin}:${
        currentSec - startSec
      }`;
    }

    return result;
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsStarted((s) => {
            if (s === false) {
              // If starting:
              setStartTime(currentTime);
            }
            return !s;
          });
        }}
      >
        {isStarted ? "Stop" : "Start"}
      </button>
      {isStarted && <div>{passedTime}</div>}
      <div>Start At: {startTime}</div>

      <div>
        <input ref={inputRef} placeholder="My finished task is?" />
        <button onClick={AddTodaysTask} disabled={!isStarted}>
          +
        </button>
      </div>

      <ClockDisplay currentDate={currentDate} currentTime={currentTime} />
      <TasksDisplay tasks={todaysTasks} />
    </div>
  );
};

export default TasksTracker;

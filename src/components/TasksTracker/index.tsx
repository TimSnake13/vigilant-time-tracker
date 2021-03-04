import React, { useEffect, useRef, useState } from "react";
import ClockDisplay from "../ClockDisplay";
import moment from "moment";
import Task, { Moment } from "./types";
import TasksDisplay from "./TasksDisplay";
import useInterval from "../../hooks/useInterval";
import PassedTimeDisplay from "./PassedTimeDisplay";

/** Do NOT change this format! Used in class Moment in types.ts */
const FORMAT_STYLE = "YYYY-MM-DD HH:mm:ss A"; //

const TasksTracker = () => {
  const inputRef = useRef<HTMLInputElement>();
  const [isStarted, setIsStarted] = useState(false);

  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState({});

  const [currentMoment, setCurrentMoment] = useState<Moment>();
  const [startMoment, setStartMoment] = useState<Moment>();
  const [passedTime, setPassedTime] = useState([0, 0, 0]);

  useInterval(() => {
    const m = new Moment(moment().format(FORMAT_STYLE));
    setCurrentMoment(m);
    // if (m.time.split(":")[2] === "00")
    calculatePassedTime();
  }, 1000);

  const calculatePassedTime = () => {
    if (currentMoment && startMoment) {
      const [cHour, cMin, cSec] = currentMoment.time.split(":").map(Number);
      const [sHour, sMin, sSec] = startMoment.time.split(":").map(Number);

      let h = cHour - sHour;
      if (h < 0) {
        h = 24 + h;
      }
      let m = cMin - sMin;
      if (m < 0) {
        h -= 1;
        m = 60 + m;
      }
      let s = cSec - sSec;
      if (s < 0) {
        m -= 1;
        s = 60 + s;
      }

      setPassedTime([h, m, s]);
    }
  };

  // TODO: 1. task CRUD ops
  // TODO: 2. localStorage

  const AddTodaysTask = () => {
    const newTask = new Task(
      inputRef.current.value,
      startMoment,
      currentMoment,
      passedTime
    );
    setTodaysTasks((arr) => [...arr, newTask]);
    setStartMoment(currentMoment);
    inputRef.current.value = "";
    saveTodaysTasks();
  };

  const handleToggleIsStarted = () => {
    setIsStarted((s) => {
      if (s === false) {
        // If starting:
        setStartMoment(currentMoment);
      }
      return !s;
    });
  };

  const saveTodaysTasks = () => {
    setAllTasks((tasks) => {
      return { ...tasks, [currentMoment.date]: todaysTasks };
    });
  };

  return (
    <div>
      <button onClick={handleToggleIsStarted}>
        {isStarted ? "Stop" : "Start"}
      </button>
      <div>Start At: {startMoment?.time}</div>

      <PassedTimeDisplay passedTime={passedTime} />

      <div>
        <input ref={inputRef} placeholder="My finished task is?" />
        <button onClick={AddTodaysTask} disabled={!isStarted}>
          +
        </button>
      </div>

      <ClockDisplay
        currentDate={currentMoment?.date}
        currentTime={currentMoment?.time}
      />
      <TasksDisplay tasks={todaysTasks} />
    </div>
  );
};

export default TasksTracker;

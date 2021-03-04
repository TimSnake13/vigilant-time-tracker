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
  const [isReady, setIsReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState([]);

  const [currentMoment, setCurrentMoment] = useState<Moment>();
  const [startMoment, setStartMoment] = useState<Moment>();
  const [passedTime, setPassedTime] = useState([0, 0, 0]);

  // Basic Clock:
  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //     }, 1000);
  //   } else {
  //     clearTimeout(interval);
  //   }
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [isActive]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useInterval(() => {
    const m = new Moment(moment().format(FORMAT_STYLE));
    setCurrentMoment(m);
    // if (m.time.split(":")[2] === "00")
    if (isReady) calculatePassedTime();
  }, 1000);

  const calculatePassedTime = () => {
    if (currentMoment && startMoment) {
      // FIXME: If 23:00PM to 1:00AM the next day?
      const [cHour, cMin, cSec] = currentMoment.time.split(":").map(Number);
      const [sHour, sMin, sSec] = startMoment.time.split(":").map(Number);

      let h = cHour - sHour;
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

  // Test: Working but not great if you are using the app in the background
  // const [passedSec, setPassedSec] = useState(0);
  // useInterval(
  //   () => {
  //     setPassedSec(passedSec + 1);
  //     // console.log(startMoment);
  //   },
  //   isStarted ? 1000 : null
  // );

  // TODO: 1. Button => trigger calculate pass time show on screen perfectly
  // TODO: 2. task CRUD ops

  const AddTodaysTask = () => {
    const newTask = new Task(
      inputRef.current.value,
      startMoment,
      currentMoment,
      passedTime
    );
    setTodaysTasks((arr) => [...arr, newTask]);
    // setPassedSec(1);
    setStartMoment(currentMoment);
    // setIsStarted(false)
    inputRef.current.value = "";
  };

  const toggleIsStarted = () => {
    setIsStarted((s) => {
      if (s === false) {
        // If starting:
        setStartMoment(currentMoment);
      }
      return !s;
    });
  };

  return (
    <div>
      <button onClick={toggleIsStarted}>{isStarted ? "Stop" : "Start"}</button>
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
